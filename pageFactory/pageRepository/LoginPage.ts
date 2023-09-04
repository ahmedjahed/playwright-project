import { Page } from '@playwright/test'
import { LoginPageObjects } from "@objects/LoginPageObjects"
import { WebActions } from "@lib/WebActions"

let webActions: WebActions
let loginPageObjects: LoginPageObjects

export class LoginPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
        webActions = new WebActions(this.page)
        loginPageObjects = new LoginPageObjects()
    }


    async clickRegisterBtn(): Promise<void> {
        await webActions.clickElement(loginPageObjects.Register_Btn_Selector)
    }

    async goToLoginPage(url: string): Promise<void> {
        await webActions.navigateToURL(url)
    }

    async enterEmail(email: string): Promise<void> {
        await webActions.fillInputField(loginPageObjects.Email_Input_Selector, email)
    }
    async enterPassword(pass: string): Promise<void> {
        await webActions.fillInputField(loginPageObjects.Password_Input_Selector, pass)
    }

    async clickLoginBtn(): Promise<void> {
        await webActions.clickElement(loginPageObjects.Login_Btn_Selector)
    }

    async getEmailPlaceholder(): Promise<string> {
        return await webActions.getAttributeValue(loginPageObjects.Email_Input_Selector, "placeholder")
    }

    async getPasswordPlaceholder(): Promise<string> {
        return await webActions.getAttributeValue(loginPageObjects.Password_Input_Selector, "placeholder")
    }

    async getRequiredFieldErrorMessages(): Promise<any[]> {
        return await this.page.locator(loginPageObjects.Required_Fields_ErrorMsg_Selector).allTextContents()
    }
    async getErrorOrSuccessToastMsg(): Promise<string> {
        return await webActions.getElementText(loginPageObjects.ErrorMsg_Toast_Selector)
    }
    async clickForgetPassLink(): Promise<void> {
        await webActions.clickElement(loginPageObjects.ForgetPass_Link_Selector)
    }
}