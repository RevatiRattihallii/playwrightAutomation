class apiUtils {

    constructor(apiContext,loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;


    }
    async getToken() {

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload,

            })

        const loginJson = await loginResponse.json();
       let token = loginJson.token;
        return token;

    }

    async createOrder(orderPayload) {

        let response={};
        response.token = await this.getToken();


        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization': response.token,
                    'Content-type': 'application/json',
                }
            }

        )


        const orderResponseJson = await orderResponse.json();
        const orderID = orderResponseJson.orders[0];
        response.orderID=orderID;
        return response;

    }


}

module.exports = {apiUtils};