import 'cypress-file-upload'

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('copy', (text) => {
//   const area = document.createElement('textarea')
//   area.innerText = text
//   document.body.appendChild(area)
//   area.select()
//   document.execCommand("Copy")
//   document.body.removeChild(area)
// })

Cypress.Commands.add('setAttr', {prevSubject: true}, (selector, setter)=>{
  cy.wrap(selector).then($destination => {
    $destination.attr(setter)
  })
})

Cypress.Commands.add("paste", { prevSubject: true }, (selector, pastePayload) => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
  cy.wrap(selector).then($destination => {
    const pasteEvent = Object.assign(new Event("paste", { bubbles: true, cancelable: true }), {
      clipboardData: {
        getData: () => pastePayload
      }
    });
    $destination[0].dispatchEvent(pasteEvent);
  });
});

Cypress.Commands.add('selectText', {prevSubject: true}, (selector, startIndex=0, length) => {
  cy.document().then((doc: Document) => {
    cy.window().then((win: Window) => {
      cy.get(selector).then((textElement: JQuery<HTMLElement>) => {
        if (win.getSelection) {
          const selection = win.getSelection();
          const range = doc.createRange();
          const el = textElement.get(0)
          const textLength = el.innerText.length
          // range.selectNodeContents();
          range.setStart(el.childNodes[0], startIndex)
          range.setEnd(el.childNodes[0], length ? startIndex+ length : textLength -1)
          selection!.removeAllRanges();
          selection!.addRange(range);
        } else {
          throw new Error("Can't select text.")
        }
      })
    })
  })
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      // copy(text: string): Chainable<void>
      paste(text: string): Chainable<void>
      selectText(startIndex?: number, endIndex?:number): Chainable<void>
      setAttr(attr: {[attr: string]: any}): Chainable<void>
      login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}
