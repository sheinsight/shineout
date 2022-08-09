import { open } from './common'

describe('DataPicker[allowSingle]', () => {
  it('should DataTimePicker allow single choose', () => {
    cy.visit('/cn/components/DatePicker?example=11-disabled-type')
    cy.get('.so-datepicker').as('DataPicker')
    open('@DataPicker')

    cy.get('@DataPicker')
      .get('.so-datepicker-time-list')
      .first()
      .as('Hour')

    cy.get('@DataPicker')
      .get('.so-datepicker-time-list')
      .first()
      .next()
      .as('Minute')

    cy.get('@DataPicker')
      .get('.so-datepicker-time-list')
      .last()
      .as('Second')

    cy.get('@Hour')
      .children()
      .filter(':contains("12")')
      .click({ force: true })

    cy.get('@Minute')
      .children()
      .filter(':contains("00")')
      .click({ force: true })

    cy.get('@Second')
      .children()
      .filter(':contains("00")')
      .click({ force: true })

    cy.get('@Second')
      .children()
      .filter(':contains("00")')
      .should('have.html', '<span class="">00</span>')
  })
})
