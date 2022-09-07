export function open(selector: string) {
  return cy
    .get(selector)
    .find('.so-datepicker-txt')
    .click({ multiple: true, force: true })
}

export function input(selector: string, value: string) {
  return cy
    .get(selector)
    .find('.so-datepicker-txt')
    .click()
    .clear()
    .type(`${value}{enter}`)
}

export function inputRange(selector: string, value: string[]) {
  cy.get(selector)
    .find('.so-datepicker-txt')
    .first()
    .click()
    .clear()
    .type(`${value[0]}`)
  return cy
    .get(selector)
    .find('.so-datepicker-txt')
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
