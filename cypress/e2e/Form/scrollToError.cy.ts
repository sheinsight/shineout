describe('Upload scrollToError', () => {
  it('触发校验后滚动到错误位置', () => {
    cy.visit('/cn/components/Form?example=07-validate')
    cy.get('.so-button-primary').click()
    cy.get('.so-input-invalid').then((el)=>{
      expect(Math.round(el[0].getBoundingClientRect().top)).eq(30)
    })
  })
})
