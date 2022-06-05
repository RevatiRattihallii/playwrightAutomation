const { test, expect } = require("@playwright/test");

test('Validtions and window popup, iframes', async ({ page }) => {


    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com');
    // await page.goBack(); //go back to rahul academey
    // await page.goForward(); // go to google   
    await page.locator("[value='Show']").click();
    const box = page.locator("[placeholder='Hide/Show Example']");
    await expect(box).toBeVisible();
    await page.locator("[value='Hide']").click();
    await expect(box).toBeHidden();

    // to accept popups in play write, use page.on->this is to inform anywhere in the script, if there is popup, just accept or approve it. It could be placed in any line. 

    page.on('dialoge', dialoge=>dialoge.accept());
    await page.locator('#confirmbtn').click();

    //hover the mouse, we have method called hover in playwright
    await page.locator('#mousehover').hover();
    await page.pause();

//Handling frames. It could done by storing a frame locator in const and use it inplace of page.xxx

const newFrame =page.frameLocator("#courses-iframe");
let textPrint = await newFrame.locator('.login-btn a[href*="sign_up"]').textContent();
console.log(textPrint)

await page.locator("[value='Show']").click();
let textPrint2 = await newFrame.locator('.login-btn a[href*="sign_up"]').textContent();
console.log(textPrint2)
}) 

test.only('Screenshots and Visual Validations', async({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');   
    await page.locator("[value='Show']").click();
    const box = page.locator("[placeholder='Hide/Show Example']");
    await page.screenshot({path:'screenshot.png'});//screenshot with path
    await expect(box).toBeVisible();
    await page.locator("[value='Hide']").click();
    await page.locator("[value='Hide']").screenshot({path:'./tests/partialscreenshot.png'});//screenshot to specific path
    await expect(box).toBeHidden();

    // Screenshot comparison

    await page.goto('https://google.com');
     expect(await page.screenshot()).toMatchSnapshot('landing.png');


})