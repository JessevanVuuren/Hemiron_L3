import {VpsCreate} from "./vps-create.mode";

export class Vps implements VpsCreate{
    id: number;
    email: string;
    ip: string;
    name: string;
    userName: string;
    project: string;
    isActive: boolean = true;

    constructor(id: number,email: string, ip: string, name: string, isActive: boolean, project: string,  userName:string) {
        this.id = id;
        this.email = email;
        this.ip = ip;
        this.name = name;
        this.isActive= isActive;
        this.project = project
        this.userName = userName;
    }
}
