describe('Horse Race Game', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Initial Page Load', () => {
    it('should display the header with logo', () => {
      cy.get('.header').should('be.visible')
      cy.get('.header__logo').should('be.visible')
    })

    it('should display Generate Program button', () => {
      cy.contains('button', 'Generate Program').should('be.visible')
    })

    it('should display Start New Race button and be disabled', () => {
      cy.contains('button', 'Start New Race').should('be.visible').and('be.disabled')
    })

    it('should display Horse List section', () => {
      cy.contains('HORSE LIST').should('be.visible')
    })

    it('should display Race Track section', () => {
      cy.contains('RACE TRACK').should('be.visible')
    })

    it('should display Program section', () => {
      cy.contains('PROGRAM').should('be.visible')
    })

    it('should display Results section', () => {
      cy.contains('RESULTS').should('be.visible')
    })

    it('should show empty state messages before program generation', () => {
      cy.contains('No program generated yet').should('be.visible')
      cy.contains('No results yet').should('be.visible')
      cy.contains('No horses found').should('be.visible')
      cy.contains('Please generate a program to start racing').should('be.visible')
    })
  })

  describe('Generate Program', () => {
    beforeEach(() => {
      cy.contains('button', 'Generate Program').click()
    })

    it('should generate program when clicking Generate Program button', () => {
      cy.get('.horse-list__table').should('be.visible')
      cy.get('.horse-list__row').should('have.length', 20)
    })

    it('should display 6 rounds in the program list', () => {
      // SCROLLABLE CONTAINER (using be.visible would not work)
      cy.contains('1. Lap').should('exist')
      cy.contains('1200m').should('exist')
      cy.contains('2. Lap').should('exist')
      cy.contains('1400m').should('exist')
      cy.contains('3. Lap').should('exist')
      cy.contains('1600m').should('exist')
      cy.contains('4. Lap').should('exist')
      cy.contains('1800m').should('exist')
      cy.contains('5. Lap').should('exist')
      cy.contains('2000m').should('exist')
      cy.contains('6. Lap').should('exist')
      cy.contains('2200m').should('exist')
    })

    it('should enable Start New Race button after program generation', () => {
      cy.contains('button', 'Start New Race').should('not.be.disabled')
    })

    it('should display horses with condition values between 1-100', () => {
      cy.get('.horse-list__row').each(($row) => {
        cy.wrap($row)
          .find('.horse-list__td--condition')
          .invoke('text')
          .then((text) => {
            const condition = parseInt(text.replace('%', ''))
            expect(condition).to.be.at.least(1)
            expect(condition).to.be.at.most(100)
          })
      })
    })
  })

  describe('Start Race', () => {
    beforeEach(() => {
      cy.contains('button', 'Generate Program').click()
    })

    it('should start race when clicking Start New Race', () => {
      cy.contains('button', 'Start New Race').click()

      cy.contains('button', 'Pause').should('be.visible')
    })

    it('should display race track with horses', () => {
      cy.contains('button', 'Start New Race').click()

      cy.get('.horse-lane-item').should('have.length', 10)
    })

    it('should show Round 1 information in race track', () => {
      cy.contains('Round 1 - 1200m').should('be.visible')
    })
  })

  describe('Pause and Resume', () => {
    beforeEach(() => {
      cy.contains('button', 'Generate Program').click()
      cy.contains('button', 'Start New Race').click()
    })

    it('should pause race when clicking Pause', () => {
      cy.contains('button', 'Pause').click()

      cy.contains('button', 'Resume').should('be.visible')
    })

    it('should resume race when clicking Resume', () => {
      cy.contains('button', 'Pause').click()
      cy.contains('button', 'Resume').click()

      cy.contains('button', 'Pause').should('be.visible')
    })
  })

  describe('Race Completion', () => {
    beforeEach(() => {
      cy.contains('button', 'Generate Program').click()
    })

    it('should show results after race completes', () => {
      cy.contains('button', 'Start New Race').click()

      cy.get('.result-list__round', { timeout: 20000 }).should('have.length.at.least', 1) // Waiting for results
    })

    it('should show winner in first position', () => {
      cy.contains('button', 'Start New Race').click()

      cy.get('.horse-list-item--winner', { timeout: 20000 }).should('exist') // Waiting for results
    })
  })

  describe('Regenerate Program', () => {
    it('should reset game when clicking Generate Program again', () => {
      cy.contains('button', 'Generate Program').click()
      cy.contains('button', 'Start New Race').click()

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)
      cy.contains('button', 'Generate Program').click()

      cy.contains('button', 'Start New Race').should('not.be.disabled')
      cy.contains('No results yet').should('be.visible')
    })
  })

  describe('Full Game Flow', () => {
    it('should complete a full race round', () => {
      cy.contains('button', 'Generate Program').click()

      cy.get('.horse-list__row').should('have.length', 20)

      cy.contains('button', 'Start New Race').click()

      cy.get('.result-list__round', { timeout: 20000 }).should('have.length.at.least', 1)

      cy.get('.result-list__rankings').first().find('.horse-list-item').should('have.length', 10)
    })
  })
})
