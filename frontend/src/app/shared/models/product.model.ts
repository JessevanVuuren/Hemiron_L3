import { Expose } from "class-transformer";

export class Product {
    @Expose() id: string;
    @Expose() name: string;
    @Expose() unit: string;
    @Expose() updatedAt: string;
    @Expose() createdAt: string;
    @Expose() costPerUnit: number;


    constructor(id: string, name: string, unit: string, updatedAt: string, createdAt: string, costPerUnit: number) {
        this.id = id;
        this.name = name;
        this.unit = unit;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
        this.costPerUnit = costPerUnit;
    }
}