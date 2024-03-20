describe('Auth test', () => {
  it('should login as user to hemiron', () => {
    cy.loginAsUser()
  });

  it('should login as customer to hemiron', () => {
    cy.loginAsCustomer()
  });

  it('should show error when logging into hemiron.com with false credentials', () => {
    let email = "falseemail@gmail.com";
    let password = "fakepassword";
    
    cy.loginWithCredentials(email, password);

    cy.get('#input-error')
        .should('be.visible')
  });
});