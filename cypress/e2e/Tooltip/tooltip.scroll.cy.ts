describe("tooltip inScroll will update when change position", ()=>{
   it('should reset position', ()=>{
     cy.visit('/cn/components/Tooltip?example=test-001-scroll')
     cy.get('.so-table .self-country').eq(0).as('Country')
     cy.get('@Country').trigger('click')
     cy.get('.so-tooltip').as('Tooltip')
     let left: number
     cy.get('@Tooltip').then((el)=>{
       left = el[0].getBoundingClientRect().left
     })
     cy.get('.so-table').first().as('Table')
     cy.get('@Table').find('.so-scroll').trigger('wheel', {
       deltaX: 600,
       deltaY: 0,
       deltaZ: 0,
       detail: 0,
       wheelDelta: 200,
       wheelDeltaX: 200,
       wheelDeltaY: 0,
     })
     cy.get('@Tooltip').then((el)=>{
       expect(el[0].getBoundingClientRect().left).not.eq(left)
     })
   })
  it('should close when clickAway', ()=>{
    cy.visit('/cn/components/Tooltip?example=test-001-scroll')
    cy.get('.so-table .self-country').eq(0).as('Country')
    cy.get('@Country').trigger('click')
    cy.get('.so-tooltip').should('have.length', 1)
    cy.get('body').trigger('click', {force: true})
    cy.get('.so-tooltip').should('have.length', 0)

  })
})
