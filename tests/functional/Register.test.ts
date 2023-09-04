import test from "@lib/BaseTest"
import RegisterData from "@data/RegisterData.json"
import { expect } from "@playwright/test"



test.describe("Test Register feature", async () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goToLoginPage("/client")
        await loginPage.clickRegisterBtn()
    })
    test("Verify a user can register to the application using valid input", async ({ registerPage }) => {

        await registerPage.enterFirstName(RegisterData.ValidData.FirstName)
        await registerPage.enterLastName(RegisterData.ValidData.LastName)
        await registerPage.enterEmail(`${Math.random().toString(36).slice(2, 7)}@gmail.com`)
        await registerPage.enterPhoneNumber(RegisterData.ValidData.PhoneNumber)
        await registerPage.SelectOccupation(RegisterData.ValidData.Occupation)
        await registerPage.selectGender(RegisterData.ValidData.Gender)
        await registerPage.enterPassword(RegisterData.ValidData.Password)
        await registerPage.enterConfirmPassword(RegisterData.ValidData.ConfirmPassword)
        await registerPage.checkRequiredCheckbox()
        await registerPage.clickRegisterConfirmBtn()
        expect(await registerPage.getErrorOrSuccessToastMsg()).toContain(RegisterData.RegisterSuccessMessage)
    })

    test("Verify input fields placeholder is showing correctly or not", async ({ registerPage }) => {
        expect(await registerPage.getFirstNamePlaceholder()).toBe(RegisterData.PlaceholderData.FirstName)
        expect(await registerPage.getLastNamePlaceholder()).toBe(RegisterData.PlaceholderData.LastName)
        expect(await registerPage.getEmailPlaceholder()).toBe(RegisterData.PlaceholderData.Email)
        expect(await registerPage.getPhoneNumberPlaceholder()).toBe(RegisterData.PlaceholderData.PhoneNumber)
        expect(await registerPage.getPasswordPlaceholder()).toBe(RegisterData.PlaceholderData.Password)
        expect(await registerPage.getConfirmPassPlaceholder()).toBe(RegisterData.PlaceholderData.ConfirmPassword)

    })

    test("Verify required fields validation", async ({ registerPage }) => {
        await registerPage.clickRegisterConfirmBtn()
        expect(await registerPage.getRequiredFieldErrorMessages()).toStrictEqual(RegisterData.RequiredFieldsErrorMsg)
        expect(await registerPage.getRequiredCheckboxErrorMessages()).toBe(RegisterData.RequiredCheckboxErrorMsg)
    })
    test("Verify invalid First Name,email,phone number,confirm password field validation", async ({ registerPage }) => {
        await registerPage.enterFirstName(RegisterData.InvalidData.FirstName)
        await registerPage.enterEmail(RegisterData.InvalidData.Email)
        await registerPage.enterPhoneNumber(RegisterData.InvalidData.PhoneNumber)
        await registerPage.enterPassword(RegisterData.InvalidData.Password)
        await registerPage.enterConfirmPassword(RegisterData.InvalidData.ConfirmPassword)
        await registerPage.clickRegisterConfirmBtn()
        expect(await registerPage.getRequiredFieldErrorMessages()).toStrictEqual(RegisterData.InvalidFieldsErrorMsg)

    })
    for (const data of RegisterData.InvalidPassData) {
        test(`Verify invalid password field validation for ${data.Pass} Password`, async ({ registerPage }) => {
            await registerPage.enterFirstName(data.FirstName)
            await registerPage.enterLastName(data.LastName)
            await registerPage.enterEmail(`${Math.random().toString(36).slice(2, 7)}@gmail.com`)
            await registerPage.enterPhoneNumber(data.PhoneNumber)
            await registerPage.enterPassword(data.Pass)
            await registerPage.enterConfirmPassword(data.ConfirmPass)
            await registerPage.checkRequiredCheckbox()
            await registerPage.clickRegisterConfirmBtn()
            expect((await registerPage.getErrorOrSuccessToastMsg()).trim()).not.toContain(RegisterData.RegisterSuccessMessage)

        })
    }

    test("Verify already user created related Alert message is showing or not", async ({ registerPage }) => {
        await registerPage.enterFirstName(RegisterData.AlreadyUserRegisterData.FirstName)
        await registerPage.enterLastName(RegisterData.AlreadyUserRegisterData.LastName)
        await registerPage.enterEmail(RegisterData.AlreadyUserRegisterData.Email)
        await registerPage.enterPhoneNumber(RegisterData.AlreadyUserRegisterData.PhoneNumber)
        await registerPage.SelectOccupation(RegisterData.AlreadyUserRegisterData.Occupation)
        await registerPage.selectGender(RegisterData.AlreadyUserRegisterData.Gender)
        await registerPage.enterPassword(RegisterData.AlreadyUserRegisterData.Password)
        await registerPage.enterConfirmPassword(RegisterData.AlreadyUserRegisterData.ConfirmPassword)
        await registerPage.checkRequiredCheckbox()
        await registerPage.clickRegisterConfirmBtn()
        expect(await registerPage.getErrorOrSuccessToastMsg()).toContain(RegisterData.AlreadyUserRegisterData.AlertMessage)
    })


})