import { input, inputRange, findYm, findInput, findActive } from './common'

describe('DatePicker[inputable]', () => {
  const year = '2022'
  const month = '01'
  const day = '01'

  it('should DataPicker input', () => {
    cy.visit('/cn/components/DatePicker?example=12-inputable')
    cy.get('.so-datepicker-c-date').as('DataPicker')

    input('@DataPicker', `${year}-${month}-${day}`)

    findInput('@DataPicker').should('have.html', `${year}-${month}-${day}`)

    findYm('@DataPicker').should('have.html', `<span>${year}</span><span>${Number(month)}月</span>`)

    findActive('@DataPicker').should('have.html', `${Number(day)}`)
  })
})

describe('DateTimePicker[inputable]', () => {
  const year = '2022'
  const month = '01'
  const day = '01'

  const hour = '12'
  const minute = '11'
  const second = '10'

  it('should DateTimePicker input', () => {
    cy.visit('/cn/components/DatePicker?example=12-inputable')
    cy.get('.so-datepicker-c-datetime').as('DataTimePicker')

    input('@DataTimePicker', `${year}-${month}-${day} ${hour}:${minute}:${second}`)

    findInput('@DataTimePicker').should('have.html', `${year}-${month}-${day} ${hour}:${minute}:${second}`)

    findYm('@DataTimePicker').should('have.html', `<span>${year}</span><span>${Number(month)}月</span>`)

    findActive('@DataTimePicker').should('have.html', `${Number(day)}`)

    cy.get('@DataTimePicker')
      .find('.so-datepicker-datetime')
      .children()
      .last()
      .should('have.html', `${hour}:${minute}:${second}`)
  })
})

describe('DatePickerRange[inputable]', () => {
  const year_from = '2022'
  const month_from = '01'
  const day_from = '01'

  const year_to = '2022'
  const month_to = '01'
  const day_to = '11'

  it('should DatePickerRange input', () => {
    cy.visit('/cn/components/DatePicker?example=12-inputable')
    cy.get('.so-datepicker-r-date').as('DataPickerRange')

    inputRange('@DataPickerRange', [`${year_from}-${month_from}-${day_from}`, `${year_to}-${month_to}-${day_to}`])

    // input('@DataTimePicker', `${year}-${month}-${day} ${hour}:${minute}:${second}`)

    // findInput('@DataTimePicker').should('have.html', `${year}-${month}-${day} ${hour}:${minute}:${second}`)

    // findYm('@DataTimePicker').should('have.html', `<span>${year}</span><span>${Number(month)}月</span>`)

    // findActive('@DataTimePicker').should('have.html', `${Number(day)}`)

    // cy.get('@DataTimePicker')
    //   .find('.so-datepicker-datetime')
    //   .children()
    //   .last()
    //   .should('have.html', `${hour}:${minute}:${second}`)
  })
})
