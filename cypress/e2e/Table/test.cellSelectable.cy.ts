describe('Popover[cellSelectable]', () => {
  it('should set cellSelectable', () => {
    cy.visit('/cn/components/Table?example=32-selection')
    cy.get('.so-table-simple-body td')
      .first()
      .as('Target')

    // choose
    cy.get('body')
      .type('{meta}', { release: false })
      .get('@Target')
      .click()

    cy.get('@Target').then($els => {
      const before = window.getComputedStyle($els[0], 'before')
      expect(before.border).to.eq('1px solid rgb(25, 122, 250)')
    })
    cy.get('@Target').should('have.class', 'so-table-select')

    // cancel
    cy.get('body')
      .type('{meta}', { release: false })
      .get('@Target')
      .click()

    cy.get('@Target').should('not.have.class', 'so-table-select')
  })
})
