describe('DatePicker[open]', () => {
  it('should DatePicker clearable', () => {
    cy.visit('/cn/components/DatePicker?example=test-003-open')
    cy.get('#control').as('Button')
    cy.get('.so-datepicker .so-list').as('DataPickerList')
    cy.get('@DataPickerList').should('have.css', 'display', 'block')
    cy.wait(10)
    cy.get('body').click({ force: true })
    cy.get('@DataPickerList').should('have.css', 'display', 'none')
    cy.get('@Button').click()
    cy.get('@DataPickerList').should('have.css', 'display', 'block')
  })
})
