describe('getPopupContainer', () => {
  it('触发校验后滚动到错误位置', () => {
    cy.visit('/cn/components/EditableArea?example=03-container')
    cy.get('#popup-target').as('container')
    cy.get('.so-editableArea').click()
    cy.get('@container')
      .find('.so-popover')
      .should('have.length', 1)
  })
})
