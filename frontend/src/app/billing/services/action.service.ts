import { Injectable } from "@angular/core";
import {HttpService} from "./http.service";
import {ProjectService} from "../../project/services/project.service";
import {Action} from "../../shared/models/action.model";

@Injectable({
  providedIn: 'root'
})

export class ActionService {
  public actions: Action[] = [];
  public projectId: string | undefined;

  constructor( private httpService: HttpService, private projectService: ProjectService) {
    this.projectId = this.projectService.currentProject?.id;
    this.getActions();
  }

  getActions() {
     this.httpService.get<Action[]>('/actions/' + this.projectId).subscribe(
         (response: Action[]) => {
           this.actions = this.formatActions(response);
         }
     )
  }

    formatActions(actions: any[]): Action[] {
      return actions.map(action => ({
          ...action,
          performedAt: action.performedAt ? new Date(action.performedAt) : '',
      }));
  }

}
