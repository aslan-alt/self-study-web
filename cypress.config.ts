import {defineConfig} from 'cypress';

export default defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
      // modify config values
      config.defaultCommandTimeout = 10000;
      config.baseUrl = 'http://localhost:3000';
      config.fixturesFolder = false;
      // config.supportFile = 'cypress/support/index.ts';
      config.supportFile = false;
      // modify env var value

      // IMPORTANT return the updated config object
      return config;
    },
  },
});
