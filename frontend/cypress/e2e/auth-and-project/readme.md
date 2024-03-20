# Auth en Projects e2e Tests
Alle tests in dit mapje zitten alle tests die onder de scope van team Auth en Projects vallen

## 1. Opzetten van de tests
De e2e tests in dit mapje werkend te krijgen moet je de volgende stappen voplgen

### 1.1 Runnen van de Keycloak container
Om door de login pagina van de Hemiron applicatie te komen moet je een Keycloak container draaien. Hier kan je de Keycloak container van de
Auth API repo gebruiken (https://gitlab.inf-hsleiden.nl/hemiron/auth/container_registry/255). Deze container draait standaard op http://localhost:8001

### 1.2  Configuraties instellen
Om onze tests te draaien moet je de volgende cypress config hebben.

```typescript
export default defineConfig({
  env: {
    baseUrl: 'http://localhost:4200',
    authApiBaseUrl: 'http://localhost:8080/api',
    ...
  },
  ...
})
```

Je hoeft de Auth API niet lokaal draaiend te hebben, wel is het belangrijk dat de "projectsURL" in de environment.ts van de applicatie naar dezelfde route wijst als "authApiBaseUrl" in de cypress config.
baseUrl en authApiBaseUrl worden gevuld met localhost. Als je deze vult met de urls naar productie dan werken de tests niet.

De environment.ts voor de applicatie ziet er ongeveer als volgt uit.
```typescript
export const environment = {
  projectsURL: 'http://localhost:8080/api/',
  keycloakURL: 'http://localhost:8001',
  keycloakRealm: 'hemiron',
  keycloakClientId: 'hemiron-login',
  ...
};
```

## 2. Gemaakte keuzes
### 2.1 Mocking
Er is voor gekozen om de responses van de Auth API te mocken (m.b.v fixtures)
