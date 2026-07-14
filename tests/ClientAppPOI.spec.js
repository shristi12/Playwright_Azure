const {test, expect}=require('@playwright/test')
const {POManager}=require('../pageObjects/POManager');
const dataSet=JSON.parse(JSON.stringify(require("../Utils/PlaceOrderTestData.json")));

for(const data of dataSet)
{
test(`@Web Client App login ${data.productName}`, async ({page}) =>
{
  
   const poManager=new POManager(page);
   const loginPage=poManager.getLoginPage(); 
   await loginPage.goToUrl();
   await loginPage.validLogin(data.loginUsername,data.loginPassword);
   const dashBoardPage=poManager.getDashboardPage();
   await dashBoardPage.searchProductAddCart(data.productName);
   await dashBoardPage.navigateToCart();

   const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   //await dashboardPage.navigateToOrders();
//    const ordersHistoryPage = poManager.getOrdersHistoryPage();
//    await ordersHistoryPage.searchOrderAndSelect(orderId);
//    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();  
});

}