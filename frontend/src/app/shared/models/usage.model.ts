import { Expose } from "class-transformer";
import { Customer } from "./customer.model";
import { Product } from "./product.model";

export class Usage {
    @Expose() id: string;
    @Expose() customer: Customer;
    @Expose() product: Product;
    @Expose() quantity: number;
    @Expose() created: Date;


    constructor(id: string, customer: Customer, product: Product, quantity: number, created: string) {
        this.id = id;
        this.customer = customer;
        this.product = product;
        this.quantity = quantity;
        this.created = new Date(created);
    }
}

