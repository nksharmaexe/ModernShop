describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the home page', () => {
    cy.get('body').should('exist');
  });

  it('should display the navbar', () => {
    cy.get('nav').should('be.visible');
  });

  it('should display product grid', () => {
    cy.get('[class*="grid"]').should('be.visible');
  });

  it('should load and display products', () => {
    // Wait for products to load
    cy.get('img').should('have.length.greaterThan', 0);
  });

  it('should have working product links', () => {
    cy.get('a[href*="/product/"]').first().should('exist');
  });

  it('should display product cards with prices', () => {
    cy.get('span').contains('$').should('be.visible');
  });
});
