import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import Keycloak, {KeycloakProfile} from 'keycloak-js';
import {Subject} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private keycloak!: Keycloak;
    private readonly MIMNIMUM_VALID_TIME: number = 30;

    public authenticated$: Subject<boolean> = new Subject<boolean>;
    public authenticated: boolean = false;

    public profile: KeycloakProfile | undefined;
    public profile$: Subject<KeycloakProfile> = new Subject<KeycloakProfile>;

    constructor(private router: Router) {
        this.keycloak = new Keycloak({
            url: environment.keycloakURL,
            realm: environment.keycloakRealm,
            clientId: environment.keycloakClientId
        });
        this.init();
    }

    private async init(): Promise<void> {
        this.authenticated = await this.checkKeycloakAuthenticationAsync();
        if (this.authenticated) await this.loadUserProfileAsync();
        this.automaticallyRefreshToken();
        this.authenticated$.next(this.authenticated);
    }

    private async checkKeycloakAuthenticationAsync(): Promise<boolean> {
        try {
            return await this.keycloak.init({
                onLoad: 'check-sso',
                silentCheckSsoRedirectUri: `${location.origin}/assets/silent-check-sso.html`
            });
        } catch (error) {
            this.router.navigate(['/global-errors/auth-timeout'], {skipLocationChange: true});
            return new Promise<boolean>(resolve => resolve(false));
        }
    }

    private async loadUserProfileAsync(): Promise<void> {
        try {
            const profile = await this.keycloak.loadUserProfile();

            this.profile = profile;
            this.profile$.next(this.profile);
        } catch (error) {
            this.router.navigate(['/global-errors/profile-not-loaded'], {
                skipLocationChange: true,
            });
        }
    }

    public login(): void {
        this.keycloak.login();
    }

    public logout(): void {
        this.keycloak.logout();
    }

    /**
     * Gets the user's authentication token from Keycloak.
     * @returns The user's authentication token or an empty string if not authenticated.
     */
    public getToken(): string {
        return this.keycloak.token ? this.keycloak.token : '';
    }

    protected automaticallyRefreshToken(): void {
        this.keycloak.onTokenExpired = (): void => {
            this.keycloak.updateToken(this.MIMNIMUM_VALID_TIME).then(() => {
            });
        }
    }

    /**
     * Gets the roles associated with the user from the Keycloak token.
     * @returns An array of role names or an empty array if not authenticated or roles are not present.
     */
    public getRoles(): string[] {
        if (!this.keycloak.token) {
            return [];
        }

        const decodedToken: any = jwtDecode(this.keycloak.token);
        const realmRoles: string[] = decodedToken.realm_access?.roles || [];

        return realmRoles;
    }

    public getAuthenticated(): boolean {
        return this.authenticated;
    }
}
