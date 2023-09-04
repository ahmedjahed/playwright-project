import { test as baseTest } from "@playwright/test"
import { LoginPage } from "@pages/LoginPage"
import { RegisterPage } from "@pages/RegisterPage"
import {ForgetPassPage} from "@pages/ForgetPassPage"
import {HomePage} from "@pages/HomePage"
import {NavBar} from "@pages/NavBar"
import {OrdersPage} from "@pages/OrdersPage"
import {ProductDetailsPage} from "@pages/ProductDetailsPage"
import {CartPage} from "@pages/CartPage"
import{PlaceOrderPage} from "@pages/PlaceOrderPage"


const test = baseTest.extend<{
    loginPage: LoginPage,
    registerPage: RegisterPage
    forgetPassPage:ForgetPassPage
    homePage:HomePage
    navBar:NavBar
    ordersPage:OrdersPage
    productDetailsPage:ProductDetailsPage
    cartPage:CartPage
    placeOrderPage:PlaceOrderPage
}>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page))
    },
    forgetPassPage:async({page},use)=>{
        await use(new ForgetPassPage(page))
    },
    homePage:async({page},use)=>{
        await use(new HomePage(page))
    },
    navBar:async({page},use)=>{
        await use(new NavBar(page))
    },
    ordersPage:async({page},use)=>{
        await use(new OrdersPage(page))
    },
    productDetailsPage:async({page},use)=>{
        await use(new  ProductDetailsPage(page))
    },
    cartPage:async({page},use)=>{
        await use(new CartPage(page))
    },
    placeOrderPage:async({page},use)=>{
        await use(new PlaceOrderPage(page))
    }

})


export default test