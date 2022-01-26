Cypress.Commands.add('loginToBank', () => {
    cy.visit('http://zero.webappsecurity.com/login.html')
    cy.get('#user_login').type('username')
      .get('#user_password').type('password')
      .get('[name="submit"]').click()
      .get('.board-header').contains('Cash Accounts')
})