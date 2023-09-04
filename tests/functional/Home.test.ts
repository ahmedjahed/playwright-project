import test from "@lib/BaseTest"
// import { HomePage } from "pageFactory/pageRepository/HomePage"
import HomeData from "@data/HomePageData.json"
import LoginData from "@data/LoginData.json"
import { expect, request } from "@playwright/test"
import { Common } from "@utils/Common"

let common: Common

common = new Common()


let token: string

test.describe("Test Home page features", async () => {
    test.beforeAll(async () => {
        token = await common.getLoginToken(LoginData.ValidLoginData.Email, LoginData.ValidLoginData.Password)
    })

    test.beforeEach(async ({ homePage }) => {
         common.setTokenInLocalStroage(homePage.page, token)
        await homePage.page.goto("https://rahulshettyacademy.com/client")
    })

    test("Verify Filter Search input is working properly or not for valid data", async ({ homePage }) => {
        await homePage.searchProduct(HomeData.ValidProductName)
        expect((await homePage.getProductName()).toLowerCase()).toContain(HomeData.ValidProductName)
    })

    for (const data of HomeData.InvalidProductName) {
        test(`Verify Filter Search input is working properly or not for invalid ${data.Product} data`, async ({ homePage }) => {
            await homePage.searchProduct(data.Product)
            expect(await homePage.getErrorToastMsg()).toBe(HomeData.ErrorMessage)
        })
    }


    test("Verify Price Range is working properly or not for valid data", async ({ homePage }) => {
        await homePage.setMinimumAndMaxPriceRange(HomeData.ValidPriceRange.Mini, HomeData.ValidPriceRange.Max)
        expect(await homePage.getRangeProductName()).toContain(HomeData.ValidRangeProductName)

    })

    test("Verify Price Range is working properly or not for invalid data", async ({ homePage }) => {
        await homePage.setMinimumAndMaxPriceRange(HomeData.InvalidPriceRange.Mini, HomeData.InvalidPriceRange.Max)
        expect(await homePage.getErrorToastMsg()).toBe(HomeData.ErrorMessage)
    })



})

