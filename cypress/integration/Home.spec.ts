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
        cy.get('.PlayerCard_card__4T0Sy').should('not.exist')
        cy.wait('@getPlayers');
    
        cy.get('.PlayerCard_card__4T0Sy').should('exist');
        cy.get('.PlayerCard_card__4T0Sy').its('length').should('be.gte', 5)
      });
  
    it('the top 3 players are displayed in order', () => {
  
      let previousPerc = 0;
      cy.get(`.PlayerCard_info__FUolT`)
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

        cy.get(`.PlayerCard_card__4T0Sy`)
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
        cy.get('#pr_id_18_content > .PlayerDetails_modal__dKaMz > :nth-child(5) > .PlayerDetails_p__gV8Ze')
          .should('exist')
          .should('not.be.empty')
    })
  });