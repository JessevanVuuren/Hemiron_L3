import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Bucket} from "../models/bucket.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Item} from "../models/item.model";

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  constructor(
    private http: HttpClient
  ) { }

  public getBucket(bucketName: string): Observable<Bucket> {
    return this.http.get<Bucket>(environment.s3URL + "/api/s3/buckets/" + bucketName);
  }

  public getBuckets(): Observable<Bucket[]> {
    return this.http.get<Bucket[]>(environment.s3URL + "/api/s3/buckets");
  }

  public createBucket(name: string): Observable<void> {
    return this.http.post<void>(environment.s3URL + "/api/s3/buckets", {
      name: name
    });
  }

  public getBucketObjectsDirectory(bucketName: string, objectPath: string) {
    const encodedObjectPath: string = btoa(objectPath);

    return this.http.get<Item[]>(environment.s3URL + "/api/s3/buckets/" + bucketName + "/objects/directory/" + encodedObjectPath);
  }
}
