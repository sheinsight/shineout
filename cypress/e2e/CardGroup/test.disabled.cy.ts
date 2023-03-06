describe('CardGroup disabled', () => {
  it('should disabled', () => {
    cy.visit('/cn/components/CardGroup?example=5-disabled')
    cy.get('.so-checkinput').as('Checkbox')
    cy.get('@Checkbox').click({ multiple: true })
    cy.get('.so-checkinput-disabled').as('CheckboxDisabled')
    cy.get('.so-checkinput-checked').as('CheckboxChecked')
    cy.get('@CheckboxDisabled').should($disabled => {
      expect($disabled).to.have.length(5)
    })
    cy.get('@CheckboxChecked').should($checked => {
      expect($checked).to.have.length(5)
    })
  })
})
