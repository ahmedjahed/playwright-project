import { WebActions } from "@lib/WebActions"
import { Page } from "@playwright/test"
import { NavBarObjects } from "@objects/NavBarObjects"

let webActions: WebActions
let navBarObjects: NavBarObjects

export class NavBar {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
        webActions = new WebActions(this.page)
        navBarObjects = new NavBarObjects()
    }


    async clickHomeBtn(): Promise<void> {
        await webActions.clickElement(navBarObjects.Home_Btn_Selector)
    }

    async clickOrdersBtn(): Promise<void> {
        await webActions.clickElement(navBarObjects.Orders_Btn_Selector)
    }

    async clickCartBtn(): Promise<void> {
        await webActions.clickElement(navBarObjects.Cart_Btn_Selector)
    }

    async getCartLabelCount():Promise<string>{
        await webActions.waitForElementAttached(navBarObjects.Cart_Label_Selector)
        return await webActions.getElementText(navBarObjects.Cart_Label_Selector)
    }

}