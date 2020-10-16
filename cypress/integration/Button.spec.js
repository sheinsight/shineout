const example = '.doc-example-body'
const button = '.so-button'

describe('Button', () => {
  describe('Button[Base]', () => {
    beforeEach(() => {
      cy.visit('/Button?example=1-base')
      cy.waitForReact(1000, '.doc-example')
      cy.get(`${example} > div ${button}`).as('button')
    })

    it('should render .so-button in a Button', () => {
      cy.get('@button').should('exist')
    })

    it('should make contact on prop and className', () => {
      cy.getReact('ShineoutButton').then(reacts => {
        reacts.forEach(btn => {
          const { type = 'default' } = btn.props
          if (type === 'secondary') {
            cy.get('@button')
              .get(`${button}-primary${button}-outline`)
              .should('exist')
            return
          }
          cy.get('@button')
            .get(`${button}-primary`)
            .should('exist')
        })
      })
    })
  })

  describe('Button[Size]', () => {
    beforeEach(() => {
      cy.visit('/Button?example=3-size')
      cy.waitForReact(1000, '.doc-example')
      cy.get(`${example} > div`).as('group')
    })

    it('should set size class while has size prop', () => {
      cy.getReact('ShineoutButton').then(list => {
        list.forEach(react => {})
      })
    })
  })
})
