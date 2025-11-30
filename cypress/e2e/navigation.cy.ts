describe('Navigation & Routing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to cart page', () => {
    cy.get('a[href="/cart"]').click();
    cy.url().should('include', '/cart');
  });

  it('should navigate to product details from home', () => {
    cy.get('a[href*="/product/"]').first().click();
    cy.url().should('match', /\/product\/\d+/);
  });

  it('should display navbar on all pages', () => {
    cy.get('nav').should('be.visible');
    cy.get('a[href="/cart"]').click();
    cy.get('nav').should('be.visible');
  });
});
