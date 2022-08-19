describe('Select[compressed]', () => {
  it('should auto select when focus', () => {
    cy.visit('/cn/components/Select?example=01-o-compressed')
    cy.get('.so-select').as('Select')
    cy.get('@Select').find('.so-select-inner').click()
    cy.get('@Select').find('.so-select-option').each((el)=>{
      cy.wrap(el).click()
    })
    cy.get('@Select').find('.so-select-item').should('have.length', 4)
    cy.get('@Select').find('.so-select-item-compressed').should('have.text', '+4')

    // 自适应宽度
    cy.get('@Select').setAttr({style: "width: 400px"})
    cy.get('@Select').find('.so-select-item-compressed').should('have.text', '+2')
    cy.get('@Select').setAttr({style: "width: 500px"})
    cy.get('@Select').find('.so-select-item-compressed').should('have.text', '+')
    cy.get('@Select').setAttr({style: "width: 100px"})
    cy.get('@Select').find('.so-select-item-compressed').should('have.text', '+6')
  })
})
