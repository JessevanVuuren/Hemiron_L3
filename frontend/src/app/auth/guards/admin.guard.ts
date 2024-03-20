import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Roles } from 'src/app/core/enums/roles';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {   
    let roles = this.authService.getRoles()
    if (!roles.includes(Roles.Klant)) return this.handleProjectNotFound();
    return roles.includes(Roles.Klant);
  }

  private handleProjectNotFound(): Promise<boolean> {
    this.router.navigate(['/errors/no-project-admin'], { skipLocationChange: true }); 
    return new Promise<boolean>(resolve => resolve(false));
  }
};
