describe('Input[autoSelect]', () => {
  it('should auto select when focus', () => {
    cy.visit('/cn/components/Input?example=11-autoSelect')
    cy.get('.so-input input').as('Input')
    cy.get('@Input')
      .click()
      .type(`{backspace}`)
    cy.get('@Input').should('have.value', '')
  })
})
