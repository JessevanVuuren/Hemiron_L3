import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { DbPlan } from "../models/dbPlan";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(
    private http: HttpClient
  ) { }

  public async getDbPlanList(): Promise<DbPlan[]> {
    const service = "Postgres";

    const apiUrl = environment.billingURL+`/${service}`;
    const response = await firstValueFrom<any>(this.http.get(apiUrl));

    return response.products as DbPlan[];
  }
}
