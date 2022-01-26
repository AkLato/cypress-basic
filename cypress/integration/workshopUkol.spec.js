/// <reference types="cypress" />
describe('bankSuite', () => {
    it.only('zero bank', () => {
        cy.loginToBank()

        cy.get('#account_activity_tab')
          .click()
          .get('#tabs')
          .should('contain', 'Show Transactions')
          .get('#transfer_funds_tab')
          .click()
          .get('#transfer_funds_content')
          .should('contain', 'Transfer Money & Make Payments')
          .get('#pay_bills_tab')
          .click()
          .get('#tabs')
          .should('contain', 'Make payments to your saved payees')
          .get('#money_map_tab')
          .click()
          .get('#report')
          .should('contain', 'Total')
          .get('#online_statements_tab')
          .click()
          .get('#online_statements_for_account')
          .should('contain', 'Recent Statements')

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