import { Page } from "@playwright/test"


export class WebActions {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }


    async waitForElementAttached(selector: string): Promise<void> {
        // wait for visible the locator or web element
        await this.page.locator(selector).waitFor()
    }

    async clickElement(selector: string): Promise<void> {
        await this.waitForElementAttached(selector)
        await this.page.click(selector)
    }

    async navigateToURL(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async fillInputField(selector: string, input: any): Promise<void> {
        await this.page.locator(selector).type(input)
    }

    async selectDropDownByLabel(selector: string, label: string): Promise<void> {
        await this.page.selectOption(selector, { label: label })
    }
    async selectDropDownByIndex(selector: string, index: number): Promise<void> {
        await this.page.selectOption(selector, { index: index })
    }
    async selectDropDownByValue(selector: string, value: string): Promise<void> {
        await this.page.selectOption(selector, { value: value })
    }
    async checkElement(selector: string): Promise<void> {
        // await this.waitForElementAttached(selector);
        return this.page.check(selector);
    }

    async uncheckElement(selector: string): Promise<void> {
        //await this.waitForElementAttached(selector);
        return this.page.uncheck(selector);
    }

    async getAttributeValue(selector: string, attributeName: string): Promise<string> {
        return await this.page.getAttribute(selector, attributeName)
    }

    async getElementText(selector: string): Promise<string> {
        return await this.page.textContent(selector);
    }
    async getLastElementText(selector: string): Promise<string> {
        return await this.page.locator(selector).last().textContent()
    }

    async getLocatorForSelector(selector:string){
        return this.page.locator(selector)
    }

}