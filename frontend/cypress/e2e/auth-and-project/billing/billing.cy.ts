describe('Billing tests', () => {
  const getProjectPath = "/users/user/projects"

  beforeEach(() => {
    cy.loginWithCredentials("john doe", "test")
  });

  it('check if billing button works', () => {
    cy.openProjectOne();
    cy.get('[ng-reflect-router-link="./"] > .menu-button > .p-ripple > .fas').click();
    cy.get('.mr-2').click();
    cy.get('[ng-reflect-router-link="./billing"] > p-button.p-element > .p-ripple > .p-button-label').click();
    cy.get('canvas[basechart][ng-reflect-datasets][ng-reflect-labels][ng-reflect-options][ng-reflect-legend]')
        .should('exist');
  });

  it('check if "gebruik" works', () => {
    cy.wait(1000);
    cy.openProjectOne();


    cy.get('#pn_id_28_header_action > .p-tabview-title').click();
    cy.get('#pn_id_29_header_action > .p-tabview-title').click();
    cy.get('#pn_id_30_header_action').click();
    cy.get('#pn_id_37 > .p-dropdown-trigger').click();
    cy.get('#pn_id_37_1 > .ng-star-inserted').click();

  });
  it('check if "facturen" works', () => {
    cy.wait(1000);
    cy.openProjectOne();
    cy.get('.text-sm').click();
  });

  it('check if you can change product price', () => {
    cy.wait(1000);
    cy.openProjectOne();
    cy.get('.user > .p-ripple').click();
    cy.get('[ng-reflect-router-link="./billing/products"] > p-button.p-element > .p-ripple > .p-button-label').click();
    cy.get('form > :nth-child(1) > .p-inputtext').clear('0');
    cy.get('form > :nth-child(1) > .p-inputtext').type('0.24');
    cy.get(':nth-child(2) > .p-inputtext').clear('0');
    cy.get(':nth-child(2) > .p-inputtext').type('0.45');
    cy.get(':nth-child(3) > .p-inputtext').clear('0');
    cy.get(':nth-child(3) > .p-inputtext').type('0.25');
    cy.get(':nth-child(4) > .p-inputtext').clear('0');
    cy.get(':nth-child(4) > .p-inputtext').type('0.91');
    cy.get('.text-sm').click();
  });

  it('check if graph shows in usage view', () => {
    cy.openProjectOne();
    cy.get('#pn_id_32 > .p-dropdown-trigger').click();
    cy.get('#pn_id_32_1 > .ng-star-inserted').click();
    cy.get('#pn_id_32 > .p-dropdown-trigger > .p-element > .p-dropdown-trigger-icon').click();
    cy.get('#pn_id_32_2').click();
    cy.get('#pn_id_32 > .p-dropdown-trigger').click();
    cy.get('#pn_id_32_3 > .ng-star-inserted').click();
    cy.get('#pn_id_29_header_action > .p-tabview-title').click();
    cy.get('#pn_id_34 > .p-dropdown-label').click();
    cy.get('#pn_id_34_0').click();
    cy.get('#pn_id_34 > .p-dropdown-trigger').click();
    cy.get('#pn_id_34_1 > .ng-star-inserted').click();
    cy.get('#pn_id_34 > .p-dropdown-trigger').click();
    cy.get('#pn_id_34_2').click();
    cy.get('#pn_id_34 > .p-dropdown-trigger').click();
    cy.get('#pn_id_34_3').click();
    cy.get('#pn_id_30_header_action > .p-tabview-title').click();
    cy.get('#pn_id_36 > .p-dropdown-trigger').click();
    cy.get('#pn_id_36_0').click();
    cy.get('#pn_id_36 > .p-dropdown-trigger').click();
    cy.get('#pn_id_36_1 > .ng-star-inserted').click();
    cy.get('#pn_id_36 > .p-dropdown-trigger > .p-element > .p-dropdown-trigger-icon').click();
    cy.get('#pn_id_36_2').click();
    cy.get('#pn_id_36 > .p-dropdown-trigger').click();
    cy.get('#pn_id_36_3 > .ng-star-inserted').click();
    cy.get('#pn_id_31_header_action > .p-tabview-title').click();
    cy.get('#pn_id_38 > .p-dropdown-label').click();
    cy.get('#pn_id_38_0').click();
    cy.get('#pn_id_38 > .p-dropdown-trigger').click();
    cy.get('#pn_id_38_1 > .ng-star-inserted').click();
    cy.get('#pn_id_38 > .p-dropdown-trigger').click();
    cy.get('#pn_id_38_2').click();
    cy.get('#pn_id_38 > .p-dropdown-trigger > .p-element > .p-dropdown-trigger-icon').click();
    cy.get('#pn_id_38_3 > .ng-star-inserted').click();
    cy.get('app-pages.ng-star-inserted').click();
  })
});
