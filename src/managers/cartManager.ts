import { Cart } from "../models/cart";

export class CartManager {
    private carts: Array<Cart> = [];
    private static instance: CartManager;

    public static getInstance(): CartManager {
        if (!this.instance) {
            this.instance = new CartManager();
        }
        return this.instance;
    }

    private constructor() { }

    public findById(id: number) {
        return this.carts.filter((cart) => {if (cart.getId() == id) return 1;})[0]; 
    }

    public findAll() {
        return this.carts;
    }

    public updateOne(id: number, data: any) {
        return this.carts.filter((cart) => {if (cart.getId() == id) return 1;})[0]
            .update();
    }

    public deleteById(id: number) {
        const cart: Cart = this.carts.filter((cart) => {if (cart.getId() == id) return 1;})[0];
        const index: number = this.carts.indexOf(cart);
        this.carts.splice(index, 1);

        return JSON.stringify({succes: 'Cart with id ' + id + ' successfuly deleted'});
    }

    public createOne(data: any) {
        const cart: Cart = new Cart();
        this.carts.push(cart);

        return cart;
    }

}