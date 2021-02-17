export class Cart {
    private static idIteration: number = 0;
    private static getId() {
        this.idIteration++;
        return this.idIteration;
    }

    private id: number;

    constructor() {
        this.id = Cart.getId();
    }

    public update() {}


    // Getter & Setter

    public getId(): number {
        return this.id;
    }
}