import { Page } from "@playwright/test"
import { WebActions } from "@lib/WebActions"
import { PlaceOrderPageObjects } from "@objects/PlaceOrderPageObjects"

let webActions: WebActions
let placeOrderPageObjects: PlaceOrderPageObjects


export class PlaceOrderPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
        webActions = new WebActions(this.page)
        placeOrderPageObjects = new PlaceOrderPageObjects()
    }


    async selectCounty(): Promise<void> {
        await this.page.locator("[placeholder*='Country']").type("ind",{delay:200});
    const dropdown = this.page.locator(".ta-results");
    await dropdown.waitFor();
    let optionsCount = await dropdown.locator("button").count();
    for(let i =0;i< optionsCount; ++i)
    {
        let text =  await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
           await dropdown.locator("button").nth(i).click();
           break;
        }
    }
    }

    async clickPlaceOderBtn():Promise<void>{
        await webActions.clickElement(placeOrderPageObjects.Place_Order_Btn_Selector)
    }




}