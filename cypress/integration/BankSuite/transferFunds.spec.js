/// <reference types="cypress" />
describe('bankSuite', () => {
    beforeEach(() => {
        cy.loginToBank()
    })
    it('Zaslani prostredku', () => {
        cy.get('#transfer_funds_tab')
          .click()
          .get('#tf_fromAccountId')
          .select(3)
          .should('have.value', '4')
          .get('#tf_toAccountId')
          .select(2)
          .should('have.value', '3')
          .get('#tf_amount')
          .type('111')
          .get('#tf_description')
          .type('For stuff')
          .get('#btn_submit')
          .click()

        cy.contains('Transfer Money & Make Payments - Verify')
          .should('be.visible')
          .get('#btn_submit')
          .click()

        cy.contains('You successfully submitted your transaction.')
          .should('be.visible')
    })

    it('plugin test', () =>{
        //cy.xpath('//body')
        cy.task('log', 'Yo')

        cy.fixture('example.json')
          .then((json) => {
              cy.log(json)
          })
    })

    it.only('plugin test', () =>{
        cy.fixture("bank")
          .then((json) => {
            cy.get('#pay_bills_tab')
            .click()
            .get('#sp_payee')
            .select(json.payee)
            .get('#sp_account')
            .select(json.account)
            .get('#sp_amount')
            .type(json.amount)
            .get('#sp_date')
            .click()
            .get('#ui-datepicker-div')
            .contains(json.day)
            .click()
            .get('#sp_date')
            .clear()
            .type(json.date)
            .type('{enter}')
            .get('#sp_description')
            .type(json.desc)
            .get('#pay_saved_payees')
            .click()
          })
        cy.contains('The payment was successfully submitted.')
          .should('be.visible')

        
    })

  })