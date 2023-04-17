describe('Select[clickAway]', () => {
  it('下拉列表', () => {
    cy.visit('/cn/components/Select?example=008-popupContainer-absolute-relative')

    const components = [
      {
        selector: 'select',
        dropDown: 'so-select-options',
      },
      {
        selector: 'datepicker',
        dropDown: 'so-datepicker-picker',
      },
      {
        selector: 'cascader',
        dropDown: 'so-cascader-options',
      },
      {
        selector: 'treeselect',
        dropDown: 'so-treeSelect-options',
      },
    ]

    cy.get('#relative-app').as('App')
    cy.get('#app-out-container').as('OutContainer')
    cy.get('#app-root-container').as('Container')

    cy.get('#app-out-container').scrollTo(50, 50)

    components.forEach(async com => {
      const { selector, dropDown } = com

      cy.get(`.${selector}`).as(selector)
      cy.get(`@${selector}`).click()
      cy.get('@Container')
        .find(`.${dropDown}`)
        .should('have.length', 1)

      cy.get(`.${selector}`).then($el => {
        const rect = $el[0].getBoundingClientRect()
        cy.get('@Container')
          .find(`.${dropDown}`)
          .then($co => {
            const coRect = $co[0].getBoundingClientRect()
            // 3 为固定间距
            expect(Math.abs(coRect.top - rect.top - rect.height)).to.eq(3)
          })
        cy.get('@Container').click({ force: true })
      })
    })
  })

  it('上拉列表', () => {
    cy.visit('/cn/components/Select?example=008-popupContainer-absolute-relative')

    const components = [
      {
        selector: 'select',
        dropDown: 'so-select-options',
      },
      {
        selector: 'datepicker',
        dropDown: 'so-datepicker-picker',
      },
      {
        selector: 'cascader',
        dropDown: 'so-cascader-options',
      },
      {
        selector: 'treeselect',
        dropDown: 'so-treeSelect-options',
      },
    ]

    cy.get('#relative-app').as('App')
    cy.get('#app-out-container').as('OutContainer')
    cy.get('#app-root-container').as('Container')

    cy.get('#app-out-container').scrollTo(50, 50)

    cy.get('#apis').invoke('css', { display: 'none' })
    cy.get('#api-Select').invoke('css', { display: 'none' })
    cy.get('.doc-api-table').invoke('css', { display: 'none' })

    components.forEach(async com => {
      const { selector, dropDown } = com

      cy.get(`.${selector}`).as(selector)
      cy.get(`@${selector}`).click()
      cy.get('@Container')
        .find(`.${dropDown}`)
        .should('have.length', 1)

      cy.get(`.${selector}`).then($el => {
        const rect = $el[0].getBoundingClientRect()
        cy.get('@Container')
          .find(`.${dropDown}`)
          .then($co => {
            const coRect = $co[0].getBoundingClientRect()
            // 3 为固定间距
            expect(Math.abs(coRect.top - rect.top)).to.eq(coRect.height + 3)
          })
      })
    })
  })
})
