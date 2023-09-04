import test from "@lib/BaseTest"
import {expect} from "@playwright/test"
import LoginData from "@data/LoginData.json"

test.describe("Login Feature Test",async()=>{

    test.beforeEach(async({loginPage})=>{
        await loginPage.goToLoginPage("/client")
    })


    test('Verify user can login to the application using valid credential', async ({ loginPage }) => {
       
        await loginPage.enterEmail(LoginData.ValidLoginData.Email)
        await loginPage.enterPassword(LoginData.ValidLoginData.Password)
        await loginPage.clickLoginBtn()
        await loginPage.page.waitForNavigation()
        expect(await loginPage.getErrorOrSuccessToastMsg()).toContain(LoginData.LoginSuccessMessage)
    
    })

    test("Verify input fields placeholder is showing correctly or not", async ({ loginPage }) => {
      
        expect(await loginPage.getEmailPlaceholder()).toBe(LoginData.PlaceholderData.Email)
        expect(await loginPage.getPasswordPlaceholder()).toBe(LoginData.PlaceholderData.Password)
       

    })
    
    test('Verify empty field validation', async ({ loginPage }) => {
        await loginPage.clickLoginBtn()
        expect(await loginPage.getRequiredFieldErrorMessages()).toStrictEqual(LoginData.RequiredFieldsErrorMsg)
    
    })
    
    test('Verify invalid email and confirm password message', async ({ loginPage }) => {
        await loginPage.enterEmail(LoginData.InvalidEmail)
        await loginPage.enterPassword(LoginData.ValidLoginData.Password)
        await loginPage.clickLoginBtn()
        expect(await loginPage.getRequiredFieldErrorMessages()).toStrictEqual(LoginData.InvalidEmailFieldErrorMsg)
    
    
    })
    
    
    for(const data of LoginData.InvalidLoginData){
        test(`Verify user can not login to the application using invalid credential as ${data.Email}`, async ({ loginPage }) => {
            await loginPage.enterEmail(data.Email)
            await loginPage.enterPassword(data.Password)
            await loginPage.clickLoginBtn()
            expect(await loginPage.getErrorOrSuccessToastMsg()).not.toContain(LoginData.LoginSuccessMessage)
        })
    }

    
})


