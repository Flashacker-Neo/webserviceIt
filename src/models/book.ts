import { AuthorManager } from "../managers/authorManager";
import { Author } from "./author";

export class Book {

    private static idIteration: number = 0;
    private static getId() {
        this.idIteration++;
        return this.idIteration;
    }

    private id: number;
    private name: string;
    private author: Author;
    private date: string;
    private price: number;
    private quantity: number;

    constructor(name: string, authorId: number, date: string, price: number, quantity: number) {
        this.id = Book.getId();
        this.name = name;
        this.author = AuthorManager.getInstance().findById(authorId);
        this.date = date;
        this.price = price;
        this.quantity = quantity;
    }

    public update(name?: string, authorId?: number, date?: string, price?: number, quantity?: number): Book {
        this.name = (name != null) ? name : this.name;
        this.author = (authorId != null) ? AuthorManager.getInstance().findById(authorId) : this.author;
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

    public getAuthor(): Author {
        return this.author;
    }

    public setAuthor(authorId: number) {
        this.author = AuthorManager.getInstance().findById(authorId);
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