import dayjs from 'dayjs'
import utils  from '../../../src/DatePicker/utils'

const format = 'YYYY-MM-DD HH:mm:ss'
describe('DatePicker[timeZone]', () => {
  it('should set time zone', () => {
    cy.visit('/cn/components/DatePicker?example=16-timezone')
    cy.get('.so-select').as('Select')
    cy.get('@Select').click()
    cy.get('.so-datepicker-txt').then( $datePicker => {
      const datestr = $datePicker.html()
      function test (date: Date){
        cy.get('@Select')
          .find('.so-select-option')
          .then($options => {
            const optionsText = $options.map((_i, el) => Cypress.$(el).text()).get()
            optionsText.forEach((option) => {
              console.log(option)
              cy.get('@Select')
                .find('.so-select-option')
                .contains(option)
                .click({ force: true })
                .then(() => {
                  cy.get('.so-datepicker-txt').then($newValue => {
                    const newValue = $newValue.html()
                    const transformValue = dayjs(utils.transDateWithZone(date, { timeZone: option })).format(
                      'YYYY-MM-DD HH:mm:ss'
                    )
                    expect(transformValue).eq(newValue)
                  })
                })
            })
          })
      }
      cy.get('@Select').find('.so-select-result > span').eq(0).text().then( (zone)=> {
          const date = utils.parse(datestr, format, {timeZone: zone, })
          test(date)
      })

    })
  })
})

