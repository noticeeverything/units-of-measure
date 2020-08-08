describe('NotFound', () => {
  beforeEach(() => {
    cy.visit('/fake');
  });

  it('displays a `not found` message', () => {
    cy.get('h1').contains('OH, SNAP!');
    cy.get('p').contains('The page you asked for doesn\'t exist...the sadness.');
    cy.get('a').contains('take me back to known territory');
  });
});
