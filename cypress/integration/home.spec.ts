import {dataTn} from '../helpers/selectorHelper';

export const home = dataTn('home');
describe('Claim a deal', () => {
  it('[51236] home', () => {
    cy.visit('http://localhost:3000').get(home).contains('首页 xiong12');
  });
});
