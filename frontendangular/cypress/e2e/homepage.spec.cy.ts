describe('HomePage Tests', () => {
  it('Visits the home page', () => {
    cy.visit('/')
    cy.get('app-videogames-list').should('be.visible')
  })

  it('add videogame button should not be visible if not logged in', () => {
    cy.visit('/');
    cy.get('span[title="Add Videogame"]').should('not.be.true');
  })

  it('add videogame button should not be visible if not logged as admin', () => {
    cy.visit('/')
      cy.get('app-auth-login-button').click();
      cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
        cy.get('input[id="username"]').type('test2@test.com');
        cy.get('input[id="password"]').type('Test123@@');
        cy.get('button').eq(1).click();
      })

    cy.get('span[title="Add Videogame"]').should('not.be.true');
  })

  it('add videogame button should be visible if logged in', () => {
    cy.visit('/')
      cy.get('app-auth-login-button').click();
      cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
        cy.get('input[id="username"]').type('test@test.com');
        cy.get('input[id="password"]').type('Test123@@');
        cy.get('button').eq(1).click();
      })

    cy.get('span[title="Add Videogame"]').should('be.visible');
  })
})
