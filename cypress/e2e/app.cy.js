import 'cypress-xpath'

class RegisterForm {
  elements = {
    productInput: () => cy.get('#twotabsearchtextbox'),
    searchButton: () => cy.get('#nav-search-submit-button'),
    chooseProduct: () => cy.xpath("(//div[contains(@data-component-type, 's-search-result')])[1]//img[contains(@class, 's-image')]"),
    priceProduct: () => cy.xpath("(//span[@class='a-price']//span[@class='a-offscreen' and contains(text(),'R$')])[1]"),
    addToCartButton: () => cy.get('#add-to-cart-button'),
    goToCardButton: () => cy.get('#nav-cart-count'),
    cardPriceProduct: () => cy.get('.a-text-bold > .a-price > [aria-hidden="true"]'),
    subTotalOne: () => cy.get(''),
    subTotalTwo: () => cy.get(''),
    cartRemoveButton: () => cy.get('[value="Excluir"]'), // botão "remover"
    addMoreProductButton: () => cy.get('')
  }
  typeProduct(text) {
    if (!text) throw new Error('Product text not provided')
    this.elements.productInput().type(text)
  }
  clickSearch() {
    this.elements.searchButton().click()
  }
  clickChoseenProduct() {
    this.elements.chooseProduct().click()
  }
  getPrice() {
    return this.elements.priceProduct()
      .invoke('text')      // captura texto
      .then(t => t.trim()) // já retorna limpo
  }
  addProduct() {
    this.elements.addToCartButton().click()
  }
  clickCardButton() {
    this.elements.goToCardButton().click()
  }
  getPriceCard() {
    return this.elements.cardPriceProduct()
      .invoke('text')      // captura texto
      .then(t => t.trim()) // já retorna limpo

  }
  getSubTotalPriceOne() {
    return this.elements.subTotalOne()
      .invoke('text')      // captura texto
      .then(t => t.trim()) // já retorna limpo

  }
  getSubTotalPriceTwo() {
    return this.elements.subTotalTwo()
      .invoke('text')      // captura texto
      .then(t => t.trim()) // já retorna limpo

  }
  emptyCartIfNeeded() {
      cy.visit('https://www.amazon.com.br/gp/cart/view.html')
      this.elements.cartRemoveButton().then($btns => {
        if ($btns.length) {
          cy.wrap($btns).each($btn => {
            cy.wrap($btn).click()
          })
        }
      })
    }
  }

describe('Search Product', () => {
  describe('Submitting an image with invalid inputs', () => {
    const registerForm = new RegisterForm()
    let productValue = ''
    const input = { product: 'macunaima' }

    before(() => {
      cy.clearCookies()
      cy.clearLocalStorage()
      registerForm.emptyCartIfNeeded()
    })
  
    it('Given that I am on the Amazon website', () => {
      cy.visit('/')
    })
    it(`And I search for the product "${input.product}"`, () => {
      registerForm.typeProduct(input.product)
    });
    it(`When I click enter`, () => {
      registerForm.clickSearch()
    })

    it(`Then the product will be displayed`, () => {
      cy.title().should('eq', 'Amazon.com.br : macuinaima')

    })
    it('And I validate the price', () => {
      registerForm.getPrice().then((preco) => {
        productValue = preco.trim()
        cy.log(`Preco capturado : ${productValue}`)
      })
    })
    it(`And I choose this book `, () => {
      registerForm.clickChoseenProduct()
    })
    it('And I add this book to the cart', () => {
      registerForm.addProduct()

    });
    it(`And I go to the shopping cart`, () => {
      registerForm.clickCardButton()
    })
    it(`And the price shown is the same price as when I searched for the product`, () => {

    })
    it(`And I add one more product`, () => {

    })
    it(`And the quantity has increased to 2`, () => {

    })
    it(`And the subtotal value is updated`, () => {

    })
  })
})