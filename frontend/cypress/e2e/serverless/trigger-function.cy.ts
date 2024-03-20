import 'cypress-file-upload';
import { generateRandomLetterString } from 'cypress/support/randomletters';


let baseUrl = Cypress.env("baseUrl");
let email = Cypress.env("email");
let password = Cypress.env("password");
let projectName = Cypress.env("project");
let functionName = 'triggerfunctiontest' + generateRandomLetterString(10)

describe('Trigger a serverless function test', () => {
  // Voor die test moet men toegevoegd zijn aan een project en de email veranderen naar eigen e-mail.
  // Hier wordt de productie link gebruikt in cypress.config.ts. Als men dat doet dan zou het werken.
  // Als het account niet bestaat, maak eentje aan in verander de email en wachtwoord waarde.
  // Ook moet de laatste serverless functie successfull zijn geupload
    
  beforeEach(() => {
      cy.visit(baseUrl);
      cy.wait(2000);
      cy.get('#username').type(email);
      cy.get('#password').type(password);
      cy.get('#kc-login').click();
  })

  it('should upload a serverless function with competed resolution', () => {
    cy.visit(baseUrl + `/project/${projectName}/serverless/create`);

    cy.get('input[name="name"]').type(functionName);

    const handler = 'handler.py';
    cy.get('input[name="handler"]').attachFile(handler);
    cy.get('button[type="submit"]:first').click();
    cy.get('.text-red-500', {timeout: 4000}).should('not.exist');
    cy.wait(40000)

    cy.get('#function-refresh').click()
    cy.wait(1000)
    cy.get('#function-state').contains('COMPLETED').should('be.visible')
  })

  it('should trigger a serverless function', () => {
    cy.visit(baseUrl + `/project/${projectName}/serverless`);

      cy.wait(2000);

      let container = cy.get('#function-containers');
      container.children().should('exist')
      container.children().last().click()

      cy.get('#function-url').invoke('attr', 'href').then(href => {
        cy.request({
          method: 'GET', 
          url: href
        }).then(response => {
          expect(response.status).to.eq(200);
        });
      });
  })
});