// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  // se quiser logar o erro, descomente:
  // console.error('Ignorado erro da app:', err.message)
  return false // impede que o Cypress falhe o teste
});

Cypress.Screenshot.defaults({
  capture: 'runner'
})

Cypress.on('fail', (error, runnable) => {
  cy.screenshot();
  throw error;
});
