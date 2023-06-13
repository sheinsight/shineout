describe('Select[clickAway]', () => {
  it('点击 body 关闭列表', () => {
    cy.viewport(1280, 800)

    cy.visit('/cn/components/Select?example=test-007-droplist')
    cy.get('.doc-api-table').invoke('css', 'display', 'none')
    cy.get('.doc-main-menu').invoke('remove')
    cy.get('#api-Select').invoke('remove')
    cy.get('#apis').invoke('css', 'display', 'none')
    // cy.get('#scrollContainer').scrollTo(0, 89)
    cy.get('.so-select').as('Select')
    cy.get('@Select').invoke('css', 'marginTop', '264px')
    cy.get('@Select')
      .find('.so-select-inner')
      .click()
      .should('have.class', 'so-select-focus')
    cy.get('.so-select-drop-down').should('length', 2)
    cy.get('@Select').then($element => {
      const rect = $element[0].getBoundingClientRect()
      const listHeight = 350
      const margin = 4
      const bottom = listHeight + rect.bottom + margin
      expect(bottom > 800 && rect.top + rect.height + listHeight + margin > 800).to.equal(false)
    })
    cy.get('body').trigger('click', { force: true })

    cy.get('@Select').invoke('css', 'marginTop', '265px')

    cy.get('@Select')
      .find('.so-select-inner')
      .click()

    cy.get('.so-select-drop-down').should('length', 0)
    cy.get('.so-select-drop-up').should('length', 2)

    cy.get('@Select').then($element => {
      const rect = $element[0].getBoundingClientRect()
      const listHeight = 350
      const margin = 4
      const bottom = listHeight + rect.bottom + margin
      expect(bottom > 800 && rect.top + rect.height + listHeight + margin > 800).to.equal(true)
    })
  })
})
