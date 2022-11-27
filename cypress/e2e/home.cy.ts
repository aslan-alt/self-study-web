import * as selectors from '../helpers/selectors';

describe('visit home page', () => {
  it('[51236] home', () => {
    cy.visit('http://localhost:3000');

    cy.get(selectors.headerContainer).should('exist');
  });
});
