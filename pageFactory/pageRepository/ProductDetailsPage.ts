import { Locator, Page } from "@playwright/test"
import { WebActions } from "@lib/WebActions"
import { ProductDetailsPageObjects } from "@objects/ProductDetailsPageObjects"


let webActions: WebActions
let productDetailsPageObjects: ProductDetailsPageObjects

export class ProductDetailsPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
        webActions = new WebActions(this.page)
        productDetailsPageObjects = new ProductDetailsPageObjects()
    }

    async clickAddToCartBtn(): Promise<void> {
       await webActions.clickElement(productDetailsPageObjects.Add_TO_Cart_Btn_Selector)
    }

    async getToastMsg():Promise<string>{
       return await webActions.getElementText(productDetailsPageObjects.Product_Add_To_Cart_Toast_Msg_Selector)
    }

    async getToastMsgLocator():Promise<any>{
        return await webActions.getLocatorForSelector(productDetailsPageObjects.Product_Add_To_Cart_Toast_Msg_Selector)
    }





}