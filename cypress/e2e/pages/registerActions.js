import { registerElements as el } from './registerElements'

export class RegisterActions {
  typeProduct(text) {
    if (!text) throw new Error('Product text not provided')
    el.productInput().type(text)
  }

  clickSearch() {
    el.searchButton().click()
  }

  clickChosenProduct() {
    el.chooseProduct().click()
  }

  getPrice() {
    return el.priceProduct().invoke('text').then(t => t.trim())
  }

  addProduct() {
    el.addToCartButton().click()
  }

  clickCartButton() {
    el.goToCardButton().click()
  }

  getPriceCard() {
    return el.carPriceProduct().invoke('text').then(t => t.trim())
  }

  getSubTotalPriceOne() {
    return el.subTotalOne().invoke('text').then(t => t.trim())
  }

  getSubTotalPriceTwo() {
    return el.subTotalTwo().invoke('text').then(t => t.trim())
  }

  buyOneMoreProduct() {
    el.addMoreProductButton().click()
  }

  validateQuantity(expectedQty) {
    el.cardProductQuantity().should('have.text', String(expectedQty))
  }
}
