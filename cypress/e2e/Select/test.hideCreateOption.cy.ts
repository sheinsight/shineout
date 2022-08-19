describe('Select[hideCreateOption]', () => {
  it('should not create option', () => {
    cy.visit('/cn/components/Select?example=test-003-hideCreateOption')
    cy.get('.so-select').eq(0).as('Select')
    cy.get('@Select').find('.so-select-inner').click().should('have.class', 'so-select-focus')
    // 创建
    cy.get('@Select').find('.so-select-input').type('nice')
    cy.get('@Select').find('.so-select-option').should('have.length', 7)
    cy.get('@Select').find('.so-select-result').trigger('keydown', {keyCode: 13})
    // 手动修改hoverIndex
    cy.get('@Select').find('a.so-select-option').eq(0)
      .trigger("mouseover")
      .trigger("mousemove")
    cy.get('@Select').find('.so-list').eq(0).trigger('mouseover')
    // 创建
    cy.get('@Select').find('.so-select-input').type('good')
    cy.get('@Select').find('.so-select-option').should('have.length', 7)
    cy.get('@Select').find('.so-select-result').trigger('keydown', {keyCode: 13})
    //
    cy.get('@Select').find('.so-select-item').eq(0).should('have.text', 'nice')
    cy.get('@Select').find('.so-select-item').eq(1).should('have.text', 'good')

  })
})
