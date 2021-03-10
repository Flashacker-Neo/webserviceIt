import { Cart } from "../models/cart";
const zmq = require('zeromq');

export class CartManager {
    private carts: Array<Cart> = [];
    private static instance: CartManager;

    private sock;

    public static getInstance(): CartManager {
        if (!this.instance) {
            this.instance = new CartManager();
        }
        return this.instance;
    }

    private constructor() {
        this.sock = new zmq.Request();
        this.runClient();
    }

    private async runClient() {
        const addrServer: string = 'tcp://localhost:5555';
        console.log('[CartManager] Start TCP client...');
      
        //  Socket to talk to server
        this.sock.connect(addrServer);
        console.log('[CartManager] Connected to BookServer at', addrServer);
    }

    public async sendMsgToBookManager(msg: any): Promise<any> {
        console.log('[CartManager] Sending :', msg);

        await this.sock.send(msg);
        const [result] = await this.sock.receive();
        console.log('[CartManager] Received response :', result.toString());

        return result;
    }

    public findById(id: number) {
        return this.carts.filter((cart) => {if (cart.getId() == id) return 1;})[0]; 
    }

    public findAll() {
        return this.carts;
    }

    public deleteById(id: number) {
        console.log('[CartManager] Delete cart with id:', id);
        const cart: Cart = this.carts.filter((cart) => {if (cart.getId() == id) return 1;})[0];
        const index: number = this.carts.indexOf(cart);
        this.carts.splice(index, 1);

        return JSON.stringify({succes: 'Cart with id ' + id + ' successfuly deleted'});
    }

    public createOne(data: any) {
        const cart: Cart = new Cart();
        this.carts.push(cart);

        console.log('[CartManager] Create new cart:', JSON.stringify(cart));

        return cart;
    }

    public addBook(cartId: number, data: any) {
        console.log('[CartManager] Add book of cart with id: ' + cartId + ' | Data: ' + JSON.stringify(data));
        const cart: Cart = this.carts.filter((cart) => {if (cart.getId() == cartId) return 1;})[0];
        
        return cart.addBook(parseInt(data.bookId), parseInt(data.quantity));
    }

    public removeBook(cartId: number, data: any) {
        console.log('[CartManager] Remove book of cart with id: ' + cartId + ' | Data: ' + JSON.stringify(data));
        const cart: Cart = this.carts.filter((cart) => {if (cart.getId() == cartId) return 1;})[0];

        return cart.removeBook(parseInt(data.bookId), parseInt(data.quantity));
    }

    public async confirmCart(cartId: number) {
        const cart: Cart = this.carts.filter((cart) => {if (cart.getId() == cartId) return 1;})[0];
        
        return await cart.confirmCart();
    }

}