import test from "@lib/BaseTest"
import { expect } from "@playwright/test"
import LoginData from "@data/LoginData.json"
import { Common } from "@utils/Common"
import EndToEndProductData from "@data/EndToEndOrderProductData.json"
import MyCartData from "@data/MyCartPageData.json"
import HomePageData from "@data/HomePageData.json"

let token: string
let common: Common


common = new Common()

test.describe("End to End Product Order test", async () => {
  test.beforeAll(async () => {
    token = await common.getLoginToken(LoginData.ValidLoginData.Email, LoginData.ValidLoginData.Password)
  })

  test.beforeEach(async ({ homePage }) => {
    common.setTokenInLocalStroage(homePage.page, token)
    await homePage.page.goto("https://rahulshettyacademy.com/client")
  })
  test("Add to cart a product from product details and complete the order", async ({ homePage, placeOrderPage, productDetailsPage, navBar, cartPage }) => {
    //home-view-add to cart-cart-single (buy now)-place order-orderConfirm-order-view order-delete order
    await homePage.clickViewBtnofProductItem(EndToEndProductData.ProductName)
    const [response] = await Promise.all([
      productDetailsPage.page.waitForResponse("https://rahulshettyacademy.com/api/ecom/user/add-to-cart"),
      await productDetailsPage.clickAddToCartBtn()
    ]);
    let responseJsonData = await response.json()
    let responseMsg = await responseJsonData.message
    expect(await productDetailsPage.getToastMsgLocator()).toHaveText(responseMsg)
    expect(await navBar.getCartLabelCount()).toBe("1")
    await navBar.clickCartBtn()
    await cartPage.clickBuyNowBtnOfCartItem(EndToEndProductData.ProductName)
    // await placeOrderPage.selectCounty()
    // await placeOrderPage.clickPlaceOderBtn()
    // await placeOrderPage.page.pause()
  })

  test("Add to cart a product from Home page and complete the order", async ({ homePage, productDetailsPage, navBar, cartPage }) => {
    //home-add to cart--cart-single (buy now)-place order-orderConfirm-order-view order-delete order
    const [response] = await Promise.all([
      productDetailsPage.page.waitForResponse("https://rahulshettyacademy.com/api/ecom/user/add-to-cart"),
      await homePage.clickAddToCartOfProduct(EndToEndProductData.ProductName)
    ]);

    let responseJsonData = await response.json()
    let responseMsg = await responseJsonData.message
    expect(await productDetailsPage.getToastMsgLocator()).toHaveText(responseMsg)
    expect(await navBar.getCartLabelCount()).toBe("1")
    await navBar.clickCartBtn()
    await cartPage.clickBuyNowBtnOfCartItem(EndToEndProductData.ProductName)
    // await placeOrderPage.selectCounty(EndToEndProductData.CountryName)
  })


  test("Delete a single product from my cart page", async ({ homePage, placeOrderPage, productDetailsPage, navBar, cartPage }) => {
    //home-add to cart--cart-single (delete)-continue shopping
    const [response] = await Promise.all([
      productDetailsPage.page.waitForResponse("https://rahulshettyacademy.com/api/ecom/user/add-to-cart"),
      await homePage.clickAddToCartOfProduct(EndToEndProductData.ProductName)
    ]);

    let responseJsonData = await response.json()
    let responseMsg = await responseJsonData.message
    expect(await productDetailsPage.getToastMsgLocator()).toHaveText(responseMsg)
    await navBar.clickCartBtn()
    await cartPage.clickDeleteBtnOfCartItem(EndToEndProductData.ProductName)
    expect(await cartPage.getNoCartText()).toContain(MyCartData.NoCartText)
    await cartPage.clickContinueShoppingBtn()
    await expect(homePage.page).toHaveURL(HomePageData.homePageUrl)
  })

  test("Add to cart multiple product from Home page and complete the order", async ({ homePage, productDetailsPage, navBar, cartPage }) => {
    const [response] = await Promise.all([
      productDetailsPage.page.waitForResponse("https://rahulshettyacademy.com/api/ecom/user/add-to-cart"),
      await homePage.clickAddToCartOfProduct(EndToEndProductData.ProductName),
      await homePage.clickAddToCartOfProduct(EndToEndProductData.ProductName2)
    ]);

    let responseJsonData = await response.json()
    let responseMsg = await responseJsonData.message
    expect(await productDetailsPage.getToastMsgLocator()).toHaveText(responseMsg)

    await Promise.all([
      await navBar.clickCartBtn(),
      expect(await navBar.getCartLabelCount()).toBe("2")
    ])

    let totalPrice = EndToEndProductData.ProducPrice + EndToEndProductData.Product2Price
    expect(await cartPage.getTotalPriceOfProduct()).toBe(totalPrice)
    await cartPage.clickCheckoutBtn()
    // await placeOrderPage.selectCounty(EndToEndProductData.CountryName)
  })


})