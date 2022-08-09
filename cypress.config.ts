import { defineConfig } from "cypress";
export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: false,
  e2e: {
    baseUrl: "http://localhost:3000",
    // specPattern: 'cypress/e2e/Form/*.cy.{js,jsx,ts,tsx}'
    // setupNodeEvents(on, config) {
    // implement node event listeners here
    // },
  },
});
