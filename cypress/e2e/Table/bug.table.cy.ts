describe('Table bug spec', () => {
  it('Table treeData 折叠的时候会滚动到顶部的问题(1.8.2 - 1.10.12)', () => {
    cy.visit('/cn/components/Table?example=26-tree')
    cy.get('.so-table')
      .first()
      .as('Table')
    cy.get('@Table')
      .find('.so-table-icon-tree-plus')
      .each(el => {
        el.trigger('click')
      })
    cy.get('@Table')
      .find('.so-scroll-y .so-scroll-handle')
      .should('have.css', 'top')
      .and('eq', '0px')
    cy.get('@Table')
      .find('.so-scroll')
      .trigger('wheel', {
        deltaX: -5,
        deltaY: 17,
        deltaZ: 0,
        detail: 0,
        wheelDelta: -51,
        wheelDeltaX: 15,
        wheelDeltaY: -51,
      })
    cy.get('@Table')
      .find('.so-scroll-y .so-scroll-handle')
      .should('have.css', 'top')
      .and('not.eq', '0px')
    cy.get('@Table')
      .find('.so-table-icon-tree-sub')
      .each((el, index) => {
        if (index === 1) {
          el.trigger('click')
        }
      })
    cy.get('@Table')
      .find('.so-scroll-y .so-scroll-handle')
      .should('have.css', 'top')
      .and('not.eq', '0px')
  })
})
