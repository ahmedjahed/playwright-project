import { expect } from "@playwright/test"
import test from "@lib/BaseTest"
import LoginData from "@data/LoginData.json"
import OrderPageData from "@data/OrdersPageData.json"
import { Common } from "@utils/Common"


let common: Common
let token: string

common = new Common()





test.describe("Test Orders Page", async () => {

    test.beforeAll(async () => {
        token = await common.getLoginToken(LoginData.ValidLoginData.Email, LoginData.ValidLoginData.Password)
    })

    test.beforeEach(async ({ homePage }) => {
        common.setTokenInLocalStroage(homePage.page, token)
        await homePage.page.goto("https://rahulshettyacademy.com/client")
    })


    test("Unauthorized user accessed related message test", async ({ordersPage,navBar }) => {
     
        await navBar.clickOrdersBtn()
      
        await ordersPage.page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=62b44749e26b7e1a10eea3ec",
          route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=62b48b7ae26b7e1a10eeaae8' })
        )
        await ordersPage.clickViewBtn()
       expect(await ordersPage.getUnAuthOrderText()).toContain(OrderPageData.UnAuthText)

    })



})