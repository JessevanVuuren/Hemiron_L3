import { Injectable } from '@angular/core';
import { Template } from '../models/template.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) { }

  private templateUrl: string = environment.k8sURL + 'templates'
  private templateByIdUrl: string = this.templateUrl + '{/id}'

  public async getAllTemplates(): Promise<Template[]> {
    const request = this.http.get<Template[]>(this.templateUrl);
    return firstValueFrom(request);
  }

  public async getTemplateById(templateId: string): Promise<Template> {
    const request = this.http.get<Template>(this.templateByIdUrl.replace("{id}", templateId));
    return firstValueFrom(request);
  }
}
