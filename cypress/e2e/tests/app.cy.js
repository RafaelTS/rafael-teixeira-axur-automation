import { RegisterActions } from "../pages/registerActions"
import { registerElements } from "../pages/registerElements"


const register = new RegisterActions()
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
      register.typeProduct(input.product)
    });
    it(`When I click enter`, () => {
      register.clickSearch()
    })

    it(`Then the product will be displayed`, () => {
      cy.title().should('eq', 'Amazon.com.br : macuinaima')

    })
    it('And I validate the price', () => {
      register.getPrice().then((price) => {
        productValue = price.trim()
        cy.log(`Capture price : ${productValue}`)
      })
    })
    it(`And I choose this book `, () => {
      register.clickChosenProduct()
    })
    it('And I add this book to the cart', () => {
      register.addProduct()

    });
    it(`And I go to the shopping cart`, () => {
      register.clickCartButton()
    })
    it(`And the price shown is the same price as when I searched for the product`, () => {
      register.getPriceCard().then((cardPrice) => {
        cardProductValue = cardPrice.trim().replace(/\s/g, '')
        cy.log(`Card Capture Price : ${cardProductValue}`)
      
        register.getSubTotalPriceOne().then((subTotalOne) => {
          subTotalOneValue = subTotalOne.trim().replace(/\s/g, '')
          cy.log(`SubTotal One Capture Price : ${subTotalOneValue}`)
        
          register.getSubTotalPriceTwo().then((subTotalTwo) => {
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
      register.buyOneMoreProduct()

    })
    it(`And the quantity has increased to 2`, () => {
      register.validateQuantity(2)
    })
    it('And the subtotal value is updated', () => {
      // Converte o valor original do produto para número
      const cleanValue = productValue.trim().replace(/\s/g, '').replace('R$', '').replace(',', '.')
      const unitPrice = parseFloat(cleanValue)
        
      // Multiplica por 2
      const expectedSubtotal = (unitPrice * 2).toFixed(2) // ex: 51.22
        
      // Valida os dois subtotais
      register.getSubTotalPriceOne().then((subTotalOne) => {
        const subOneClean = subTotalOne.trim().replace(/\s/g, '').replace('R$', '').replace(',', '.')
        expect(parseFloat(subOneClean), 'Subtotal One value').to.eq(parseFloat(expectedSubtotal))
      })
    
      register.getSubTotalPriceTwo().then((subTotalTwo) => {
        const subTwoClean = subTotalTwo.trim().replace(/\s/g, '').replace('R$', '').replace(',', '.')
        expect(parseFloat(subTwoClean), 'Subtotal Two value').to.eq(parseFloat(expectedSubtotal))
      })
    })

  })
})

