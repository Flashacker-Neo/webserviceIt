import { Author } from "../models/author";

export class AuthorManager {
    private authors: Array<Author> = [];
    private static instance: AuthorManager;

    public static getInstance(): AuthorManager {
        if (!this.instance) {
            this.instance = new AuthorManager();
        }
        return this.instance;
    }

    private constructor() { }

    public findById(id: number) {
        return this.authors.filter((author) => {if (author.getId() == id) return 1;})[0]; 
    }

    public findAll() {
        return this.authors;
    }

    public updateOne(id: number, data: any) {
        this.authors.filter((author) => {if (author.getId() == id) return 1;})[0]
            .update(data.name, data.booksId ? JSON.parse(data.booksId) : null);
    }

    public deleteById(id: number) {
        const author: Author = this.authors.filter((author) => {if (author.getId() == id) return 1;})[0];
        const index: number = this.authors.indexOf(author);
        this.authors.splice(index, 1);

        return JSON.stringify({succes: 'Author with id ' + id + ' successfuly deleted'});
    }

    public createOne(data: any) {
        const author: Author = new Author(data.name, data.booksId ? JSON.parse(data.booksId) : null);
        this.authors.push(author);

        return author;
    }

}