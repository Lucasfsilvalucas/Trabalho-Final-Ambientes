describe('Testes do frontend - página de perfil', () => {
  beforeEach(() => {
    cy.visit('/index.html');
    cy.clearLocalStorage();
  });

  it('deve exibir a página principal', () => {
    cy.contains('App Social').should('be.visible');
    cy.contains('Editar perfil').should('be.visible');
    cy.contains('Prévia do perfil').should('be.visible');
  });

  it('deve salvar e exibir o perfil preenchido', () => {
    cy.get('#nameInput').type('Lucas Silva');
    cy.get('#emailInput').type('lucas@email.com');
    cy.get('#summaryInput').type('Sou estudante e gosto de tecnologia.');
    cy.get('#saveBtn').click();

    cy.contains('Perfil salvo no navegador com sucesso!').should('be.visible');
    cy.get('#profilePreview').contains('Lucas Silva').should('be.visible');
    cy.get('#profilePreview').contains('lucas@email.com').should('be.visible');
    cy.get('#profilePreview').contains('Sou estudante e gosto de tecnologia.').should('be.visible');
  });

  it('deve validar campos obrigatórios', () => {
    cy.get('#saveBtn').click();
    cy.contains('Preencha nome, email e resumo.').should('be.visible');
  });

  it('deve limpar o perfil', () => {
    cy.get('#nameInput').type('Lucas Silva');
    cy.get('#emailInput').type('lucas@email.com');
    cy.get('#summaryInput').type('Resumo de teste.');
    cy.get('#saveBtn').click();
    cy.get('#clearBtn').click();

    cy.contains('Perfil limpo.').should('be.visible');
    cy.get('#profilePreview').contains('Nenhum perfil preenchido ainda.').should('be.visible');
  });
});
