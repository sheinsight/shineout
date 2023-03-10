describe('Select[clickAway]', () => {
  it('点击 body 关闭列表', () => {
    cy.visit('/cn/components/Select?example=test-005-unmount')
    cy.get('.so-list-root').should('have.length', 0)
    cy.get('#mount').as('Button')
    cy.get('@Button').click()
    cy.get('.so-list-root').should('have.length', 0)
    cy.get('@Button').click()
    cy.get('.so-list-root').should('have.length', 1)
    cy.get('.so-select').as('Select')
    cy.get('@Select')
      .find('.so-select-inner')
      .click()
      .should('have.class', 'so-select-focus')
  })
})