import { Book } from "../models/book";
const zmq = require('zeromq');

export class BookManager {
    private books: Array<Book> = [];
    private static instance: BookManager;

    private sock;

    public static getInstance(): BookManager {
        if (!this.instance) {
            this.instance = new BookManager();
        }
        return this.instance;
    }

    private constructor() {
        this.sock = new zmq.Reply();
        this.runServer();
    }


    private async runServer() {
        const addrServer: string = 'tcp://*:5555';
        console.log('[BookManager] Start TCP server...');
      
        await this.sock.bind(addrServer);
        console.log('[BookManager] Listenning on', addrServer);
      
        for await (const [msg] of this.sock) {
            console.log('[BookManager] Received :', msg.toString());

            const cart = JSON.parse(msg);
            let canConfirm = true;

            cart.forEach((book: any) => {
                if (book && !this.findById(book.bookId).getQuantity() >= book.quantity) canConfirm = false;
            });

            if (canConfirm) {
                cart.forEach((book: any) => {
                    this.updateStock(book.bookId, {type: book.type, quantity: book.quantity});
                })
            }

            await this.sock.send(JSON.stringify({status: canConfirm}));
            // Do some 'work'
        }
    }

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
        console.log('[BookManager] Update book with id:', id);
        return this.books.filter((book) => {if (book.getId() == id) return 1;})[0]
            .update(data.name, data.authorId, data.date, parseInt(data.price), parseInt(data.quantity));
    }

    public deleteById(id: number) {
        console.log('[BookManager] Delete book with id:', id);
        const book: Book = this.books.filter((book) => {if (book.getId() == id) return 1;})[0];
        const index: number = this.books.indexOf(book);
        this.books.splice(index, 1);

        return JSON.stringify({succes: 'Book with id ' + id + ' successfuly deleted'});
    }

    public createOne(data: any) {
        const book: Book = new Book(data.name, data.author, data.date, parseInt(data.price), parseInt(data.quantity));
        this.books.push(book);

        console.log('[BookManager] Create new book:', JSON.stringify(book));

        return book;
    }

    public updateStock(id: number, data: any) {
        console.log('[BookManager] Update stock of book with id: ' + id + ' | Data: ' + JSON.stringify(data));
        return this.books.filter((book) => {if (book.getId() == id) return 1;})[0].updateQuantity(data.type, parseInt(data.quantity));
    }
}