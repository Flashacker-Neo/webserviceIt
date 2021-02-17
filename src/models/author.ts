export class Author {
    private static idIteration: number = 0;
    private static getId() {
        this.idIteration++;
        return this.idIteration;
    }

    private id: number;
    private name: string;
    private booksId: Array<number>;

    constructor(name: string, booksId: Array<number>) {
        this.id = Author.getId();
        this.name = name;
        this.booksId = booksId;
    }

    public update(name?: string, booksId?: Array<number>): Author {
        this.name = (name != null) ? name : this.name;
        this.booksId = (booksId != null) ? booksId : this.booksId;

        return this
    }

    public addBook(bookId: number) {
        this.booksId.push(bookId);
    }

    public removeBook(bookId: number) {
        const index: number = this.booksId.indexOf(bookId);
        this.booksId.splice(index, 1)
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

    public getBooksId(): Array<number> {
        return this.booksId;
    }

    public setBooksId(booksId: Array<number>) {
        this.booksId = booksId;
    }
}