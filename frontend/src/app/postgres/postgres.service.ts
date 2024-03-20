import {Injectable} from '@angular/core';
import {Database} from "./models/database.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostgresService {

  private db: Subject<Database> = new BehaviorSubject<Database>({} as Database);

  constructor(private http: HttpClient) {
  }

  public getAllDatabases() {
    return this.http.get<Array<Database>>( environment.postgresURL + '/v1/database')
  }

  public getDatabaseByUUID(UUID: string) {
    this.http.get<Database>(environment.postgresURL + '/v1/database/' + UUID).subscribe((db: Database) => {
      this.db.next(db);
    });
    return this.db.asObservable();
  }

  public getDatabaseSubject() {
    return this.db.asObservable();
  }
}
