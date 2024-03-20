import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateTaskResponse, GetFunctionByIdResponse } from '../data/function.data'
import { GetFunctionResponse } from '../data/function.data';
import { Observable } from 'rxjs';

@Injectable()
export class FunctionService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAll(projectId: string): Observable<GetFunctionResponse[]> {
    return this.http.get<GetFunctionResponse[]>(environment.serverlessURL + '/v1/functions/' + projectId);
  }

  get(functionId: string, projectId: string): Observable<GetFunctionByIdResponse> {
    return this.http.get<GetFunctionByIdResponse>(environment.serverlessURL + '/v1/functions/' + projectId + '/' + functionId);
  }

  triggerFunction(triggerOpenFaas: string) {
    return this.http.get<string>(
        triggerOpenFaas.toString(),
    );
  }

  delete(functionId: string, projectId: string): Observable<CreateTaskResponse> {
    return this.http.delete<CreateTaskResponse>(environment.serverlessURL + '/v1/functions/' + projectId + '/' + functionId);
  }

  create(body: any): Observable<CreateTaskResponse> {
    return this.http.post<CreateTaskResponse>(environment.serverlessURL + '/v1/functions', body);
  }
}
