describe('Message[container]', () => {
  it('should custom container', () => {
    cy.visit('/cn/components/Message?example=6-container')
    cy.get('#button').as('Button')
    cy.get('#container').as('Container')
    cy.get('@Button').click()
    cy.get('@Container')
      .find('.so-message-msg')
      .should('have.length', 1)
  })
})
