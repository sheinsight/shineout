describe('Popover[content]', () => {
  it('should custom container', () => {
    cy.visit('/cn/components/Popover?example=test-002-destroy')
    cy.get('.so-popover-content').should('have.length', 0)
    cy.get('.doc-example-body .so-button')
      .first()
      .trigger('mouseenter')
    cy.get('.so-popover-content').should('have.length', 1)
    cy.get('.doc-example-body .so-button')
      .first()
      .trigger('mouseleave')
    cy.get('.so-popover-content').should('have.length', 0)
  })
})
