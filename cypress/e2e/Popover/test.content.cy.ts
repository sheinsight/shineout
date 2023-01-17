describe('Popover[content]', () => {
  it('should custom container', () => {
    cy.visit('/cn/components/Popover?example=8-old')
    cy.get('.doc-example-body .so-button')
      .first()
      .trigger('mouseover')
    cy.get('.so-popover-content').should('have.text', 'Some text')
  })
})
