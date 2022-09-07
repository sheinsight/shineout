describe('Textarea[autosize]', () => {
  it('', () => {
    cy.visit('/cn/components/Textarea?example=2-autosize')
    cy.get('.so-input').eq(0).as('Textarea0')
    cy.get('.so-input').eq(1).as('Textarea1')
    cy.get('@Textarea0').setAttr({style: "width: 100px"})

    cy.get('@Textarea0').find('textarea').then((el)=>{
      expect(el[0].scrollHeight === el[0].clientHeight).to.eq(true)
    })

    cy.get('@Textarea0').find('textarea').eq(0).type('0123456789012345678901234567890123456789012345678901234567890123456789')
    cy.get('@Textarea0').find('textarea').then((el)=>{
      expect(el[0].scrollHeight === el[0].clientHeight).to.eq(true)
    })

    cy.get('@Textarea0').find('textarea').eq(0).type('0123456789012345678901234567890123456789012345678901234567890123456789')
    cy.get('@Textarea0').find('textarea').then((el)=>{
      console.log()
      expect(el[0].scrollHeight === el[0].clientHeight).to.eq(false)
    })
  })

})
