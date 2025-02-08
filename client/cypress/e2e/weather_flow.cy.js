describe('Weather Flow Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001');
    // Verify the page has loaded
    cy.contains('h1', 'Makarasham Weather History').should('exist');
  });

  it('should fetch and display weather data based on user input', () => {
    // Fill in the input fields using labels
    cy.contains('label', 'Latitude:')
      .find('input')
      .clear()
      .type('9.7387');

    cy.contains('label', 'Longitude:')
      .find('input')
      .clear()
      .type('100.0603');

    cy.contains('label', 'Start Date')
      .find('input')
      .clear()
      .type('2022-03-10');

    cy.contains('label', 'Days:')
      .find('input')
      .clear()
      .type('5');

    // Click the submit button
    cy.contains('button', 'Fetch Weather Data').click();

    // Verify weather data appears
    cy.get('pre', { timeout: 10000 })
      .should('exist')
      .and('contain', '"days": 5');
  });

  it('should display an error message when invalid coordinates are provided', () => {
    // Enter invalid coordinates
    cy.contains('label', 'Latitude:')
      .find('input')
      .clear()
      .type('200');

    cy.contains('label', 'Longitude:')
      .find('input')
      .clear()
      .type('400');

    cy.contains('label', 'Start Date')
      .find('input')
      .clear()
      .type('2022-03-10');

    cy.contains('label', 'Days:')
      .find('input')
      .clear()
      .type('5');

    // Click the submit button
    cy.contains('button', 'Fetch Weather Data').click();

    // Verify error message appears
    cy.contains('Invalid latitude', { timeout: 5000 })
      .should('be.visible')
      .should('have.css', 'color', 'rgb(255, 0, 0)');  // red color
  });
});
