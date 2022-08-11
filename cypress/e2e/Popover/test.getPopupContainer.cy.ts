describe('Popover[getPopupContainer]', () => {
  it('should custom container', () => {
    cy.visit('/cn/components/Popover?example=10-container')
    cy.get('#popup-target .so-button').click()
    cy.get('#popup-target')
      .find('.so-popover')
      .should('have.length', 1)
  })
})
