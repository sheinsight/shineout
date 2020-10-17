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
        list.forEach(react => {
          const { size } = react.props
          if (size && size !== 'default') {
            cy.get(react.node).should('have.class', `so-button-${size}`)
          }
        })
      })
    })
  })

  describe('Button[Disabled]', () => {
    beforeEach(() => {
      cy.visit('/Button?example=4-disabled')
      cy.waitForReact(1000, '#root')
      cy.get(`${example} > div`).as('group')
    })

    it('should set disabled attr while disabled has', () => {
      cy.getReact('ShineoutButton').then(list => {
        list.forEach(react => {
          const { disabled } = react.props
          if (disabled) {
            cy.get(react.node).should('have.class', `so-button-disabled`)
          }
        })
      })
    })
  })

  describe('Button[Loading]', () => {
    beforeEach(() => {
      cy.visit('/Button?example=5-loading')
      cy.waitForReact(1000, '#root')
      cy.get(`${example} > div`).as('group')
    })

    it('should set disabled attr while disabled has', () => {
      cy.getReact('ShineoutButton').then(list => {
        list.forEach(react => {
          const { loading } = react.props
          if (loading) {
            cy.get(react.node).should('have.attr', `disabled`)
            cy.get(react.node)
              .children(`${button}-spin`)
              .should('exist')
          }
        })
      })
    })
  })

  describe('Button[Href]', () => {
    beforeEach(() => {
      cy.visit('/Button?example=6-href')
      cy.waitForReact(1000, '.doc-example')
      cy.get(`${example} > ${button}`)
    })

    it('should render as a tage while has href', () => {
      cy.getReact('ShineoutButton').then(react => {
        const { href, target } = react[0].props

        cy.get(react[0].node)
          .should('have.attr', 'href', href)
          .and('have.attr', 'target', target)
      })
    })
  })

  describe('Button[Outline]', () => {
    beforeEach(() => {
      cy.visit('/Button?example=7-outline')
      cy.waitForReact(1000, '.doc-example')
      cy.get(`${example} > div`)
    })

    it('should set outline class while outline has', () => {
      cy.getReact('ShineoutButton').then(list => {
        list.forEach(react => {
          const { outline, type } = react.props
          if (outline) {
            cy.get(react.node)
              .should('have.class', `so-button-outline`)
              .and('have.class', `so-button-${type}`)
          }
        })
      })
    })
  })

  describe('Button[Outline]', () => {
    beforeEach(() => {
      cy.visit('/Button?example=8-group')
      cy.waitForReact(1000, '.doc-example')
      cy.get(`${example} > div`)
    })

    it('should take effect on button while set on button-group', () => {
      cy.getReact('ShineoutButtonGroup').then(list => {
        list.forEach(react => {
          const { outline, type, size } = react.props
          if (!outline && !type && !size) {
            cy.get(react.node)
              .should('have.class', 'so-button-group')
              .and('have.class', 'so-button-outline')

            return
          }

          if (outline) {
            cy.get(react.node)
              .should('have.class', `so-button-outline`)
              .children(`${button}${button}-outline`)
              .should('exist')
          }

          if (type) {
            cy.get(react.node)
              .children(`${button}${button}-${type}`)
              .should('exist')
          }

          if (size) {
            cy.get(react.node)
              .children(`${button}${button}-${size}`)
              .should('exist')
          }
        })
      })
    })
  })
})
