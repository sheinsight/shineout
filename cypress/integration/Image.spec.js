const example = '.doc-example-body'
const prefix = `.so-image`

describe('Image', () => {
  describe('Base', () => {
    beforeEach(() => {
      cy.visit('/Image?example=01')
      cy.waitForReact(1000, '#root')
      cy.get(`${example} > ${prefix}`).as('image')
    })

    it('should render corrent dom structure', () => {
      cy.get('@image')
        .get('.so-image-inner')
        .should('exist')
    })

    it('should set width and height if through', () => {
      cy.get('@image').then($els => {
        const { paddingBottom } = $els[0].style
        cy.getReact('ShineoutImage')
          .getProps('height')
          .should('eq', parseInt(paddingBottom, 10))
      })
    })
  })

  describe('Image[Shape]', () => {
    beforeEach(() => {
      cy.visit('/Image?example=02')
      cy.waitForReact(1000, '#root')
    })

    it('should render shape', () => {
      cy.getReact('ShineoutImage').then(list => {
        list.forEach(target => {
          cy.get(`${example} > div > ${prefix}${prefix}-${target.props.shape}`).should('exist')
        })
      })
    })
  })

  describe('Image[ImageFit]', () => {
    beforeEach(() => {
      cy.visit('/Image?example=03')
      cy.waitForReact(1000, '#root')
    })

    it('should render correct element while fit different', () => {
      cy.getReact('ShineoutImage').then(list => {
        list.forEach(target => {
          cy.get(`${example} > div ${prefix}${prefix}-${target.props.fit}`).should('exist')
        })
      })
    })
  })

  describe('Image[Alt]', () => {
    beforeEach(() => {
      cy.visit('/Image?example=04')
      cy.waitForReact(1000, '#root')
      cy.get(`${example} > ${prefix}`).as('image')
    })

    it('should use alt when src invalid', () => {
      cy.getReact('ShineoutImage')
        .getProps('alt')
        .then(value => {
          cy.get('@image')
            .get(`${prefix}-inner img`)
            .invoke('attr', 'src')
            .should('eq', value)
        })
    })
  })

  describe('Image[Error]', () => {
    beforeEach(() => {
      cy.visit('/Image?example=05')
      cy.waitForReact(1000, '#root')
      cy.get(`${example} > ${prefix}`).as('image')
    })

    it('should show title when src&alt invalid', () => {
      cy.get('@image')
        .get(`${prefix}-inner img`)
        .should('not.exist')

      cy.getReact('ShineoutImage')
        .getProps('title')
        .then(title => {
          cy.get('@image')
            .get(`${prefix}-inner > div`)
            .contains(title)
        })
    })
  })

  describe('Image[Error]', () => {
    beforeEach(() => {
      cy.visit('/Image?example=06')
      cy.waitForReact(1000, '#root')
      cy.get(`${example} > div`).as('contains')
    })

    it('should set target on a-tag while set target', () => {
      cy.getReact('ShineoutImage').then(list => {
        list.forEach(elem => {
          let { target } = elem.props

          if (target === '_download') {
            target = '_self'
            cy.get('@contains')
              .get(`a[target=${target}][download]${prefix}`)
              .should('exist')

            return
          }

          cy.get('@contains')
            .get(`a[target=${target}]${prefix}`)
            .should('exist')
        })
      })
    })
  })

  describe('Image[Group]', () => {
    it('should wrap image use group', () => {
      cy.visit('/Image?example=07')
      cy.waitForReact(1000, '#root')

      cy.getReact('ShineoutImageGroup')
        .getReact('ShineoutImage')
        .then(contains => {
          cy.get(`${example} > ${prefix}-group`)
            .children()
            .should('have.length', contains.length)
        })
    })

    it('should pile while has pile prop', () => {
      cy.visit('/Image?example=08')
      cy.waitForReact(1000, '#root')

      cy.get(`${example} > ${prefix}-group${prefix}-pile`).should('exist')
    })
  })

  describe('Image[Lazyload]', () => {
    beforeEach(() => {
      cy.visit('/Image?example=09')
      cy.waitForReact(1000, '#root')
      cy.get(`${example} > div`).as('group')
    })

    it('should lazy-load while has lazy prop', () => {
      // not all container have img dom
      cy.get('@group')
        .children()
        .then(list => {
          const { length } = list
          cy.get('@group')
            .find(`${prefix} ${prefix}-inner > div`)
            .its('length')
            .should('eq', length)

          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.scrollTo('bottom', {
            duration: 500,
            easing: 'swing',
          })
            .wait(1000)
            .get('@group')
            .get(`${prefix}`)
            .get(`${prefix}-inner > div`)
            .should('not.exist')
        })
    })
  })
})
