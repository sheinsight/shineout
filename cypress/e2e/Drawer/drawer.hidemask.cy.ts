describe('Dropdown[open]', () => {
  it('should auto select when focus', () => {
    cy.visit('/cn/components/Drawer?example=9-hide-mask')
    cy.get('.doc-main-body .so-button').click()
    cy.get('html').should('not.have.css', 'overflow', 'hiden')
    cy.get('.so-modal').should('have.class', 'so-modal-hide-mask', 'hiden')
    cy.get('.so-modal .so-modal-mask').should('have.css', 'pointer-events', 'none')
    cy.get('.so-modal').should('have.css', 'pointer-events', 'none')
    cy.get('.so-modal-panel').should('have.css', 'pointer-events', 'all')
    cy.get('.so-modal').should('have.css', 'display', 'block')
    cy.get('.so-modal .so-button-default').click()
    cy.get('.so-modal').should('have.css', 'display', 'none')
  })
})
