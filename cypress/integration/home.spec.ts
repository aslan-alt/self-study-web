import * as selectors from '../helpers/selectors';

describe('visit home page', () => {
  it('[51236] home', () => {
    cy.visit('http://localhost:3000');
    ['广告位', '登录'].map((text) => {
      cy.get(selectors.homeContainer).contains(text);
    });
    cy.get(selectors.navBarContainer).within(() => {
      cy.get('input:first').should('have.attr', 'placeholder', '输入课程名称');
    });
  });
});
