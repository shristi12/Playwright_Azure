const {test, expect, request}=require('@playwright/test')
const{APIUtils}=require('../Utils/APIUtils.js');
const loginPayload={userEmail:"shristi.vats01@gmail.com",userPassword:"Welcome@2021"};
const orderPayload={orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
let response;

test.beforeAll(async()=>
{
    console.log('Before all tests');
    const apiContext=await request.newContext();
    const apiUtils=new APIUtils(apiContext,loginPayload);
    response=await apiUtils.createOrder(orderPayload);
   
      
});

test(' @API API validation', async ({page}) =>
{
 
    page.addInitScript( value=>{
        window.localStorage.setItem('token', value);
    }, response.token);

   await page.goto('https://rahulshettyacademy.com/client');
  
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    console.log(response.orderId);
  
});