describe('Navbar', () => {
  before(() => {
    Cypress.config('baseUrl', 'http://localhost:4200');
  });

  beforeEach(() => {
    cy.visit('/');
  });

  describe('a user who isn\'t logged in', () => {
    it('should show a link to signup', () => {
      cy
        .get('[data-test=signup]').click().url().should('include', '/signup');
    });

    it('should redirect to the base url when the navbar brand is clicked', () => {
      cy
        .get('.navbar-brand').click().url().should('include', '/');
    });
  });

  describe('a user who is logged in', () => {
    beforeEach(() => {
      cy.request('DELETE', 'http://localhost:8080/api/test');
      cy.signup();
    });

    it('should show a link to logout', function() {
      cy
        .get('[data-test=logout]').should('have.text', 'Logout').click().url().should('include', '/');
    });

    it('should redirect to the dashboard when the navbar brand is clicked', function() {
      cy
        .get('.navbar-brand').click().url().should('include', '/dashboard');
    });
  });
});