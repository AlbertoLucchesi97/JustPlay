describe('SearchPage', () => {
    it('should display the results in a page when a valid entry has been made in the search box', () => {
        cy.visit('/');
        cy.get('input[name="search"]').type('The Callisto Protocol{enter}');

        cy.url().should('include', 'search');
        cy.get('p[name="results"]').should('be.visible');
        cy.get('app-videogame').should('be.visible');
    })

    it('should display an empty result when a unvalid entry has been made in the search box', () => {
        cy.visit('/');
        cy.get('input[name="search"]').type('{enter}');

        cy.url().should('include', 'search');
        cy.get('p[name="results"]').should('be.visible');
        cy.get('app-videogame').should('not.be.true');
    })
})