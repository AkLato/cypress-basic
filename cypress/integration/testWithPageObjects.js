const { onDatePickerPage } = require("../support/page_objects/datepickerPage")
const { onFormLayoutsPage } = require("../support/page_objects/formLayoutsPage")
const { navigateTo } = require("../support/page_objects/navigation")
const { onSmartTablePage } = require("../support/page_objects/smartTablePage")

describe('Test with Page Objects', () => {

    beforeEach('open application', () => {
        cy.openHomepage()
    })

    it('verify navigations across pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.smartTablePage()
        navigateTo.toasterPage()
        navigateTo.tooltipPage()
    })

    it.only('should submit inline and basic form and select tommorow date in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Tom', 'testmail@mai.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', '12345678')
        navigateTo.datepickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        onDatePickerPage.selectDatepickerWithRangeFromToday(7,14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Tom', 'Raj')
        onSmartTablePage.updateAgeByFirstName('Tom', 29)
        onSmartTablePage.deleteRowByIndex(1)
    })
})