import { Page } from "@playwright/test"
import { WebActions } from "@lib/WebActions"
import { ForgetPassPageObjects } from "@objects/ForgetPassPageObjects"

let webActions: WebActions
let forgetPassPageObjects: ForgetPassPageObjects

export class ForgetPassPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
        forgetPassPageObjects = new ForgetPassPageObjects()
        webActions = new WebActions(this.page)
    }
    async getRequiredFieldErrorMessages(): Promise<any[]> {
        return await this.page.locator(forgetPassPageObjects.Required_Fields_ErrorMsg_Selector).allTextContents()
    }

    async clickSaveNewPassBtn(): Promise<void> {
        await webActions.clickElement(forgetPassPageObjects.SaveNewPassword_Btn_Selector)
    }

    async enterEmail(email: string): Promise<void> {
        await webActions.fillInputField(forgetPassPageObjects.Email_Input_Field_Selector, email)
    }

    async enterPassword(pass: string): Promise<void> {
        await webActions.fillInputField(forgetPassPageObjects.Password_Input_Field_Selector, pass)
    }

    async enterConfirmPassword(confirmPass: string): Promise<void> {
        await webActions.fillInputField(forgetPassPageObjects.ConfirmPassword_Input_Field_Selector, confirmPass)
    }

    async getErrorOrSuccessToastMsg(): Promise<string> {
        return await webActions.getElementText(forgetPassPageObjects.ErrorMsg_Toast_Selector)
    }

    async getEmailPlaceholder(): Promise<string> {
        return await webActions.getAttributeValue(forgetPassPageObjects.Email_Input_Field_Selector, "placeholder")
    }

    async getPasswordPlaceholder(): Promise<string> {
        return await webActions.getAttributeValue(forgetPassPageObjects.Password_Input_Field_Selector, "placeholder")
    }

    async getConfirmPasswordPlaceholder(): Promise<string> {
        return await webActions.getAttributeValue(forgetPassPageObjects.ConfirmPassword_Input_Field_Selector, "placeholder")
    }



}