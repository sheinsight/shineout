describe('InputNumber[min]', () => {
  it('should auto select when focus', () => {
    cy.visit('/cn/components/Input?example=14-limit')
    const value = '123456'
    const maxLength = 5
    cy.get('input[placeholder="5"]').as('Input')
    cy.get('@Input').type(value)
    cy.get('@Input').should('have.value', value.substring(0, maxLength))
  })
})
