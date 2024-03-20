import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ObjectService {
	constructor(private http: HttpClient) {}

	public downloadFile(bucketname: string, objectnameBase64Encoded: string): Observable<Blob> {
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
		});
		const url = environment.s3URL + "/api/s3/buckets/" + bucketname + "/objects/" + objectnameBase64Encoded;

		return this.http.get(url, {
			headers: headers,
			responseType: "blob" as "json",
		}) as Observable<Blob>;
	}

	public deleteFile(bucketname: string, objectnameBase64Encoded: string) {
		const url = environment.s3URL + "/api/s3/buckets/" + bucketname + "/objects";
		return this.http.delete(url, {
			body: [objectnameBase64Encoded],
		});
	}

	public deleteMultipleFiles(bucketname: string, objectnamesBase64Encoded: string[]) {
		const url = environment.s3URL + "/api/s3/buckets/" + bucketname + "/objects";
		return this.http.delete(url, {
			body: objectnamesBase64Encoded,
		});
	}

	public uploadFile(bucketname: string, file: File) {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("reportProgress", "true");
		const url = environment.s3URL + "/api/s3/buckets/" + bucketname + "/objects";
		const headers = new HttpHeaders({
			fileName: file.name,
		});
		return this.http.post(url, formData, {
			headers: headers,
		});
	}

	public createVirtualFolder(bucketname: string, pathname: string) {
		const url = environment.s3URL + "/api/s3/buckets/" + bucketname + "/objects/folder";
		if (pathname.slice(-1) !== "/") {
			pathname = pathname + "/";
		}
		const headers = new HttpHeaders({
			path: pathname,
		});
		return this.http.post(
			url,
			{},
			{
				headers: headers,
			}
		);
	}
}
