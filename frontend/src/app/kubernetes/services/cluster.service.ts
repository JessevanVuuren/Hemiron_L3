import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cluster } from '../models/cluster.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  private currentClusterId!: string;
  
  constructor(private http: HttpClient) { }

  private clustersUrl = environment.k8sURL + 'projects/';


  public setCurrentClusterId(clusterId: string, event: MouseEvent) {
    this.currentClusterId = clusterId;
  }

  public getCurrentClusterId(): string {
    return this.currentClusterId;
  }

  public getAllClusters(projectId: String): Observable<Cluster[]> {
    return this.http.get<Cluster[]>(this.clustersUrl + projectId + '/clusters');
  }

  public async createCluster(projectId: string, clusterDto: { name: string }) {
    const post = this.http.post<any>(this.clustersUrl + projectId + '/clusters', clusterDto);
    return firstValueFrom(post);
  }

  public async deleteCluster(projectId: string, clusterId: string) {
    const del = this.http.delete<any>(this.clustersUrl + projectId + '/clusters/' + clusterId);
    return firstValueFrom(del);
  }

  public async getClusterById(projectId: string, clusterId: string) {
    const get = this.http.get<any>(this.clustersUrl + projectId + '/clusters/' + clusterId);
    return firstValueFrom(get);
  }





}