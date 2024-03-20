import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {VpsCreate} from "../../vps/models/vps-create.mode";

@Injectable()
export class AdminVpsService {

    constructor(private http: HttpClient) {}

    public async postVpsCreated(data: VpsCreate): Promise<void> {
        const observable = this.http.post<void>(environment.vpsURL + "/api/vps/data", data);
        return lastValueFrom(observable);
    }
}