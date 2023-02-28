import { open } from "./common"


describe('DatePicker[timerange]', () => {
  it('should set time zone', () => {
    cy.visit('/cn/components/DatePicker?example=test-002-time-range-max')
    cy.get('.so-datepicker').as('DataPicker')
    open('@DataPicker')
    cy.get('@DataPicker').find('.so-datepicker-time-picker').setAttr({style: 'visibility: visible; z-index: 100'})
    cy.get('@DataPicker').find('.so-datepicker-datetime').eq(0).as('TimePicker0')
    cy.get('@DataPicker').find('.so-datepicker-datetime').eq(1).as('TimePicker1')
    // pokcer0
    cy.get('@TimePicker0').find('.so-datepicker-time-list').eq(0).find('span').eq(1).click()
    cy.get('@TimePicker0').find('.so-datepicker-time-picker + span').should("have.text", "01:00:00")
    // pokcer0
    cy.get('@TimePicker1').find('.so-datepicker-time-list').eq(0).find('span').eq(2).click()
    cy.get('@TimePicker1').find('.so-datepicker-time-picker + span').should("have.text", "00:00:00")
  })
})
