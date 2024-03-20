import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, first, firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { VerifyChartDto } from "../models/verify-chart-dto.model";
import { AppDto } from "../models/app-dto.model";
import { App } from "../models/app.model";
import { Pod } from "../models/pod.model";

@Injectable({
  providedIn: "root",
})
export class HelmAppService {
  private currentAppId!: string;

  constructor(private http: HttpClient) { }

  private verifyChartUrl: string = environment.k8sURL + "charts/verify";
  private createHelmAppUrl: string =
    environment.k8sURL + "projects/{projectId}/clusters/{clusterId}/apps";
  private podsUrl: string = this.createHelmAppUrl + "/{id}/pods";
  private podLogsUrl: string = this.podsUrl + "/{podName}/logs";

  //helm app templates need to be implemented later
  private yamlContent: string = "";

  private _chartIsInvalid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public chartIsInvalid$ = this._chartIsInvalid.asObservable();

  public updateChartValidity(isValid: boolean): void {
    this._chartIsInvalid.next(isValid);
  }

  public setYamlContent(content: string): void {
    this.yamlContent = content;
  }

  public getYamlContent(): string {
    return this.yamlContent;
  }

  public resetEditor(): void {
    this.setYamlContent(``);
  }

  public setCurrentAppId(selectedApp: any, $event: MouseEvent) {
    this.currentAppId = selectedApp.id;
  }

  public getCurrentAppId(): string {
    return this.currentAppId;
  }

  public async verifyChart(verifyChartDto: VerifyChartDto): Promise<Observable<VerifyChartDto>> {
    return this.http.post<VerifyChartDto>(this.verifyChartUrl, verifyChartDto);
  }

  public async createHelmApp(projectId: string,clusterId: string,appDto: AppDto): Promise<Observable<AppDto>> {
    const create = `${this.createHelmAppUrl.replace("{projectId}", projectId).replace("{clusterId}", clusterId)}`;
    return this.http.post<AppDto>(create, appDto);
  }

  public async getAllHelmAppsByClusterId(projectId: string, clusterId: string): Promise<App[]> {
    const get = this.http.get<App[]>(this.createHelmAppUrl.replace("{projectId}", projectId).replace("{clusterId}", clusterId));
    return firstValueFrom(get);
  }

  public async getHelmAppById(projectId: string, clusterId: string, appId: string): Promise<App> {
    const get = this.http.get<App>(this.createHelmAppUrl.replace("{projectId}", projectId).replace("{clusterId}", clusterId) + '/' + appId);
    return firstValueFrom(get);
  }

  public async updateHelmApp(projectId: string, clusterId: string, appId: string, appDto: AppDto): Promise<App> {
    const update = this.http.put<App>(this.createHelmAppUrl.replace("{projectId}", projectId).replace("{clusterId}", clusterId) + '/' + appId, appDto);
    return firstValueFrom(update);
  }

  public async deleteHelmApp(projectId: string, clusterId: string, appId: string): Promise<void> {
    const remove = this.http.delete<void>(this.createHelmAppUrl.replace("{projectId}", projectId).replace("{clusterId}", clusterId) + '/' + appId);
    return firstValueFrom(remove);
  }

  public async getAllPods(projectId: string, clusterId: string, helmAppId: string): Promise<Pod[]> {
    const request = this.http.get<Pod[]>(this.podsUrl.replace("{projectId}", projectId).replace("{clusterId}", clusterId).replace("{id}", helmAppId));
    return firstValueFrom(request);
  }

  public async getPodLogs(projectId: string, clusterId: string, helmAppId: string, podName: string): Promise<string> {
    const request = this.http.get<string>(this.podLogsUrl.replace("{projectId}", projectId).replace("{clusterId}", clusterId).replace("{id}", helmAppId).replace("{podName}", podName));
    return firstValueFrom(request);
  }
}
