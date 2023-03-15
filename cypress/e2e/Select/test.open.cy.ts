describe('Select[open]', () => {
  it('should open', () => {
    cy.visit('/cn/components/Select?example=006-open')
    cy.get('#control').as('Button')
    cy.get('.so-select .so-list').as('SelectList')
    cy.get('@SelectList').should('have.css', 'display', 'block')
    cy.wait(10)
    cy.get('body').trigger('click', { force: true })
    cy.get('@SelectList').should('have.css', 'display', 'none')
  })
})
