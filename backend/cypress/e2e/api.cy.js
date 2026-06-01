describe('Testes do backend ExpressJS sem banco de dados', () => {
  it('deve retornar status ok', () => {
    cy.request('/api/status').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('ok');
    });
  });

  it('deve retornar o perfil atual', () => {
    cy.request('/api/profile').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('email');
      expect(response.body).to.have.property('summary');
    });
  });

  it('deve salvar um perfil em memória', () => {
    cy.request('POST', '/api/profile', {
      name: 'Lucas Silva',
      email: 'lucas@email.com',
      summary: 'Resumo criado pelo teste.'
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq('Lucas Silva');
      expect(response.body.email).to.eq('lucas@email.com');
      expect(response.body.summary).to.eq('Resumo criado pelo teste.');
    });
  });

  it('deve atualizar o perfil em memória', () => {
    cy.request('PUT', '/api/profile', {
      summary: 'Resumo atualizado pelo Cypress.'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.summary).to.eq('Resumo atualizado pelo Cypress.');
    });
  });
});
