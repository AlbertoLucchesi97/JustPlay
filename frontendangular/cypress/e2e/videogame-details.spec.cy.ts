describe('VideogameDetails Tests', () => {
    it('Open a videogame page and should be displayed with all info', () => {
        cy.visit('/')
        cy.get('app-videogame').eq(0).click();
      
        cy.get('img[id="cover"]').should('be.visible').should('not.be.null');
        cy.get('span[id="title"]').should('be.visible').should('not.be.null');
        cy.get('span[id="release_date"]').should('be.visible').should('not.be.null');
        cy.get('span[id="genre"]').should('be.visible').should('not.be.null');
        cy.get('span[id="software_house"]').should('be.visible').should('not.be.null');
        cy.get('span[id="publisher"]').should('be.visible').should('not.be.null');
        cy.get('textarea[id="synopsis"]').should('be.visible').should('not.be.null');
        cy.get('iframe[id="trailer"]').should('be.visible').should('not.be.null');
    })

    it('should be able to see the buttons for adding the game to wishlist and owned if logged', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('app-videogame').eq(0).click();
        cy.get('span[Title="Add in Wishlist"]').should('be.visible');
        cy.get('span[Title="Add to owned"]').should('be.visible');
    })

    it('should not see the wishlist and owned buttons if not logged', () => {
        cy.visit('/');
        cy.get('app-videogame').eq(0).click();
        cy.get('span[Title="Add in Wishlist"]').should('not.be.true');
        cy.get('span[Title="Add to owned"]').should('not.be.true');
    })

    it('should see buttons for edit and delete if logged as admin', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('app-videogame').eq(0).click();
        cy.get('span[Title="Edit"]').should('be.visible');
        cy.get('span[Title="Delete"]').should('be.visible');
    })

    it('should not see buttons for edit and delete if not logged as admin', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test2@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('app-videogame').eq(0).click();
        cy.get('span[Title="Edit"]').should('not.be.true');
        cy.get('span[Title="Delete"]').should('not.be.true');
    })

    it('should see a list of similar games in the page', () => {
        cy.visit('/');
        cy.get('app-videogame').eq(0).click();
        cy.get('app-videogames-list').should('be.visible');
    })

    it('should delete the videogame if the button is click and return to the homepage', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('app-videogame').eq(5).click();
        cy.get('span[Title="Delete"]').click();
        cy.url().should('not.include', 'videogames');
    } )
  })
  