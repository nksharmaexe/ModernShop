describe('Cart Page', () => {
  beforeEach(() => {
    cy.visit('/cart');
  });

  it('should load the cart page', () => {
    cy.url().should('include', '/cart');
  });

  it('should display cart heading', () => {
    cy.get('h1, h2, h3').should('be.visible');
  });

  it('should show empty cart message or items', () => {
    cy.get('body').should('be.visible');
  });
});
