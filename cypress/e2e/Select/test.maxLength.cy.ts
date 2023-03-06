describe('Select[maxLength]', () => {
  it('should auto select when focus', () => {
    cy.visit('/cn/components/Select?example=test-001-maxlength')
    cy.get('.so-select').as('Select')
    cy.get('@Select').find('.so-select-inner').click()
    cy.get('@Select').find('.so-select-input').type('123456789012345')
    cy.get('@Select').find('.so-select-input').should("have.text", '1234567890')
    cy.get('@Select').find('.so-select-input').clear()
    cy.get('@Select').find('.so-select-input').paste('hello123456789012345')
    cy.get('@Select').find('.so-select-input').should("have.text", 'hello12345')
    cy.get('@Select').find('.so-select-input').selectText(1, 2).paste('aaaaa').should("have.text", 'haalo12345')
  })
})
