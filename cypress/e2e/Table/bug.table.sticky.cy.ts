describe('Table[sticky]', () => {
  it('修复 Table 在配置 Sticky 具体属性后可能导致表头渲染异常的问题', () => {
    cy.visit('/cn/components/Table?example=test-003-sticky')
    cy.get('.so-table')
      .first()
      .as('Table')
    cy.get('.doc-example-body .so-button')
      .first()
      .as('Button')

    cy.get('@Button').click()

    // 检查表头初始化时，是否存在宽度和偏移量
    cy.get('@Table')
      .children()
      .first()
      .children()
      .should('not.have.css', 'width', '0px')
      .should('not.have.css', 'left', '0px')

    // 滚动窗口，触发表头附着
    cy.scrollTo(0, 500)

    // 检查表头滚动后，是否存在宽度和偏移量
    cy.get('@Table')
      .children()
      .first()
      .children()
      .should('have.css', 'position', 'fixed')
      .should('not.have.css', 'width', '0px')
      .should('not.have.css', 'left', '0px')
  })
})
