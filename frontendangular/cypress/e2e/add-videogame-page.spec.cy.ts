describe('AddVideogamePage Tests', () => {
    it('should login and click on add videogame and display the page', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();

        cy.url().should('include', 'add');

        cy.get('label[name="title"]').should('be.visible');
        cy.get('input[name="title"]').should('be.visible');

        cy.get('label[name="releaseDate"]').should('be.visible');
        cy.get('input[name="releaseDate"]').should('be.visible');

        cy.get('label[name="genre"]').should('be.visible');
        cy.get('input[name="genre"]').should('be.visible');

        cy.get('label[name="softwareHouse"]').should('be.visible');
        cy.get('input[name="softwareHouse"]').should('be.visible');

        cy.get('label[name="publisher"]').should('be.visible');
        cy.get('input[name="publisher"]').should('be.visible');

        cy.get('label[name="synopsis"]').should('be.visible');
        cy.get('input[name="synopsis"]').should('be.visible');

        cy.get('label[name="cover"]').should('be.visible');
        cy.get('input[name="cover"]').should('be.visible');

        cy.get('label[name="trailer"]').should('be.visible');
        cy.get('input[name="trailer"]').should('be.visible');

        cy.get('span[Title="Save"]').should('be.visible');
    })

    it('button should be disabled if title has errors', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();
        cy.get('input[name="releaseDate"]').type("2022-12-01");
        cy.get('input[name="genre"]').type("Test");
        cy.get('input[name="softwareHouse"]').type("Test");
        cy.get('input[name="publisher"]').type("Test");
        cy.get('input[name="synopsis"]').type("TestTestTestTestTest");
        cy.get('input[name="cover"]').type("Test");
        cy.get('input[name="trailer"]').type("Test");

        cy.get('button').should('be.disabled');
    })

    it('button should be disabled if genre has errors', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();
        cy.get('input[name="title"]').type("Test");
        cy.get('input[name="releaseDate"]').type("2022-12-01");
        cy.get('input[name="softwareHouse"]').type("Test");
        cy.get('input[name="publisher"]').type("Test");
        cy.get('input[name="synopsis"]').type("TestTestTestTestTest");
        cy.get('input[name="cover"]').type("Test");
        cy.get('input[name="trailer"]').type("Test");

        cy.get('button').should('be.disabled');
    })

    it('button should be disabled if softwareHouse has errors', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();
        cy.get('input[name="title"]').type("Test");
        cy.get('input[name="releaseDate"]').type("2022-12-01");
        cy.get('input[name="genre"]').type("Test");
        cy.get('input[name="publisher"]').type("Test");
        cy.get('input[name="synopsis"]').type("TestTestTestTestTest");
        cy.get('input[name="cover"]').type("Test");
        cy.get('input[name="trailer"]').type("Test");

        cy.get('button').should('be.disabled');
    })

    it('button should be disabled if publisher has errors', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();
        cy.get('input[name="title"]').type("Test");
        cy.get('input[name="releaseDate"]').type("2022-12-01");
        cy.get('input[name="genre"]').type("Test");
        cy.get('input[name="softwareHouse"]').type("Test");
        cy.get('input[name="synopsis"]').type("TestTestTestTestTest");
        cy.get('input[name="cover"]').type("Test");
        cy.get('input[name="trailer"]').type("Test");

        cy.get('button').should('be.disabled');
    })

    it('button should be disabled if synopsis has errors', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();
        cy.get('input[name="title"]').type("Test");
        cy.get('input[name="releaseDate"]').type("2022-12-01");
        cy.get('input[name="genre"]').type("Test");
        cy.get('input[name="softwareHouse"]').type("Test");
        cy.get('input[name="publisher"]').type("Test");
        cy.get('input[name="cover"]').type("Test");
        cy.get('input[name="trailer"]').type("Test");

        cy.get('button').should('be.disabled');
    })

    it('button should be disabled if cover has errors', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();
        cy.get('input[name="title"]').type("Test");
        cy.get('input[name="releaseDate"]').type("2022-12-01");
        cy.get('input[name="genre"]').type("Test");
        cy.get('input[name="softwareHouse"]').type("Test");
        cy.get('input[name="publisher"]').type("Test");
        cy.get('input[name="synopsis"]').type("TestTestTestTestTest");
        cy.get('input[name="trailer"]').type("Test");

        cy.get('button').should('be.disabled');
    })

    it('button should be disabled if trailer has errors', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();
        cy.get('input[name="title"]').type("Test");
        cy.get('input[name="releaseDate"]').type("2022-12-01");
        cy.get('input[name="genre"]').type("Test");
        cy.get('input[name="softwareHouse"]').type("Test");
        cy.get('input[name="publisher"]').type("Test");
        cy.get('input[name="synopsis"]').type("TestTestTestTestTest");
        cy.get('input[name="cover"]').type("Test");

        cy.get('button').should('be.disabled');
    })

    it('button should be enabled if all inputs have no errors', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();
        cy.get('input[name="title"]').type("Test");
        cy.get('input[name="releaseDate"]').type("2022-12-01");
        cy.get('input[name="genre"]').type("Test");
        cy.get('input[name="softwareHouse"]').type("Test");
        cy.get('input[name="publisher"]').type("Test");
        cy.get('input[name="synopsis"]').type("TestTestTestTestTest");
        cy.get('input[name="cover"]').type("Test");
        cy.get('input[name="trailer"]').type("Test");

        cy.get('button').should('be.enabled')
    })

    it('should display an error if you write a title and then let the input blank', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();
        cy.get('input[name="title"]').type("Test").clear();
        cy.get('span[class="fieldError"]').should('be.visible');
    })

    it('should display an error if you write the genre and then let the input blank', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();
        cy.get('input[name="genre"]').type("Test").clear();
        cy.get('span[class="fieldError"]').should('be.visible');
    })

    it('should display an error if you write the software house and then let the input blank', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();
        cy.get('input[name="softwareHouse"]').type("Test").clear();
        cy.get('span[class="fieldError"]').should('be.visible');
    })

    it('should display an error if you write the publisher and then let the input blank', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();
        cy.get('input[name="publisher"]').type("Test").clear();
        cy.get('span[class="fieldError"]').should('be.visible');
    })

    it('should display an error if you write the synopsis and then let the input blank', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();
        cy.get('input[name="synopsis"]').type("Test").clear();
        cy.get('span[class="fieldError"]').should('be.visible');
    })

    it('should display an error if you write a synopsis shorter than 20 characters', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();
        cy.get('input[name="synopsis"]').type("Test");
        cy.get('span[class="fieldError"]').should('be.visible');
    })

    it('should display an error if you set the cover and then let the input blank', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();
        cy.get('input[name="cover"]').type("Test").clear();
        cy.get('span[class="fieldError"]').should('be.visible');
    })

    it('should display an error if you set the trailer and then let the input blank', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();
        cy.get('input[name="trailer"]').type("Test").clear();
        cy.get('span[class="fieldError"]').should('be.visible');
    })

    it('should submit successfully a videogame and then get back to the homepage', () => {
        cy.visit('/')
        cy.get('app-auth-login-button').click();
        cy.origin('https://dev-stdir6nx.us.auth0.com', () => {
            cy.get('input[id="username"]').type('test@test.com');
            cy.get('input[id="password"]').type('Test123@@');
            cy.get('button').eq(1).click();
        })

        cy.get('span[title="Add Videogame"]').click();
        cy.get('input[name="title"]').type("Test");
        cy.get('input[name="releaseDate"]').type("2022-12-01");
        cy.get('input[name="genre"]').type("Test");
        cy.get('input[name="softwareHouse"]').type("Test");
        cy.get('input[name="publisher"]').type("Test");
        cy.get('input[name="synopsis"]').type("TestTestTestTestTest");
        cy.get('input[name="cover"]').type("Test");
        cy.get('input[name="trailer"]').type("Test");

        cy.get('button').click();
        cy.url().should('not.include', 'add');
    })
  })
  