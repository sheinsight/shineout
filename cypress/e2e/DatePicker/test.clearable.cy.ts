describe('DatePicker[clearable]', () => {
  it('should DatePicker clearable', () => {
    cy.visit('/cn/components/DatePicker?example=17-clearable')
    cy.get('.so-datepicker').as('DataPicker')
    cy.get('.so-datepicker-close').click({ force: true })

    cy.get('.so-datepicker-txt').should('have.html', 'Select date')
  })
})

describe('DatePicker[clearWithUndefined]', () => {
  it('should DatePicker clear with undefined', () => {
    cy.visit('/cn/components/DatePicker?example=18-clearable')
    cy.get('.so-datepicker').as('DataPicker')
    cy.get('.so-datepicker-close').click({ force: true })

    cy.get('.so-datepicker-txt').should('have.html', 'Select date')

    cy.get('.so-input.so-input-disabled input')
      .should('have.value', 'undefined')
  })
})
