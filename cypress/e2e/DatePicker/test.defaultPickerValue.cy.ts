import { open, findYm } from './common'

describe('DatePickerRange[inputable]', () => {
  it('should DatePickerRange input', () => {
    cy.visit('/cn/components/DatePicker?example=19-default-picker-value')
    cy.get('.so-datepicker')
      .first()
      .as('DataPicker')

    cy.get('.so-datepicker')
      .last()
      .as('DataPickerRange')

    findYm('@DataPicker').should('have.html', `<span>2022</span><span>9月</span>`)

    open('@DataPickerRange')

    cy.get('@DataPickerRange')
      .find('.so-datepicker-ym')
      .first()
      .should('have.html', `<span>2022</span><span>11月</span>`)

    cy.get('@DataPickerRange')
      .find('.so-datepicker-ym')
      .last()
      .should('have.html', `<span>2022</span><span>12月</span>`)
  })
})
