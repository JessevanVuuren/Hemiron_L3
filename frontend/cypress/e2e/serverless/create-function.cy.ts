import 'cypress-file-upload';
import { generateRandomLetterString } from 'cypress/support/randomletters';

let baseUrl = Cypress.env("baseUrl");
let email = Cypress.env("email");
let password = Cypress.env("password");
let projectName = Cypress.env("project");
let randomName = generateRandomLetterString(10)
describe('Upload serverless functions test', () => {
  //Voor die test moet men toegevoegd zijn aan een project en de email veranderen naar eigen e-mail.
  //Hier wordt de productie link gebruikt in cypress.config.ts. Als men dat doet dan zou het werken.
  //Als de account niet bestaat, maak eentje aan in verander de email en wachtwoord waarde.
  beforeEach(() => {
    cy.visit(baseUrl);
    cy.wait(2000);
    cy.get('#username').type(email);
    cy.get('#password').type(password);
    cy.get('#kc-login').click();
  });

  it('should fill in function name and upload handler.py successfully without the requirements.txt', () => {
    cy.visit(baseUrl + `/project/${projectName}/serverless/create`);

    cy.get('input[name="name"]').type('testwithoutreq' + randomName);

    const handler = 'handler.py';
    cy.get('input[name="handler"]').attachFile(handler);
    cy.get('button[type="submit"]:first').click();
    cy.get('.text-red-500', {timeout: 4000}).should('not.exist');
  });

  it('should fill in function name and upload handler.py successfully with the requirements.txt', () => {
    cy.visit(baseUrl + `/project/${projectName}/serverless/create`);

    cy.get('input[name="name"]').type('testwithreq' + randomName);

    const requirements = 'requirements.txt';
    const handler = 'handler.py';

    cy.get('input[name="handler"]').attachFile(handler);
    cy.get('input[name="requirements"]').attachFile(requirements);
    cy.get('button[type="submit"]:first').click();
    cy.get('.text-red-500', {timeout: 4000}).should('not.exist');
  });

  it('should fill in function name, upload handler.py, change the code editor content, and submit without an error', () => {
    cy.visit(baseUrl + `/project/${projectName}/serverless/create`);

    cy.get('input[name="name"]').type('testchangecontent' + randomName);

    const fileName = 'handler.py';
    cy.get('input[name="handler"]').attachFile(fileName);

    cy.window().then(win => {
      //This ts ignore is needed because the ace editor is not known by typescript.
      // @ts-ignore
      const editor = win.ace.edit('editor');
      editor.session.setValue("def handle(r): \n" +
          "    print('Martin is here')");
    });

    cy.contains('button', 'Upload').click();

    cy.get('button[type="submit"]:contains("Create")').click();
    cy.get('button[type="submit"]:first').click();

    cy.get('.text-red-500', {timeout: 4000}).should('not.exist');

    cy.url().should('include', `/project/${projectName}/serverless/`).and((url) => {
      const regex = new RegExp(`/project/${projectName}/serverless/[^/]+$`);
      expect(url).to.match(regex);
    });
  });
});

