/// <reference types="cypress" />

const { INJECTOR } = require("@angular/core")
const exp = require("constants")
const { color } = require("d3-color")

describe('First test suite', () => {
    it('test1', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')

        cy.contains('[status="warning"]','Sign in')

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
    })

    it('saving locators to variables', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // then switches to jquery locator
        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
                const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
                const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
                expect(emailLabelFirst).to.equal('Email')
                expect(passwordLabelFirst).to.equal('Password')

                cy.contains('nb-card', 'Basic form').then( secondForm => {
                    const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
                    expect(passwordLabelFirst).to.equal(passwordSecondText)

                    // switch from jquery back to cypress
                    cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')


                })
        })
    })
    it('invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            .then(classValue => {
                expect(classValue).to.contain('checked')
            })
    })

    it('assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('18').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Nov 18, 2021')
        })
    })

    it('radio buttons', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
            cy.wrap(radioButtons)
                .first()
                .check({force: true})
                .should('be.checked')

            cy.wrap(radioButtons)
                .eq(1)
                .should('not.be.checked')

            cy.wrap(radioButtons)
                .eq(2)
                .should('not.be.checked')
        })
    }) 

    it('check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // cy.get('[type="checkbox"]').check({force:true}) // will check all checkoxes
        cy.get('[type="checkbox"]').eq(0).click({force:true})
        cy.get('[type="checkbox"]').eq(1).check({force:true})
    })

    it('lists and dropdowns', () => {
        cy.visit('/')

        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        cy.get('nav nb-select').then( dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each( (listItem, index) =>{
                const itemText = listItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if(index < 3){
                    cy.wrap(dropdown).click()
                }
            })
        })
    })

    it('web tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        
        // edit table row
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })

        // add table row
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Tom')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Raj')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Tom')
            cy.wrap(tableColumns).eq(3).should('contain', 'Raj')
        })

        // table search
        const age = [20, 30, 40, 200]

        cy.wrap(age).each( age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each( tableRow => {
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        })
    })

    it('datepicker', () => {

        function selectDayFromCurrent(day){
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('default', {month: 'short'})
            let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()
    
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                if(!dateAttribute.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                } else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        }

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()


        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(44)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
        })
    })

    it('tooltip', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it('popup', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // option 1
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?')
        })

        // option 2
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

        // cancel
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false)
    })

    it.only('popup', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

    })

})