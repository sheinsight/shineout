describe('Upload Bug', () => {
  it('修复 Upload 的错误会导致 tip 不显示的问题 (< 1.11.3)', () => {
    cy.visit('/cn/components/Upload?example=test-001-tip')
    cy.get('.so-upload').as('Upload')
    cy.get('.so-form-tip').should('have.length', 1)
    cy.get('@Upload').find('input[type="file"]').attachFile('dd.gif')
    cy.get('@Upload').find('input[type="file"]').attachFile('bear.gif')
    cy.get('.so-form-tip').should('have.length', 1)
    cy.get('@Upload').find('.so-upload-error .so-upload-delete').click()
    cy.get('.so-form-tip').should('have.length', 1)
  })
})
