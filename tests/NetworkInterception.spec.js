const {test, expect, request}=require('@playwright/test')
const{APIUtils}=require('../Utils/APIUtils.js');
const loginPayload={userEmail:"shristi.vats01@gmail.com",userPassword:"Welcome@2021"};
const orderPayload={orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
let response;
const fakePayloadOrders={data:[],message:"No Orders"};

test.beforeAll(async()=>
{
    console.log('Before all tests');
    const apiContext=await request.newContext();
    const apiUtils=new APIUtils(apiContext,loginPayload);
    response=await apiUtils.createOrder(orderPayload);
   
      
});

test('API validation', async ({page}) =>
{
 
    page.addInitScript( value=>{
        window.localStorage.setItem('token', value);
    }, response.token);

   await page.goto('https://rahulshettyacademy.com/client');
   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route=>{
        //intercepting response->API response->(fake response by PW)->browser->renderon ui
       
        const response=  await page.request.fetch(route.request());
        let body=JSON.stringify(fakePayloadOrders);
         route.fulfill({
        response,
        body,
       });

    }
   );
   
   
    await page.locator("button[routerlink*='myorders']").click();
    await page.WaitforResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    //await page.waitForLoadState('networkidle');
    console.log(await page.locator(".mt-4").textContent());
    
  
  
});