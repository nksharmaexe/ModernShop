// Cypress configuration for e2e tests
const Cypress = require('cypress');

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      // Add custom command signatures here if needed
    }
  }
}
