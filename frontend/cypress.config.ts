import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    //Here you can change the values to your own values of your account. Like the email and password and a correct project name that exists.
    baseUrl: 'http://localhost:4200',
    authApiBaseUrl: 'http://localhost:8080/api',
    project: 'test123',
    email: 'martinveltman@live.nl',
    password: 'Cartman1'
  },
  e2e: {
    experimentalStudio: true,
    chromeWebSecurity: false
  },
})
