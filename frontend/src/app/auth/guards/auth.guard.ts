import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {   
    if (this.authService.authenticated) return true;
    
    return this.authService.authenticated$.pipe(
      map(authenticated => {
        if (authenticated) {          
          return true;
        } else {
          this.authService.login();
          return false;
        }
      })
    );
  }
}
