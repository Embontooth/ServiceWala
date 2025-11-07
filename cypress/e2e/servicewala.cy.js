describe('Service Wala Comprehensive Tests', () => {
  const baseUrl = 'http://localhost:3000/';

  beforeEach(() => {
    cy.visit(baseUrl); // Visit the base URL before each test
  });

  it('should load the homepage', () => {
    cy.contains('Trusted'); // Check if "Welcome" text exists
    cy.get('nav').should('exist'); // Verify the navigation bar exists
  });

  it('should navigate to the services page', () => {
    cy.get('a[href="/services"]').click(); // Click on the services link
    cy.url().should('include', '/services'); // Verify URL
    cy.contains('Our Services'); // Check if "Our Services" text exists
  });

  it('should display a booking modal', () => {
    cy.get('.service-card').first().click(); // Click on the first service card
    cy.get('.booking-modal').should('be.visible'); // Verify the booking modal is visible
    cy.get('.booking-modal').contains('Book Now'); // Check if "Book Now" button exists
  });

  it('should submit a booking form', () => {
    cy.get('.service-card').first().click(); // Click on the first service card
    cy.get('.booking-modal input[name="name"]').type('John Doe'); // Fill in the name
    cy.get('.booking-modal input[name="email"]').type('john.doe@example.com'); // Fill in the email
    cy.get('.booking-modal button[type="submit"]').click(); // Submit the form
    cy.contains('Booking Confirmed'); // Verify confirmation message
  });

  it('should handle 404 for invalid routes', () => {
    cy.visit(`${baseUrl}/invalid-route`); // Visit an invalid route
    cy.contains('404'); // Check if "404" error message is displayed
  });

  it('should load the contact page', () => {
    cy.get('a[href="/contact"]').click(); // Click on the contact link
    cy.url().should('include', '/contact'); // Verify URL
    cy.contains('Contact Us'); // Check if "Contact Us" text exists
  });
});