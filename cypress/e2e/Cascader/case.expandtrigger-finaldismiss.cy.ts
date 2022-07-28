describe('Cascader expandTrigger and finalDismiss', () => {
  it('expandTrigger: hover-only', () => {
    cy.visit('/cn/components/Cascader?example=test-002-expandtrigger-finaldismiss')
    cy.get('.so-input.so-select')
      .eq(0)
      .as('Cascader0')
    cy.get('@Cascader0').click()
    // 只有一列
    cy.get('@Cascader0').find('.so-cascader-list').should('have.length', 1)
    cy.get('@Cascader0')
      .find('.so-cascader-node.so-cascader-has-children')
      .first()
      .trigger('mouseover')
    // hover 后展示两列
    cy.get('@Cascader0').find('.so-cascader-list').should('have.length', 2)
    cy.get('@Cascader0')
      .find('.so-cascader-node.so-cascader-has-children')
      .first()
      .trigger('click')
    cy.get('@Cascader0').find('.so-cascader-item').should('have.length', 0)

  })

  it('expandTrigger: hover', () => {
    cy.visit('/cn/components/Cascader?example=test-002-expandtrigger-finaldismiss')
    cy.get('.so-input.so-select')
      .eq(1)
      .as('Cascader0')
    cy.get('@Cascader0').click()
    // 只有一列
    cy.get('@Cascader0').find('.so-cascader-list').should('have.length', 1)
    cy.get('@Cascader0')
      .find('.so-cascader-node.so-cascader-has-children')
      .first()
      .trigger('mouseover')
    // hover 后展示两列
    cy.get('@Cascader0').find('.so-cascader-list').should('have.length', 2)
    cy.get('@Cascader0')
      .find('.so-cascader-node.so-cascader-has-children')
      .first()
      .trigger('click')
    cy.get('@Cascader0').find('.so-cascader-item').should('have.length', 1)
  })

  it('expandTrigger: click, finalDismiss',   () => {
    cy.visit('/cn/components/Cascader?example=test-002-expandtrigger-finaldismiss')
    cy.get('.so-input.so-select')
      .eq(2)
      .as('Cascader0')
    cy.get('@Cascader0').click()
    cy.get('@Cascader0').find('.so-cascader-list').should('have.length', 1)
    function clickChildren(isFinal:boolean) {
      cy.get('@Cascader0')
        .find('.so-cascader-list')
        .last()
        .find('.so-cascader-node')
        .first()
        .trigger('click')
      if (isFinal) {
        cy.get('@Cascader0').find('.so-cascader').should('not.have.class', 'so-select-focus')
      } else {
        cy.get('@Cascader0').find('.so-cascader').should('have.class', 'so-select-focus')
        cy.get('@Cascader0')
          .find('.so-cascader-list')
          .last()
          .find('.so-cascader-node')
          .first()
          .then(el => {
            clickChildren(!el.hasClass('so-cascader-has-children'))
          })
      }


    }
    clickChildren(false)
  })
})
