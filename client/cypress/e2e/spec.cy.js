describe('Basic Test', () => {
  it('works', () => {
    cy.visit('http://localhost:3001');
    cy.contains('h1', 'Makarasham Weather History').should('exist');
  });
});
