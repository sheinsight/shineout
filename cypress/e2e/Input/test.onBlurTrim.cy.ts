describe('Input[]', () => {
  it('should auto select when focus', () => {
    cy.visit('/cn/components/Input?example=test-001-blurAndTrim')
    const value = '       123456     '
    cy.get('.so-input input').as('Input')
    cy.get('@Input').focus()
    cy.get('@Input').blur()
    cy.get('.so-input-clearable').should('have.length', 0)
    cy.get('@Input').type(value)
    cy.get('#search').click()
    cy.get('.submit-value').should('have.text', '123456')
    cy.get('.so-input-clearable').should('have.length', 1)

  })
})
