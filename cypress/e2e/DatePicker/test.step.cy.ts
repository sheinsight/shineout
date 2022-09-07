import { open } from './common'

describe('DatePicker[step]', () => {
  const step = 2
  it('should set hour step', () => {
    cy.visit('/cn/components/DatePicker?example=07-b-time-step')
    cy.get('.so-datepicker')
      .first()
      .as('HourStep')

    open('@HourStep')

    cy.get('@HourStep')
      .find('.so-datepicker-time-list')
      .first()
      .children()
      .filter('span')
      .should($options => {
        const htmlText = $options.map((_i, el) => {
          return Cypress.$(el).html()
        })
        expect(htmlText.get().every(i => Number(i) % step === 0)).eq(true)
      })
  })

  it('should set minute step', () => {
    cy.visit('/cn/components/DatePicker?example=07-b-time-step')
    cy.get('.so-datepicker')
      .first()
      .next()
      .as('MinuteStep')

    open('@MinuteStep')

    cy.get('@MinuteStep')
      .find('.so-datepicker-time-list')
      .first()
      .next()
      .children()
      .filter('span')
      .should($options => {
        const htmlText = $options.map((_i, el) => {
          return Cypress.$(el).html()
        })
        expect(htmlText.get().every(i => Number(i) % step === 0)).eq(true)
      })
  })

  it('should set second step', () => {
    cy.visit('/cn/components/DatePicker?example=07-b-time-step')
    cy.get('.so-datepicker')
      .last()
      .as('SecondStep')

    open('@SecondStep')

    cy.get('@SecondStep')
      .find('.so-datepicker-time-list')
      .last()
      .children()
      .filter('span')
      .should($options => {
        const htmlText = $options.map((_i, el) => {
          return Cypress.$(el).html()
        })
        expect(htmlText.get().every(i => Number(i) % step === 0)).eq(true)
      })
  })
})
