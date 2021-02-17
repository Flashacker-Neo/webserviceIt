export class Book {
    private static idIteration: number = 0;
    private static getId() {
        this.idIteration++;
        return this.idIteration;
    }

    private id: number;
    private name: string;
    private author: string;
    private date: string;
    private price: number;
    private quantity: number;

    constructor(name: string, author: string, date: string, price: number, quantity: number) {
        this.id = Book.getId();
        this.name = name;
        this.author = author;
        this.date = date;
        this.price = price;
        this.quantity = quantity;
    }

    public update(name?: string, author?: string, date?: string, price?: number, quantity?: number): Book {
        this.name = (name != null) ? name : this.name;
        this.author = (author != null) ? author : this.author;
        this.date = (date != null) ? date : this.date;
        this.price = (price != null) ? price :this.price;
        this.quantity = (quantity != null) ? quantity : this.quantity;

        return this;
    }

    public updateQuantity(type: string, quantity: number): Book {
        if (type === 'add') {
            this.quantity = this.quantity + quantity;
        } else if (type === 'remove') {
            this.quantity = this.quantity - quantity;
        }

        return this;
    }


    // Getter & Setter

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getAuthor(): string {
        return this.author;
    }

    public setAuthor(author: string) {
        this.author = author;
    }

    public getDate(): string {
        return this.date;
    }

    public setDate(date: string) {
        this.date = date;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number) {
        this.price = price;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number) {
        this.quantity = quantity;
    }
}