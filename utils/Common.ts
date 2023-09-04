import {Page,request} from "@playwright/test"

export class Common{
    // constructor(){

    // }


async getLoginToken(mail:string,password:string):Promise<string>{
    const apiContext = await request.newContext()
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login/", {
        data: {userEmail: mail, userPassword: password}
    })
    const loginResponseJson = await loginResponse.json()
   let token = loginResponseJson.token
   return token
    
}

async setTokenInLocalStroage(page:Page,token:string){
    page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    }, token)
}


}