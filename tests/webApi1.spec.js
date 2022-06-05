const { test, expect, request } = require("@playwright/test");

const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" }
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "620c7dee48767f1f1215d2de"}]};
let token;
let orderID;
test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload

        })

    expect(loginResponse.ok).toBeTruthy();

    //store the response token
    const loginJson = await loginResponse.json();
    token = loginJson.token;
    console.log(token);


    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        // for postcall always add payload
        data: orderPayload,
        headers:{
            'Authorization':token,
            // this line is useed to get the response in json format.
            'Content-type': 'application/json',
        }
    }
   

    );

    const orderResponseJson= await orderResponse.json();
    // to get the exact orderID, take the response and place it onlinejson editor. get the ttree view.
    orderID = orderResponseJson.orders[0];
    console.log(orderID);


})

test('browser Testcase', async ({ page }) => {

    page.addInitScript(value => {

        // input params are key,value pair. key is token and value.
        //value is either stored in localStorage or sessionStorage.
        window.localStorage.setItem('token', value);
    }, token);


//first pass token and then navigate to url. User will be direct login 
    await page.goto('https://rahulshettyacademy.com/client');


   

    await page.locator("[routerlink*='myorders']").first().click();

    const table = page.locator("tbody tr");
    await table.first().waitFor();
    const tableList = await table.count();
    for (let k = 0; k < tableList; k++) {
        visibleOrder = await table.nth(k).locator('th').textContent();

        if (orderID.includes(visibleOrder)) {
            console.log(visibleOrder);


            await table.nth(k).locator('button').first().click();
            break;

        }
    }

    // await page.pause();

});