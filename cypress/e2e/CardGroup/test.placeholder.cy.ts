describe('CardGroup placeholder', () => {
  it('should lazyload', () => {
    cy.visit('/cn/components/CardGroup?example=3-lazyload')
    cy.get('.so-card-group-item').as('CardGroupItem')
    cy.get('.so-lazyload').as('Lazy')
    cy.get('@Lazy').should($lazy => {
      expect($lazy).to.have.length(7)
    })
    cy.get('.so-card-group-scroller').scrollTo('bottom', { duration: 1000 })
    cy.get('@Lazy').should($lazy => {
      expect($lazy).to.have.length(0)
    })
  })
})
