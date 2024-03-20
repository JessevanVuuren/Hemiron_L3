import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ConfigService {
  private billingURL!: string;
  private postgresURL!: string;
  constructor(private http: HttpClient) {}

  getConfigBilling() {
    return this.http.get<any>(this.billingURL);
  }
  getConfigPostgres() {
    return this.http.get<any>(this.postgresURL);
  }
}
