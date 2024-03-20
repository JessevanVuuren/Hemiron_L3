import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { KeycloakProfile } from 'keycloak-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrl: './common-header.component.scss'
})
export class CommonHeaderComponent implements OnInit {
  @Input() homeUrl: string | any[] = "['./']";
  public userProfile: KeycloakProfile | undefined;    
  
  constructor (private auth: AuthService) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  private getUserProfile(): void {
    if (this.auth.profile) this.userProfile = this.auth.profile;
    this.auth.profile$.subscribe(profile => {
      this.userProfile = profile;
    });
  }

  public logout(): void {
    this.auth.logout();
  }

  getAccountManagementUrl() {
    return `${environment.keycloakURL}/realms/${environment.keycloakRealm}/account`
  }
}
