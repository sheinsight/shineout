import { open } from './common'

describe('DataTimePicker[absolute]', () => {
  it('should DataTimePicker position absolute', () => {
    cy.visit('/cn/components/DatePicker?example=13-absolute')
    cy.get('.so-datepicker-c-datetime').as('DataTimePicker')
    cy.get('.so-list-root').as('Root')

    open('@DataTimePicker')

    cy.get('@Root')
      .find('.so-datepicker-time-picker')
      .should($datepicker => {
        expect($datepicker).to.have.length(1)
      })
  })
})

describe('DataPickerRange[absolute]', () => {
  it('should DataPickerRange position absolute', () => {
    cy.visit('/cn/components/DatePicker?example=13-absolute')
    cy.get('.so-datepicker-r-date').as('DataPickerRange')
    cy.get('.so-list-root').as('Root')

    open('@DataPickerRange')

    cy.get('@Root')
      .find('.so-datepicker-range-picker')
      .should($datepicker => {
        expect($datepicker).to.have.length(1)
      })
  })
})

describe('TimePicker[absolute]', () => {
  it('should TimePicker position absolute', () => {
    cy.visit('/cn/components/DatePicker?example=13-absolute')
    cy.get('.so-datepicker-c-time').as('TimePicker')
    cy.get('.so-list-root').as('Root')

    open('@TimePicker')

    cy.get('@Root')
      .find('.so-datepicker-time-picker')
      .should($datepicker => {
        expect($datepicker).to.have.length(1)
      })
  })
})
