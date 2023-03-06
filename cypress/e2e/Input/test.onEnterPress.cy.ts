describe('Input[onKeyDown]', () => {
  it('should key down', () => {
    cy.visit('/cn/components/Input?example=13-keypress')
    cy.get('.so-input')
      .first()
      .find('input')
      .as('InputOnKeyUp')

    cy.get('@InputOnKeyUp')
      .focus()
      .trigger('keyup')

    cy.get('b.onKeyUp').should('have.html', 'onKeyUp: 1 times')
  })
})

describe('Input[onKeyDown]', () => {
  it('should key down', () => {
    cy.visit('/cn/components/Input?example=13-keypress')
    cy.get('.so-input')
      .first()
      .next()
      .find('input')
      .as('InputOnKeyDown')

    cy.get('@InputOnKeyDown')
      .focus()
      .trigger('keydown')

    cy.get('b.onKeyDown').should('have.html', 'onKeyDown: 1 times')
  })
})

describe('Input[onEnterPress]', () => {
  it('should key enter', () => {
    cy.visit('/cn/components/Input?example=13-keypress')
    cy.get('.so-input')
      .last()
      .find('input')
      .as('InputOnEnterPress')

    cy.get('@InputOnEnterPress')
      .focus()
      .type('{enter}')

    cy.get('b.onEnterPress').should('have.html', 'onEnterPress: 1 times')
  })
})
