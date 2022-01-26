/// <reference types="cypress" />

describe('prvniSuita', () => {
    beforeEach( () => {
        //cy.loginToTm()
    })
    it('prvni test', () => {
        cy.visit('https://example.cypress.io/todo')
        // najit input pro zadani ukolu
        const ukol = 'druhy ukol'
        cy.get('.todo-count').children('strong').then(($todosCount) => {
            const todosCount = $todosCount.text()
            cy.get('[data-test="new-todo"]')

            // zapsat do nej ukol
            .type(ukol)
            .type('{enter}')
            
            // overit ze se pridal
            cy.contains(ukol).should('be.visible')
            cy.get('.todo-count').children('strong').should('have.text', parseInt(todosCount) + 1)
        })
    })
    it('test2', () => {
        cy.contains('Projekt/Subprojekt').should('be.visible')
    })
    // get - 
    // find - dalsi soucast retezce
    it('edit work record', () => {
        cy.contains('tr', 'Zaznam z Brna')
            .then( tableRow => {
                cy.wrap(tableRow)
                    .find('.fa-close')
                    .last()
                    .click()
        })
    })
    it('click on second task', () => {
        cy.visit('https://example.cypress.io/todo')
        cy.get('.todo-list').then( todo => {
            cy.wrap(todo)
                .contains('Walk the dog')
                .siblings('input')
                .click()
        })
    })
    it('delete all records and check them', () => {
        const todos = ['ukol 1', 'ukol 2', 'ukol 3', 'ukol 4']
        cy.visit('https://example.cypress.io/todo')

        todos.forEach((todo) => {
            cy.get('[data-test="new-todo"]')
                    .type(todo)
                    .type('{enter}')
                })            
                    
        cy.get('.toggle')
            .each((input) => {
                cy.wrap(input)
                    .click()
                    .should('be.checked')
        })
    })

    it('delete all records and check them', () => {
        cy.visit('https://example.cypress.io/todo')
        cy.get('.todo-count > strong')
          .invoke('text')
          .then((celkemTodos) => {
              cy.log(celkemTodos)
          })
          .should('eq','2')
    })

    it('invoke attribute', () => {
        cy.visit('https://example.cypress.io/todo')
        cy.get('[data-test="new-todo"]')
          .invoke('attr', 'placeholder')
          .then((placeholder) => {
              cy.log(placeholder)
          })

        cy.get('[data-test="new-todo"]')
          .invoke('prop', 'parentElement')
          .then((parentElement) => {
              cy.log(parentElement)
          })
    })

    it.only('bank app task', () => {
        cy.loginToBank()
            })

})
    




    //     cy.contains('zaznam z Brna')
    //         .parent('td')
    //         .parent('tr')
    //         .contains('.fa.fa-close')
    //         .click()
        
    //     })
    //     //siblings('td').contains('.fa.fa-close').click()
    //     // cy.get('#workrecords-table').then( () => {
    //     //     cy.get('tr')
    //     //     .contains('zaznam z Brna')
    //     //     .contains('."fa fa-close"')
    //     //     .click()
    //     // })
    //     //cy.get('.fa.fa-close').click()
    // })
