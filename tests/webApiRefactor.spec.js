const { test, expect, request } = require("@playwright/test");
const { apiUtils } = require('./utils/apiUtils')

const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" }
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "620c7dee48767f1f1215d2de" }] };

let response;

test.beforeAll(async () => {

    

    // const apiContext = await request.newContext();
    // const apiutils = new apiUtils(apiContext, loginPayload);
    // response = await apiutils.createOrder(orderPayload);

    // page.addInitScript(value => {
    //     window.localStorage.setItem('token', value);
    // }, response.token);

    // await page.goto('https://rahulshettyacademy.com/client');

    
})

test.beforeEach(async({page})=>{
    
    const apiContext = await request.newContext();
    const apiutils = new apiUtils(apiContext, loginPayload);
    response = await apiutils.createOrder(orderPayload);

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client');

})

test('@rerun browser Testcase', async ({ page }) => {

    await page.locator("[routerlink*='myorders']").first().click();

    const table = page.locator("tbody tr");
    await table.first().waitFor();
    const tableList = await table.count();
    for (let k = 0; k < tableList; k++) {
        visibleOrder = await table.nth(k).locator('th').textContent();

        if (response.orderID.includes(visibleOrder)) {
            console.log(visibleOrder);


            await table.nth(k).locator('button').first().click();
            break;

        }
    }

    // await page.pause();

});