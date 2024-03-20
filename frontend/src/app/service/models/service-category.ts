import { Service } from "./service";

export interface ServiceCategory {
    name: string;
    description: string | undefined;
    iconClass: string;
    services: Service[];
}