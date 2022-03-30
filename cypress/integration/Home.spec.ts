/* eslint-disable jest/valid-expect */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" />

describe('Home page', () => {
  before(() => {
    cy.intercept('**/players.json').as('getPlayers');
    cy.visit('http://localhost:3000/');
  });

  it('at least 5 cards are fetched in the page', () => {
      // eslint-disable-next-line testing-library/await-async-utils
      cy.get('*[class^="PlayerCard_card__"]').should('not.exist')
      cy.wait('@getPlayers');
  
      cy.get('*[class^="PlayerCard_card__"]').should('exist');
      cy.get('*[class^="PlayerCard_card__"]').its('length').should('be.gte', 5)
    });

  it('the top 3 players are displayed in order', () => {

    let previousPerc = 0;
    cy.get(`*[class^="PlayerCard_info__"]`)
      .find('p:contains("#")')
      .each((element, index, list) => {
        // Element exists
        expect(Cypress.$(element)).to.exist;

        // compare current element rank with previous one
        const rank = Number(Cypress.$(element).text().replace('#', ''));
        expect(rank).to.be.greaterThan(previousPerc);
        previousPerc = rank;
        if (index === 2){
          return false;
        }
      })
  });

  it('when user click on a card the modal appear with more details', () => {

      cy.get(`*[class^="PlayerCard_card__"]`)
        .first()
        .click()
        .wait(1000);

      // modal displayed and exist with the birthday and age sections
      cy.get('#pr_id_18_content')
        .should('exist')
        .find('h3')
        .invoke('text')
        .then((text:string) => {
          expect(text).to.contain(['BIRTHDAYAGE'])
        })
      
      // birthday section not empty
      cy.get('#pr_id_18_content > *[class^="PlayerDetails_modal__"] > :nth-child(5) > *[class^="PlayerDetails_p__"]')
        .should('exist')
        .should('not.be.empty')
  })
});