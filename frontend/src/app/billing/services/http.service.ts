import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) {
    }

    public getAll<T>(endpoint: string): Observable<T[]> {
        return this.http.get<T[]>(environment.billingURL + endpoint);
    }


    public get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(environment.billingURL + endpoint);
    }

    public post<T>(endpoint: string, body?: T): Observable<T> {
        return this.http.post<T>(environment.billingURL + endpoint, body)
    }

    public put<T>(endpoint: string, body?: T): Observable<T> {
        return this.http.put<T>(environment.billingURL + endpoint, body);
    }

    public patch<T>(endpoint: string, body: T): Observable<T> {
        return this.http.patch<T>(environment.billingURL + endpoint, body);
    }

    public delete<T>(endpoint: string, body?: T): Observable<T> {
        return this.http.delete<T>(environment.billingURL + endpoint, { body: body });
    }
}