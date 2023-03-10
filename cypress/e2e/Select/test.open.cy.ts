describe('Select[open]', () => {
  it('should open', () => {
    cy.visit('/cn/components/Select?test=006-open')
    cy.get('#control').as('Button')
    cy.get('@Button').click()
    cy.get('.so-select .so-list').as('SelectList')
    cy.get('@SelectList').should('have.css', 'display', 'none')
    cy.get('@Button').click()
    cy.get('@SelectList').should('have.css', 'display', 'block')
  })
})
