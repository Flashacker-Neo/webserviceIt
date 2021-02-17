import { Book } from "../models/book";

export class BookManager {
    private books: Array<Book> = [];
    private static instance: BookManager;

    public static getInstance(): BookManager {
        if (!this.instance) {
            this.instance = new BookManager();
        }
        return this.instance;
    }

    private constructor() { }

    public findById(id: number) {
        return this.books.filter((book) => {if (book.getId() == id) return 1;})[0]; 
    }

    public findByName(name: string) {
        return this.books.filter((book) => {if (book.getName() == name) return 1;}); 
    }

    public findAll() {
        return this.books;
    }

    public updateOne(id: number, data: any) {
        return this.books.filter((book) => {if (book.getId() == id) return 1;})[0]
            .update(data.name, data.authorId, data.date,  parseInt(data.price),  parseInt(data.quantity));
    }

    public deleteById(id: number) {
        const book: Book = this.books.filter((book) => {if (book.getId() == id) return 1;})[0];
        const index: number = this.books.indexOf(book);
        this.books.splice(index, 1);

        return JSON.stringify({succes: 'Book with id ' + id + ' successfuly deleted'});
    }

    public createOne(data: any) {
        const book: Book = new Book(data.name, data.author, data.date,  parseInt(data.price),  parseInt(data.quantity));
        this.books.push(book);

        return book;
    }

    public updateStock(id: number, data: any) {
        return this.books.filter((book) => {if (book.getId() == id) return 1;})[0].updateQuantity(data.type,  parseInt(data.quantity));
    }
}