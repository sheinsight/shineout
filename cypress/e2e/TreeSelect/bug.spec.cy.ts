describe('Table bug spec', () => {
  it('修复 TreeSelect 多选过滤模式下，选择内容后无法继续输入的问题', () => {
    cy.visit('/cn/components/TreeSelect?example=03-filter')
    cy.get('.so-treeSelect').last().as('TreeSelect')
    cy.get('@TreeSelect').click()
    cy.get('@TreeSelect').find('.so-treeSelect-input').type('1-1')
    cy.get('@TreeSelect').find('.so-tree-checkbox').first().click()
    cy.focused().should('have.class', 'so-treeSelect-input')

  })
})
