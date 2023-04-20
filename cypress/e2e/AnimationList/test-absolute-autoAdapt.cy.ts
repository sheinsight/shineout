it('下拉列表', () => {
  cy.visit('/cn/components/Select?example=009-popupContainer-absolute-long')

  function getNearestPositionDom(target: HTMLElement): HTMLElement {
    if (target) {
      const { position } = getComputedStyle(target)

      if (position !== 'static') {
        return target
      }

      if (target.parentElement) {
        return getNearestPositionDom(target.parentElement)
      }
    }
    return document.body
  }

  cy.get('#relative-app').as('App')
  cy.get('#app-out-container').as('OutContainer')
  cy.get('#app-root-container').as('Container')

  cy.viewport(1100, 500)
  cy.scrollTo(0, 1000)
  cy.get('#app-out-container').scrollTo(100, 150)

  cy.get('#app-root-container').as('Container')

  cy.get(`.select`).as('select')
  cy.get(`@select`).click()
  cy.get('@Container')
    .find(`.so-select-options`)
    .should('have.length', 1)

  cy.get(`.select`).then($el => {
    const rect = $el[0].getBoundingClientRect()
    cy.get('@Container')
      .find(`.so-select-options`)
      .then($co => {
        const coRect = $co[0].getBoundingClientRect()
        // 3 为固定间距
        expect(Math.abs(coRect.top - rect.top - rect.height)).to.eq(3)
      })
  })

  cy.get('.so-select-options').then($el => {
    const rect = $el[0].getBoundingClientRect()
    cy.get(`@select`).then($co => {
      const coRect = $co[0].getBoundingClientRect()
      expect(rect.width + coRect.left).to.be.greaterThan(1100)
    })
    cy.get('@Container').then($container => {
      const nearstPositionDom = getNearestPositionDom($container[0])
      const nearstPositionDomRect = nearstPositionDom.getBoundingClientRect()
      const offset = 1100 - nearstPositionDomRect.left - nearstPositionDomRect.width
      expect(getComputedStyle($el[0]).right).to.eq(`${offset * -1}px`)
    })
  })
})
