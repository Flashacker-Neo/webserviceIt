import { Book } from "./book";

export class BookManager {
    private books: Array<Book> = [];

    constructor() {

    }

    public findById(id: number) {
        return JSON.stringify(this.books.filter((book) => {book.getId() == id})); 
    }

    public findAll() {
        return JSON.stringify(this.books);
    }

    public updateOne(id: number, data: any) {
        return JSON.stringify(this.books.filter((book) => book.getId() == id)[0].update(data.name, data.author, data.date));
    }

    public deleteById(id: number) {
        const book: Book = this.books.filter((book) => book.getId() == id)[0];
        const index: number = this.books.indexOf(book);
        this.books.splice(index, 1);

        return JSON.stringify({succes: 'Book with id ' + id + ' successfuly deleted'});
    }

    public createOne(data: any) {
        const book: Book = new Book(data.name, data.author, data.date);
        this.books.push(book);

        return JSON.stringify(book);
    }
}