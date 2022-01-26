/// <reference types="cypress" />
describe('bankSuite', () => {
    it('zero bank', () => {
        cy.loginToBank()

        cy.get('.nav')
          .children()
          .should('contain', 'Account Summary')
          .and('contain', 'Account Activity')
          .and('contain', 'Transfer Funds')
          .and('contain', 'Pay Bills')
          .and('contain', 'My Money Map')
          .and('contain', 'Online Statements')

        cy.get('.brand')
          .click()
          .get('#feedback')
          .click()
          .get('#name')
          .type('moss')
          .get('#email')
          .type('moss@corp.com')
          .get('#subject')
          .type('fire fire')
          .get('#comment')
          .type('the office is on fire')
          .get('[type=submit]')
          .click()
          .get('body')
          .should('contain', 'Thank you for your comments, moss')
    })

    it('todo', () => {
        cy.visit('https://example.cypress.io/todo#')

        const tasksToCreate = 25

        for(let n = 0; n < tasksToCreate; n ++) {
            cy.get('[data-test="new-todo"]')
              .type(`${(Math.random() + 1).toString(36).substring(7)}`)
              .type('{enter}')
        }
        
        for(let n = 0; n < tasksToCreate; n ++) {
            cy.get('.todo-list li')
              .last()
              .get('.destroy')
              .last()
              .click({force:true})
        }
        cy.get('.todo-count > strong')
          .should('have.text', '2')
    })

    it("timemission", () => {
      cy.loginToTm()
      
      cy.get('.edit-record')
        .first()
        .click()
        .get('#workrecord-edit-form-hour-to')
        .type('10:00')
        .get('[name="workRecordDescription"]')
        .clear()
        .type('test edit')
        .get('#workrecord-edit-form-actions-submit')
        .click()
        .get('#workrecords-table')
        .should('contain.text', 'test edit')
    })
})