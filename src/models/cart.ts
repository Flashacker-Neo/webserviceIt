const axios = require('axios');

export class Cart {
    private static idIteration: number = 0;
    private static getId() {
        this.idIteration++;
        return this.idIteration;
    }

    private id: number;
    private isConfirm: boolean;
    private createDate: string;
    private confirmDate: string;
    private items: Array<Item>;

    constructor() {
        this.id = Cart.getId();
        this.isConfirm = false;
        this.createDate = new Date().toDateString();
        this.items = [];
    }

    public async addBook(bookId: number, quantity: number) {
        if (this.isConfirm) return;
        let flag: boolean = false;

         await axios.get('http://localhost:8080/book/' + bookId).then((response: any) => {

            if (this.items && this.items[bookId]) {
                flag = this.items[bookId].addQuantity(quantity);
            } else {
                this.items[bookId] = new Item(response.data.id, response.data.name, quantity, response.data.quantity, response.data.price);
            }
        });

        return this;
    }

    public removeBook(bookId: number, quantity: number) {
        if (this.isConfirm) return;

        if (this.items && this.items[bookId]) {
            if (!this.items[bookId].removeQuantity(quantity)) {
                const index = this.items.indexOf(this.items[bookId]);
                this.items.splice(index, 1);
            }
        }        

        return this;
    }

    public confirmCart() {
        if (this.items.length > 0) {

            this.items.forEach(async (item) => {
                await axios.post('http://localhost:8080/book/update-stock/' + item.id, {type: 'remove', quantity: item.quantity});
            });

            this.isConfirm = true;
            this.confirmDate = new Date().toDateString();

            return this;
        }
    }


    // Getter & Setter

    public getId(): number {
        return this.id;
    }
}

export class Item {
    public id: number;
    private name: string;
    public quantity: number;
    private maxQuantity: number;
    private price: number;

    constructor(id: number, name: string, quantity: number, maxQuantity: number, price: number) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.maxQuantity = maxQuantity;
        this.price = price;
    }

    public addQuantity(quantity: number): boolean {
        if (this.quantity + quantity <= this.maxQuantity) this.quantity += quantity;
        else return false;

        return true;
    }

    public removeQuantity(quantity: number): boolean {
        if (this.quantity > quantity) this.quantity -= quantity;
        else return false;

        return true;
    }
}