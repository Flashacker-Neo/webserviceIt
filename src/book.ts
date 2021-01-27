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

    constructor(name: string, author: string, date: string) {
        this.id = Book.getId();
        this.name = name;
        this.author = author;
        this.date = date;
    }

    public update(name?: string, author?: string, date?: string): Book {
        this.name = (name != null) ? name : this.name;
        this.author = (author != null) ? author : this.author;
        this.date = (date != null) ? date : this.date;

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
}