import { open } from './common'

describe('DataPicker[allowSingle]', () => {
  it('should DataTimePicker allow single choose', () => {
    cy.visit('/cn/components/DatePicker?example=09-single')
    cy.get('.so-datepicker').as('DataPicker')

    open('@DataPicker')

    cy.get('.so-datepicker-range-picker')
      .children()
      .first()
      .as('StartDataPicker')

    cy.get('.so-datepicker-range-picker')
      .children()
      .last()
      .as('EndDataPicker')

    cy.get('@StartDataPicker')
      .find('.so-datepicker-list')
      .children()
      .first()
      .click()

    cy.get('@DataPicker').type(`{enter}`)

    cy.get('.so-datepicker-txt')
      .first()
      .should('have.not.html', 'Start datetime')

    cy.get('.so-datepicker-txt')
      .last()
      .should('have.html', 'End datetime')
  })
})
