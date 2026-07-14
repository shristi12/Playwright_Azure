const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {OrderReviewPage} = require('./OrderReviewPage');
const {CartPage} = require('./CartPage');

class POManager
{
    constructor(page)
    {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    //this.ordersHistoryPage = new OrderHistoryPage(this.page);
    this.ordersReviewPage = new OrderReviewPage(this.page);
    this.cartPage = new CartPage(this.page);
    }
    //functions
    getCartPage()
    {
    return this.cartPage;
    }

    getLoginPage()
    {
        return this.loginPage;
    }
    getDashboardPage()
    {
        return this.dashboardPage;
    }
//     getOrdersHistoryPage()
// {
//     return this.ordersHistoryPage;
// }

getOrdersReviewPage()
{
    return this.ordersReviewPage;
}
}

module.exports={POManager};