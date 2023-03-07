import { defineConfig } from "cypress";
import nycConfig from './nyc.config'
export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: false,
  e2e: {
    baseUrl: "http://localhost:4000",
    specPattern: `cypress/e2e/${nycConfig.target}/*.cy.{js,jsx,ts,tsx}`,
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config
    }
    // specPattern: 'cypress/e2e/Form/*.cy.{js,jsx,ts,tsx}'
    // setupNodeEvents(on, config) {
    // implement node event listeners here
    // },
  },
});
