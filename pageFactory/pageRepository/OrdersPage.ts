import { Page } from "@playwright/test"
import { WebActions } from "@lib/WebActions"
import { OrdersPageObjects } from "@objects/OrdersPageObjects"


let webActions: WebActions
let ordersPageObjects: OrdersPageObjects

export class OrdersPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
        webActions = new WebActions(this.page)
        ordersPageObjects = new OrdersPageObjects()
    }

    async getUnAuthOrderText(): Promise<string> {
        return await webActions.getElementText(ordersPageObjects.UnAuth_Msg_Text_Selector)
    }

    async clickViewBtn(): Promise<void> {
        await webActions.clickElement(ordersPageObjects.View_Btn_Selector)
    }





}