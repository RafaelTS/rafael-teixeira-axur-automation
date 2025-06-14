import 'cypress-xpath'

export const registerElements = {
  productInput: () => cy.get('#twotabsearchtextbox'),
  searchButton: () => cy.get('#nav-search-submit-button'),
  chooseProduct: () => cy.xpath("(//div[contains(@data-component-type, 's-search-result')])[1]//img[contains(@class, 's-image')]"),
  priceProduct: () => cy.xpath("(//span[@class='a-price']//span[@class='a-offscreen' and contains(text(),'R$')])[1]"),
  addToCartButton: () => cy.get('#add-to-cart-button'),
  goToCardButton: () => cy.get('#nav-cart-count'),
  carPriceProduct: () => cy.get('.a-text-bold > .a-price > [aria-hidden="true"]'),
  subTotalOne: () => cy.get('#sc-subtotal-amount-activecart'),
  subTotalTwo: () => cy.get('#sc-subtotal-amount-buybox'),
  addMoreProductButton: () => cy.xpath("//span[@data-a-selector='increment-icon']"),
  cardProductQuantity: () => cy.get('#nav-cart-count')
}
