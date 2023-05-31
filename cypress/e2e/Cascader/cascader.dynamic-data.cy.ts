describe('Cascader dynamic data', () => {
  it('filter', () => {
    cy.visit('/cn/components/Cascader?example=test-004-filter-dynamic-data')
    cy.get('#load-btn').click()
    cy.get('.so-input.so-select').eq(0).as('Cascader0')
    cy.get('@Cascader0').click()
    cy.get('@Cascader0').find('.so-cascader-input').type('2')
    cy.get('@Cascader0').find('.so-checkinput').should('have.length', 0)
    cy.wait(2000)
    cy.get('@Cascader0').find('.so-checkinput').should('have.length', 1)
    cy.get('@Cascader0').find('.so-checkinput').first().click()
    cy.get('@Cascader0').find('.so-cascader-item').first().should('have.text', '2')
  })
})
