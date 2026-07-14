class APIUtils
{
    constructor(apiContext, loginPayload)
    {
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
    }

async getToken()
{
    const apiResponse= await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {data:this.loginPayload

        })
       
        const loginResponseJson=await apiResponse.json();
        const token=loginResponseJson.token;
        return token;
}

async createOrder(orderPayload)
{
    let response={};
    response.token=await this.getToken();
 const postResponse= await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{
            data:orderPayload,
            headers:{
                'Authorization':  response.token,
                'Content-Type': 'application/json'
            }
        })
       
        const responseData=await postResponse.json();
        console.log(responseData);
        response.orderId=responseData.orders[0];
        return response;
}


}
module.exports={APIUtils};