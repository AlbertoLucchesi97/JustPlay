describe('ProfilePage Tests', () => {
    it('should display the page when clicked on the user icon on header', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })
        
        cy.get('span[title="Profile"]').should('be.visible').click();
        
        cy.url().should('include', 'profile');

        cy.get('h2[name="profileLabel"]').should('be.visible');
        
        cy.get('span[name="profileOwnedLabel"]').should('be.visible');
        cy.get('app-videogames-list[name="profileOwnedVg"]').should('be.visible');

        cy.get('span[name="profileWishlistLabel"]').should('be.visible');
        cy.get('app-videogames-list[name="profileWishlistVg"]').should('be.visible');
    })

    it('should not show owned videogames if user does not have any of them', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test2@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })
        
        cy.get('span[title="Profile"]').should('be.visible').click();

        cy.get('span[name="profileOwnedLabel"]').should('be.visible');
        cy.get('app-videogames-list[name="profileOwnedVg"]').should('not.be.true');
    })

    it('should not show wishlist videogames if user does not have any of them', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test2@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })
        
        cy.get('span[title="Profile"]').should('be.visible').click();

        cy.get('span[name="profileWishlistLabel"]').should('be.visible');
        cy.get('app-videogames-list[name="profileWishlistVg"]').should('not.be.true');
    })
})