describe('Testes do frontend', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:3000/api/profiles', {
      statusCode: 201,
      body: {
        id: 2,
        name: 'Ana',
        email: 'ana@email.com',
        imageUrl: ''
      }
    }).as('createProfile');

    cy.intercept('GET', 'http://localhost:3000/api/profiles/1', {
      statusCode: 200,
      body: {
        id: 1,
        name: 'Lucas',
        email: 'lucas@email.com',
        imageUrl: ''
      }
    }).as('loadProfile');

    cy.intercept('PUT', 'http://localhost:3000/api/profiles/1', {
      statusCode: 200,
      body: {
        id: 1,
        name: 'Lucas Atualizado',
        email: 'lucas@email.com',
        imageUrl: ''
      }
    }).as('updateProfile');

    cy.visit('/index.html');
  });

  it('deve exibir a tela principal', () => {
    cy.contains('App Social').should('be.visible');
    cy.contains('Cadastrar perfil').should('be.visible');
    cy.contains('Buscar perfil').should('be.visible');
    cy.contains('Perfil').should('be.visible');
  });

  it('deve cadastrar um perfil pelo formulário', () => {
    cy.get('#regName').type('Ana');
    cy.get('#regEmail').type('ana@email.com');
    cy.get('#registerBtn').click();

    cy.wait('@createProfile');
    cy.contains('Perfil cadastrado com sucesso!').should('be.visible');
    cy.contains('Ana').should('be.visible');
    cy.contains('ana@email.com').should('be.visible');
  });

  it('deve carregar um perfil existente', () => {
    cy.get('#profileId').clear().type('1');
    cy.get('#loadBtn').click();

    cy.wait('@loadProfile');
    cy.contains('Lucas').should('be.visible');
    cy.contains('lucas@email.com').should('be.visible');
  });

  it('deve atualizar um perfil carregado', () => {
    cy.get('#profileId').clear().type('1');
    cy.get('#loadBtn').click();
    cy.wait('@loadProfile');

    cy.get('#newName').type('Lucas Atualizado');
    cy.get('#updateBtn').click();

    cy.wait('@updateProfile');
    cy.contains('Perfil atualizado com sucesso!').should('be.visible');
    cy.contains('Lucas Atualizado').should('be.visible');
  });
});
