describe('Popover[expandKeys]', () => {
  it('should set expandKeys', () => {
    cy.visit('/cn/components/Table?example=22-expand-control')
    cy.get('.so-checkinput:not(.so-checkinput-checked)').click({ multiple: true })
    cy.get('.so-table-icon-expand-sub').should('have.length', 5)
    cy.get('.so-table-icon-expand-sub').click({ multiple: true })
    cy.get('.so-table-icon-expand-plus').should('have.length', 5)
  })
})
