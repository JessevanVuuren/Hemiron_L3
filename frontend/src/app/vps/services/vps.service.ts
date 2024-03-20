import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VpsRequest } from "../models/vps-request.model";
import { environment } from "src/environments/environment";
import { lastValueFrom } from "rxjs";
import { Vps } from "../models/vps.model";

@Injectable()
export class VpsService {
	constructor(private http: HttpClient) {}

	public async postVpsRequest(data: VpsRequest): Promise<void> {
		const observable = this.http.post<void>(environment.vpsURL + "/api/vps/mail/request", data);
		return lastValueFrom(observable);
	}
	public async getAllVpsRequest(project: string | undefined): Promise<Vps[]> {
		const observable = this.http.get<Vps[]>(environment.vpsURL + "/api/vps/data/" + project);
		return lastValueFrom(observable);
	}
	public async removeVPSRequest(vps: Vps): Promise<void> {
		const observable = this.http.delete<void>(environment.vpsURL + "/api/vps/data/" + vps.id);
		return lastValueFrom(observable);
	}
}
