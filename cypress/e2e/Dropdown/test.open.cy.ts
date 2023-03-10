describe('Dropdown[open]', () => {
  it('should auto select when focus', () => {
    cy.visit('/cn/components/Dropdown?test=01-open')
    cy.get('#control').as('Button')
    cy.get('.so-dropdown > div').as('DropdownMenu')
    cy.get('@DropdownMenu').should('have.class', 'so-hidable-show')
    cy.get('@Button').click()
    cy.get('@DropdownMenu').should('have.not.class', 'so-hidable-show')
  })
})
