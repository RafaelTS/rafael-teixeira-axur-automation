# Automação E2E com Cypress - Projeto Amazon

<h3 align="center">Programação</h3>

<ul>
  <li>Motivação</li>
  <li>Cypress?</li>
  <li>Trade-offs</li>
  <li>Pré-Requisitos</li>
  <li>O que vamos testar</li>
  <li>Instalação</li>
  <li>Configuração</li>
  <li>Como rodar o projeto</li>
  <li>Um ponto interessante</li>
</ul>

<hr>

<h3 align="center">Motivação</h3>

<p align="left">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Agilidade (- tempo)<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Qualidade (- bugs)<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Economia de horas (- custo)
</p>

<hr>

<h3 align="center"> 
  Cypress?
</h3>

<p align="justify">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JavaScritpt: Baixa curva de aprendizado, custo com treinamento reduzido.<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Performance: Paralelismo, Stress Test, Load Test.<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Recorder: Cypress Recorder (Chrome), Katalon Recorder.<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Produtividade: Auto-reload, Spies, Stubs e Mocks.<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Licença: OpenSource (Mit).<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;End-to-end tests, Integration tests, Unit tests.<br>

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Diferente do Selenium ou Appium, que injetam comandos exernos, o Cypress roda no mesmo contexto JS do App, com acesso instantâneo a todas as interações e eventos.
</p>

<hr>

<h3 align="center"> 
  Trade-offs
</h3>

<p align="justify">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cypress não é uma ferramenta de automação geral.<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Os comandos do Cypress sempre são executados dentro de um navegador.<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nunca haverá suporte para várias guias do navegador.<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Você não pode usar o Cypress para controlar dois navegadores no mesmo teste.
</p>

<hr>

<h3 align="center"> 
  Pré-Requisitos
</h3>

<p>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cypress para automação de testes E2E<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cypress-xpath para suporte a seletores XPath<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mochawesome para geração de relatórios HTML personalizados<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NTL - Package feito por um brasileiro que lista os comandos no terminal com as versões disponíveis de como rodar o cypress<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Node.js 18+ (recomendado)
</p>

<hr>

<h3 align="center"> 
  O que vamos testar
</h3>

<p align="justify">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Projeto para teste: Site da Amazon<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comece clonando o projeto, rodando o comando no terminal<br>
  <pre>git clone https://github.com/RafaelTS/rafael-teixeira-axur-automation.git</pre>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E acessando a pasta<br>
  <pre>cd rafael-teixeira-axur-automation</pre>
</p>

<hr>

<h3 align="center"> 
  Instalação
</h3>

<p align="justify">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Abra outro terminal. Na pasta/rafael-teixeira-axur-automation/ execute:
  <pre>npm init -y</pre>
  <pre>npm i -D cypress</pre>
  <pre>npm i -g ntl</pre>
</p>

<hr>

<h3 align="center"> 
  Configuração
</h3>

<p align="left">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No arquivo package.json, foi adicionado esse trecho de código:<br>
  <pre>
   "scripts": {
    "cypress:web": "npx cypress open",
    "cypress:headless": "npx cypress run --browser electron"
  },
  </pre>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Para poder listar as maneiras de executar. Uma vez instalado o ntl, basta digitar o ntl no terminal e você poderá escolher como rodar o projeto.  
  
</p>
<hr>

<h3 align="center"> 
  Como rodar o projeto
</h3>

<p align="left">
    <pre>npx cypress open</pre>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O comando "cypress open", além de abrir o Cypress Test Runner, cria a pasta inicial /cypress/ e o arquivo de configuração /cypress.json<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E já vem com /examples/ dos principais comandos Cypress.<br>
    <pre>ntl</pre>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Como dito acima, se digitar no terminal ntl irá habilitar se você vai rodar o projeto<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;via open ou via headless, as duas opções configuradas.<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;via OBSERVAÇÃO: Por alguma limitação da ferramenta, o ntl não gera o relatório, sendo necessário para isso o comando abaixo<br>
    <pre>npx cypress run</pre>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Roda o cypress via terminal.<br>
</p>

<hr>

<h3 align="center"> 
  Um ponto interessante
</h3>

<p align="left">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Inicialmente não bastou somente limpar o storage para zerar o carrinho. Precisou fazer algo mais elabora, conforme abaixo. Também não foi possível fazer isso no beforeAfter pois isso zera cada it, sendo então a melhor saída apenas o before<br>

```js
    before(() => {
      cy.clearCookies()
      cy.window().then((win) => {
        win.localStorage.clear()
        win.sessionStorage.clear()
      });
    });
```

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Foi necessário acessar o objeto window para conseguir limpar. Elegante.<br>
</p>

