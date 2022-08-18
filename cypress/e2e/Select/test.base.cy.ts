describe('Select[clickAway]', () => {
  it('点击 body 关闭列表', () => {
    cy.visit('/cn/components/Select?example=01-base')
    cy.get('.so-select').as('Select')
    cy.get('@Select').find('.so-select-inner').click().should('have.class', 'so-select-focus')
    cy.get('body').trigger('click', {force: true})
    cy.get('@Select').find('.so-select-inner').should('not.have.class', 'so-select-focus')
  })
})
