Feature: Search Product

  Scenario: Search a product and put it on the kart
    Given that I am on the Amazon website
    And I search for the product "Huggies Premium Natural Care Diaper M 32 Units"
    When I click enter
    Then the product will be displayed
    And I add a unit
    And I go to the shopping cart
    And the price shown is the same price as when I searched for the product
    And I add one more product
    And the quantity has increased to 2
    And the subtotal value is updated