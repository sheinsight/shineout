import dayjs from 'dayjs'
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc'
import utcToZonedTime from 'date-fns-tz/utcToZonedTime'

function transDateWithZone(dd: string | number | Date, options = { timeZone: '8' }, back = false) {
  if (options.timeZone) {
    const timezoneHH = /^([+-]\d{2})$/
    if (timezoneHH.test(options.timeZone)) {
      const num = +options.timeZone
      if (num <= 13 && num >= -12) {
        return back ? zonedTimeToUtc(dd, options.timeZone) : utcToZonedTime(dd, options.timeZone)
      }
    }
    console.error(`不支持传入的时区格式：${options.timeZone}`)
  }
  return dd
}

describe('DatePicker[timeZone]', () => {
  it('should set time zone', () => {
    cy.visit('/cn/components/DatePicker?example=16-timezone')
    cy.get('.so-select').as('Select')
    cy.get('@Select').click()

    cy.get('.so-datepicker-txt').then($datePicker => {
      const chineseNowTime = $datePicker.html()

      cy.get('@Select')
        .find('.so-select-option')
        .should(() => {})
        .then($options => {
          const optionsHtml = $options.map((_i, el) => Cypress.$(el).html()).get()
          optionsHtml.forEach((option, index) => {
            cy.get('@Select')
              .find('.so-select-option')
              .contains(option)
              .click({ force: true })
              .then(() => {
                cy.get('.so-datepicker-txt').then($newValue => {
                  const newValue = $newValue.html()
                  const transformValue = dayjs(transDateWithZone(chineseNowTime, { timeZone: option })).format(
                    'YYYY-MM-DD HH:mm:ss'
                  )
                  expect(transformValue).eq(newValue)
                })
              })
          })
        })
    })
  })
})
