# Hemiron - Frontend

## Overview

Welcome to the Hemiron Angular frontend! This application serves as the dashboard for the Hemiron services. It was initially created using Angular CLI version 13.1.3 and has been subsequently updated to version 17.0.1. The frontend now uses PrimeNG for its component library and utilizes Tailwind CSS for styling and general layouts.

## PrimeNG Components

When adding new components, refer to the [PrimeNG](https://primeng.org/installation) documentation for guidance. Ensure that you continue to use existing shared components when applicable. We want to get rid of the existing shared components in favor of PrimeNg's.

## Styling with Tailwind CSS

For styling and layouts, the project utilizes Tailwind CSS. Consult the [Tailwind CSS documentation](https://tailwindcss.com/docs) to find the appropriate classes. Avoid using plain CSS for styling.

## Development server
1. Make sure you're logged in to the GitLab registry: `docker login registry.inf-hsleiden.nl`
2. Run `docker compose up` to start the keycloak development server on `http://localhost:8001`
3. In a second terminal, run `ng serve` to start a development Angular server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Keycloak Development Server
On starting the keycloak development server a 'hemiron' realm with a 'hemiron-login' client is automatically created. A user is also created in the 'hemiron' realm with 'admin' as username and password. You can use the same credentials to log in to the admin panel on `http://localhost:8001/admin`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `cypress:open` to open the end-to-end tests dashboard and then execute.

## Deployment

Deployments will be automatically handled through the existing pipeline.
