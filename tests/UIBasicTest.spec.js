const { test, expect } = require('@playwright/test');

//browser in curly braces is pw fixture
//test.only will run only 1 testcase
test('browser Testcase', async ({ page }) => {
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/');

    const uname = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitle = page.locator(".card-body a");

    //.fill will first clear the field and then enter the text
    await uname.fill("rahulshettyacademy");
    await page.locator('[type="password"]').type('learning');

    //if service call is not available and you want to wait for page to load after sign in, use navigation and promise before signIn.
    //promise is an array
    await Promise.all([
        page.waitForNavigation(),
        signIn.click(),

    ]);


    // css with many idices
    console.log(await cardTitle.nth(1).textContent());

    // get all the contents. it returns all in array
    const contents = await cardTitle.allTextContents();
    console.log(contents);



});


test('browser context and UI operations second testcase', async ({ browser }) => {

    //context and page is required if you want to add cookies etc. else go with just page fixture

    const context = await browser.newContext();// to get fresh browser
    const page = await context.newPage();//to get new page in the browser
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

    const uname = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const docLink = page.locator("[href*='documents-request']");


    await uname.type('rahulshettyacademy');
    await page.locator('[type="password"]').type('learning');

    // Use of select/dropdown and radio-buttons
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption('consult');
    await page.locator('.checkmark').last().click();
    await page.locator('#okayBtn').click();

    // some of the asertions
    await expect(page.locator('.checkmark').last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();

    //Uncheck the checkbox
    await page.locator('#terms').uncheck();

    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    // check if the text is blinking by using toHave attribute

    await expect(docLink).toHaveAttribute('class', 'blinkingText');

    await signIn.click();
    // await page.pause();
    //  console.log(await cardTitle.nth(1).textContent());



})

//Handling child window

test('Handling child window testcase', async ({ browser }) => {

    const context = await browser.newContext();  // to get fresh browser
    const page = await context.newPage();  //to get new page in the browser

    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/');
    const docLink = page.locator("[href*='documents-request']");
    const uname = page.locator('#username');

    // since new window is opning, we need to handle it with promise. store it in new variable

    const [newWindow] = await Promise.all([
        context.waitForEvent('page'),
        docLink.click(),
    ])

   let gettingtext = await newWindow.locator(".top-left").textContent();
    console.log(gettingtext);

    //splitting the text and printing it

    const arrayList = gettingtext.split('@');  //right and left 2 arrays. right array or index 1 has after @ part
    const mainWord = arrayList[1].split('.')[0]; // index 1 is split and stored in oth idex og new array
    console.log(mainWord);
    await uname.fill(mainWord);
    await page.pause();

})