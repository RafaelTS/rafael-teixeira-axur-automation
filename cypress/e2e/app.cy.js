import 'cypress-xpath'

class RegisterForm {
  elements = {
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
    return this.elements.carPriceProduct()
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
  buyOneMoreProduct() {
    this.elements.addMoreProductButton().click()
  }
  validateQuantity(expectedQty) {
  this.elements.cardProductQuantity()
    .should('have.text', String(expectedQty)) // Cypress vai tentar por padrão por até 4s
  }
}

const registerForm = new RegisterForm()
let productValue = '';
let cardProductValue = '';
let subTotalOneValue = '';
let subTotalTwoValue = '';


describe('Search Product', () => {
  describe('Submitting an image with invalid inputs', () => {
    before(() => {
      cy.clearCookies()
      cy.window().then((win) => {
        win.localStorage.clear()
        win.sessionStorage.clear()
      });
    });
        
    const input = {
      product: 'macuinaima'
    }

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
      registerForm.getPrice().then((price) => {
        productValue = price.trim()
        cy.log(`Capture price : ${productValue}`)
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
      registerForm.getPriceCard().then((cardPrice) => {
        cardProductValue = cardPrice.trim().replace(/\s/g, '')
        cy.log(`Card Capture Price : ${cardProductValue}`)
      
        registerForm.getSubTotalPriceOne().then((subTotalOne) => {
          subTotalOneValue = subTotalOne.trim().replace(/\s/g, '')
          cy.log(`SubTotal One Capture Price : ${subTotalOneValue}`)
        
          registerForm.getSubTotalPriceTwo().then((subTotalTwo) => {
            subTotalTwoValue = subTotalTwo.trim().replace(/\s/g, '')
            cy.log(`SubTotal Two Capture Price : ${subTotalTwoValue}`)
          
            const expectedValue = productValue.trim().replace(/\s/g, '')
          
            expect(cardProductValue, 'Card product value').to.eq(expectedValue)
            expect(subTotalOneValue, 'Subtotal One value').to.eq(expectedValue)
            expect(subTotalTwoValue, 'Subtotal Two value').to.eq(expectedValue)
          })
        })
      })
    })

    it(`And I add one more product`, () => {
      registerForm.buyOneMoreProduct()

    })
    it(`And the quantity has increased to 2`, () => {
      registerForm.validateQuantity(2)
    })
    it('And the subtotal value is updated', () => {
      // Converte o valor original do produto para número
      const cleanValue = productValue.trim().replace(/\s/g, '').replace('R$', '').replace(',', '.')
      const unitPrice = parseFloat(cleanValue)
        
      // Multiplica por 2
      const expectedSubtotal = (unitPrice * 2).toFixed(2) // ex: 51.22
        
      // Valida os dois subtotais
      registerForm.getSubTotalPriceOne().then((subTotalOne) => {
        const subOneClean = subTotalOne.trim().replace(/\s/g, '').replace('R$', '').replace(',', '.')
        expect(parseFloat(subOneClean), 'Subtotal One value').to.eq(parseFloat(expectedSubtotal))
      })
    
      registerForm.getSubTotalPriceTwo().then((subTotalTwo) => {
        const subTwoClean = subTotalTwo.trim().replace(/\s/g, '').replace('R$', '').replace(',', '.')
        expect(parseFloat(subTwoClean), 'Subtotal Two value').to.eq(parseFloat(expectedSubtotal))
      })
    })

  })
})

