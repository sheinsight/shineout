describe('Popover[hover]', () => {
  it('should set hover', () => {
    cy.visit('/cn/components/Table?example=test-001-hover')
    cy.get('.so-table').as('Table')
    cy.get('.so-table-normal:first').trigger('mousemove')
  })
})
