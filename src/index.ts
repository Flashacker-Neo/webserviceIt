import express, { Response, Request } from "express";
import { BookManager } from "./bookManager";

const app = express();
const port = 8080; // default port to listen
app.use(express.urlencoded({ extended: true }));

const bookManager: BookManager = new BookManager();

app.get( "/book", ( req: Request, res: Response ) => {
    res.send(bookManager.findAll());
});

app.get( "/book/:id", ( req: Request, res: Response ) => {
    res.send(bookManager.findById(parseInt(req.params.id)));
});

app.delete("/book/:id", ( req: Request, res: Response ) => {
    res.send(bookManager.deleteById(parseInt(req.params.id)));
});

app.post('/book/new', ( req: Request, res: Response ) => {
    console.log(req.body);
    res.send(bookManager.createOne(req.body));
});

app.post('/book/update/:id', ( req: Request, res: Response ) => {
    console.log(req.body);
    res.send(bookManager.updateOne(parseInt(req.params.id), req.body));
});

app.post('/book/update-stock/:id', ( req: Request, res: Response ) => {
    res.send(bookManager.updateStock(parseInt(req.params.id), req.body));
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});