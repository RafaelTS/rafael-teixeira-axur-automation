# rafael-teixeira-axur-automation

para adicionar no readme com calma

Produtos adicionados no carrinho da amazon costumam quebrar pelo cypress

Como corrigir? 

Cypress.on('uncaught:exception', (err, runnable) => {
  // se quiser logar o erro, descomente:
  // console.error('Ignorado erro da app:', err.message)
  return false // impede que o Cypress falhe o teste
}); 

no arquivo support/e2e.js

Isso é um erro de JavaScript não tratado da própria Amazon (do tipo Unhandled Promise Rejection) que o Cypress por padrão interpreta como falha de teste.