import express, { Response, Request } from "express";
import { AuthorManager } from "./managers/authorManager";
import { BookManager } from "./managers/bookManager";

// Define book api server
const dataApi = express();
const portDataApi = 8080; // default port to listen
dataApi.use(express.urlencoded({ extended: true }));


// Init Manager
const bookManager: BookManager = BookManager.getInstance();
const authorManager: AuthorManager = AuthorManager.getInstance();


// Define Book routes
dataApi.get( "/book", ( req: Request, res: Response ) => {
    res.send(bookManager.findAll());
});

dataApi.get( "/book/:id", ( req: Request, res: Response ) => {
    res.send(bookManager.findById(parseInt(req.params.id)));
});

dataApi.get( "/book/:name", ( req: Request, res: Response ) => {
    res.send(bookManager.findByName(req.params.name));
});

dataApi.delete("/book/:id", ( req: Request, res: Response ) => {
    res.send(bookManager.deleteById(parseInt(req.params.id)));
});

dataApi.post('/book/new', ( req: Request, res: Response ) => {
    console.log(req.body);
    res.send(bookManager.createOne(req.body));
});

dataApi.post('/book/update/:id', ( req: Request, res: Response ) => {
    console.log(req.body);
    res.send(bookManager.updateOne(parseInt(req.params.id), req.body));
});

dataApi.post('/book/update-stock/:id', ( req: Request, res: Response ) => {
    res.send(bookManager.updateStock(parseInt(req.params.id), req.body));
});

// Define Author routes
dataApi.get( "/author", ( req: Request, res: Response ) => {
    res.send(JSON.stringify(authorManager.findAll()));
});

dataApi.get( "/author/:id", ( req: Request, res: Response ) => {
    res.send(JSON.stringify(authorManager.findById(parseInt(req.params.id))));
});

dataApi.delete("/author/:id", ( req: Request, res: Response ) => {
    res.send(JSON.stringify(authorManager.deleteById(parseInt(req.params.id))));
});

dataApi.post('/author/new', ( req: Request, res: Response ) => {
    console.log(req.body);
    res.send(JSON.stringify(authorManager.createOne(req.body)));
});

dataApi.post('/author/update/:id', ( req: Request, res: Response ) => {
    console.log(req.body);
    res.send(JSON.stringify(authorManager.updateOne(parseInt(req.params.id), req.body)));
});


// start the Express server
dataApi.listen( portDataApi, () => {
    console.log( `Server Book started at http://localhost:${ portDataApi }` );
});