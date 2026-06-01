describe('Testes do backend ExpressJS', () => {
  it('deve retornar status ok', () => {
    cy.request('/api/status').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('ok');
    });
  });

  it('deve listar perfis', () => {
    cy.request('/api/profiles').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('deve criar um perfil', () => {
    cy.request('POST', '/api/profiles', {
      name: 'Maria',
      email: 'maria@email.com'
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq('Maria');
      expect(response.body.email).to.eq('maria@email.com');
    });
  });

  it('deve atualizar um perfil', () => {
    cy.request('POST', '/api/profiles', {
      name: 'Carlos',
      email: 'carlos@email.com'
    }).then((createResponse) => {
      const id = createResponse.body.id;

      cy.request('PUT', `/api/profiles/${id}`, {
        name: 'Carlos Atualizado'
      }).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);
        expect(updateResponse.body.name).to.eq('Carlos Atualizado');
      });
    });
  });
});
