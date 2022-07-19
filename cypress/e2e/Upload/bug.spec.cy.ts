describe('', () => {
  it('修复 Upload 删除错误后 tip 仍然不显示的问题(< 1.10.12)', () => {
    cy.visit('/cn/components/Upload?example=test-001-tip')
    cy.get('.so-upload').as('Upload')
    cy.get('@Upload').find('input[type="file"]').attachFile('dd.gif')
    cy.get('@Upload').find('input[type="file"]').attachFile('dd.gif')
    cy.get('.so-form-tip').should('have.length', 0)
    cy.get('@Upload').find('.so-upload-error .so-upload-delete').click()
    cy.get('.so-form-tip').should('have.length', 1)
  })
})
