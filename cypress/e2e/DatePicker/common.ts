export function open(selector: string) {
  return cy
    .get(selector)
    .find('.so-datepicker-txt')
    .click({ multiple: true, force: true })
}

export function input(selector: string, value: string) {
    cy.get(selector).trigger('click')
  return cy
    .get(selector)
    .find('.so-datepicker-txt[contenteditable="true"]')
    .click()
    .clear()
    .type(`${value}{enter}`)
}

export function inputRange(selector: string, value: string[]) {
  cy.get(selector).trigger('click')
  cy.get(selector)
    .find('.so-datepicker-txt[contenteditable="true"]')
    .first()
    .click()
    .clear()
    .type(`${value[0]}`)
  return cy
    .get(selector)
    .find('.so-datepicker-txt[contenteditable="true"]')
    .last()
    .click()
    .clear()
    .type(`${value[1]}{enter}`)
}

export function findYm(selector: string) {
  open(selector)
  return cy.get(selector).find('.so-datepicker-ym')
}

export function findActive(selector: string) {
  open(selector)
  return cy.get(selector).find('.so-datepicker-active')
}

export function findInput(selector: string) {
  return cy.get(selector).find('.so-datepicker-txt')
}
