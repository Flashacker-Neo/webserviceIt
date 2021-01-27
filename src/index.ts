import express from "express";
import { BookManager } from "./bookManager";

const app = express();
const port = 8080; // default port to listen

const bookManager: BookManager = new BookManager();

app.get( "/book", ( req: any, res: any ) => {
    res.send(bookManager.findAll());
});

app.get( "/book/:id", ( req: any, res: any ) => {
    res.send(bookManager.findById(req.param.id));
});

app.delete("book/:id", ( req: any, res: any ) => {
    res.send(bookManager.deleteById(req.params.id));
});

app.post('/book/new', ( req: any, res: any ) => {
    res.send(bookManager.createOne(req.body));
});

app.post('/book/update/:id', ( req: any, res: any ) => {
    res.send(bookManager.updateOne(req.params.id, req.body));
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});