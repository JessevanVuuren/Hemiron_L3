declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Log in with a specific username and password.
     * @param {string} username - The username to log in with.
     * @param {string} password - The password to log in with.
     * @example
     *   cy.loginWithCredentials('your_username', 'your_password');
     */
    loginWithCredentials: (
      username: string,
      password: string
    ) => Chainable<Subject>;

    /**
     * Login as an user with basic access to the application.
     * @example
     *   cy.loginAsUser();
     */
    loginAsUser: () => Chainable<Subject>;

    /**
     * Log in as a customer with CRUD rights on projects and users.
     * @example
     *   cy.loginAsCustomer();
     */
    loginAsCustomer: () => Chainable<Subject>;


    /**
     * Log in as a customer and create a project if it doesn't exist. Afterwards open the billings page.
     * @example
     *   cy.lopenProjectOne();
     */
    openProjectOne: () => Chainable<Subject>;

    /**
     * Intercept an Auth API's paginated page request.
     * 
     * @param {string} endpoint - The Auth API endpoint to intercept.
     * @param {number} pageNumber - The page number to intercept.
     * @param {number} pageSize - The page size to intercept.
     * @param {any} fixture - The fixture data to respond with.
     * @returns 
     * @example
     *   // Intercept the paginated page request for endpoint 'exampleEndpoint'
     *   // with page number 1 and page size 10, responding with the provided fixture data.
     *   cy.interceptAuthApiGetPaginatedPage('exampleEndpoint', 1, 10, { " your fixture data here " });
     *
     *   // Wait for the intercepted requests to complete and then perform assertions on the UI.
     *   cy.wait('@page1'); 
     *   cy.get('.project-table tbody tr').should('have.length', 10);
    */
    interceptAuthApiGetPaginatedPage: (
        endpoint: string,
        pageNumber: number,
        pageSize: number,
        fixture: any
    ) => Chainable<Subject>;

    interceptAuthApiDeleteRequest: (
        endpoint: string,
        projectId: string,
        fixture: any
    ) => Chainable<Subject>;

    openProjectCreationModalAndCreateProject: (
        name: string,
        description: string
    ) => Chainable<Subject>;

  }
}

Cypress.Commands.add("loginWithCredentials", (username, password) => {
  let baseUrl = Cypress.env("baseUrl");

  cy.visit(baseUrl);
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('#kc-login').click();

  return cy;
});

Cypress.Commands.add("loginAsCustomer", () => {
  let baseUrl = Cypress.env("baseUrl");

  cy.visit(baseUrl);
  cy.get('#username').type("john.doe@gmail.com");
  cy.get('#password').type("test");
  cy.get('#kc-login').click();

  return cy;
});

Cypress.Commands.add('openProjectCreationModalAndCreateProject', (name, description) => {
  cy.wait('@pageNumber0-pageSize10');
  cy.get('.filter-menu p-button').should('contain.text', 'Nieuw Project').click();
  cy.get('input#name').type(name);
  cy.get('textarea#description').type(description);
  cy.get('button.p-button').contains('Aanmaken').click();
});

Cypress.Commands.add("openProjectOne", () => {
  cy.get('body').then($body => {
    if ($body.find('td:contains("test1")').length === 0) {
      cy.get('.p-button-label').click();
      cy.get('#name').type('test1');
      cy.get('#description').type('test1');
      cy.get('#path').type('test1');
      cy.get('form.ng-dirty > p-button.p-element > .p-ripple').click();
      cy.reload();
    } else {
      cy.log('Element with text "test1" already exists');
    }
  });
  cy.get('td[ng-reflect-router-link="/project/,test1"]').should($td => {
    expect($td).to.have.length.at.least(1);
  }).then($td => {
    cy.wrap($td).first().click();
  });


  cy.get('[ng-reflect-router-link="/project,test1,billing"] > p-button.p-element > .p-ripple').click();
})

Cypress.Commands.add("loginAsUser", () => {
  let baseUrl = Cypress.env("baseUrl");

  cy.visit(baseUrl);
  cy.get('#username').type("jane.doe@gmail.com");
  cy.get('#password').type("test");
  cy.get('#kc-login').click();

  return cy;
});

Cypress.Commands.add('interceptAuthApiDeleteRequest', (endpoint, projectId, fixture) => {
  const authApiBaseUrl = Cypress.env('authApiBaseUrl');

  cy.intercept(
      'DELETE',
      `${authApiBaseUrl}${endpoint}/${projectId}`,
      { fixture }
  ).as(`deleteRequest-${projectId}`);
});

Cypress.Commands.add('interceptAuthApiGetPaginatedPage', (endpoint, pageNumber, pageSize, fixture) => {
  const authApiBaseUrl = Cypress.env('authApiBaseUrl');

  cy.intercept(
    'GET',
    `${authApiBaseUrl}${endpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=`,
    { fixture }
  ).as(`pageNumber${pageNumber}-pageSize${pageSize}`);
});