describe('Dropdown[disabled]', () => {
  it('开启 disabled 后禁止展开菜单', () => {
    cy.visit('/cn/components/Dropdown?example=test-001-disabled')
    cy.get('.click').as('Click')
    cy.get('.click>.so-list').as('ClickList')
    cy.get('.hover').as('Hover')
    cy.get('.hover>.so-list').as('HoverList')

    cy.get('@Click').click()
    cy.get('@ClickList').should('have.css', 'display', 'none')

    cy.get('@Hover').trigger('mouseover')
    cy.get('@HoverList').should('have.css', 'display', 'none')
  })
})
