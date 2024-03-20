import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Page } from "../models/page";
import { User } from "../models/user";
import { Project } from "src/app/project/models/project";

@Injectable({
  providedIn: "root",
})
export class UserService {

  private readonly PAGE_NUMBER = 0;
  private readonly PAGE_SIZE = 10;

  private usersEndpoint = `${environment.projectsURL}users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersEndpoint); 
  }

  getUsersByTerm(searchTerm: String): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersEndpoint}?searchTerm=${searchTerm}`);
  }

  /**
   * Gets the projects associated with the authenticated user from the Auth API.
   * @param pageNumber - The page number to retrieve.
   * @param pageSize - The number of projects per page.
   * @param searchTerm - A search query for project names.
   * @returns An observable emitting a Page of projects.
   * @example
   *   const pageNumber = 1;
   *   const pageSize = 10;
   *   yourService.getMyProjects(pageNumber, pageSize)
   *     .subscribe((projectPage: Page<Project>) => {
   *       // Handle the returned Page of projects
   *       console.log(projectPage);
   *     });
   */
  getMyProjects(pageNumber: number = this.PAGE_NUMBER, pageSize: number = this.PAGE_SIZE, searchTerm = ""): Observable<Page<Project>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set('searchTerm', searchTerm);
    
    return this.http.get<Page<Project>>(`${this.usersEndpoint}/user/projects`, { params });
  }
}
