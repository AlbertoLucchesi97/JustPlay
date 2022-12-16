describe('Login Tests', () => {
    it('Visits the home page and login', () => {
      cy.visit('/')
      cy.get('app-auth-login-button').click();
      cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
        cy.get('input[id="username"]').type('test@test.com');
        cy.get('input[id="password"]').type('Test123@@');
        cy.get('button').eq(1).click();
      })

      cy.get('app-auth-logout-button').should('be.visible');
    })
  })