const {test, expect}=require('@playwright/test');

//browser in curly braces is pw fixture
//test.only will run only 1 testcase
test('browser Testcase', async({page})=>
{
    await page.goto('https://rahulshettyacademy.com/client');

    const uname= page.locator('#userEmail');
    const pwd = page.locator('#userPassword');
    const logIn = page.locator('#login');
    const cardTitle = page.locator(".card-body");
    const productName = "zara coat 3"

   await uname.fill("anshika@gmail.com");
   await pwd.type('Iamking@000');
   await logIn.click();
 
   //This will help to load the page. No need to add wait seperately. Its helpful when service call is made. When servical call is made whole page will be loaded
   await page.waitForLoadState('networkidle');
  
//    const listPresent = await cardTitle.allTextContents();
//    console.log(listPresent);

  const count = await cardTitle.count();
  for(let i=0; i<count;i++){
      //this is chain locatopr
     if( await cardTitle.nth(i).locator('b').textContent()==productName){
        await cardTitle.nth(i).locator("text= Add To Cart").click();
        break;
     }
  }

  await page.locator("button[routerlink*='cart']").click();

  // this will help in waiting for page to load. As same as waitfor element to appear
  await page.locator('div li').nth(1).waitFor();

  const boolean = await page.locator("h3:has-text('zara coat 3')").isVisible();
  expect(boolean).toBeTruthy();
  await page.locator("text=Checkout").click();
  const datedd = page.locator('select[class="input ddl"]');
  await datedd.first().selectOption('05');
  await page.locator('input[type="text"]').nth(1).type('123');
  await page.locator('input[type="text"]').nth(2).type('TestingDemo');
  // this will help to type each letter at the delay of 5 secs
  await page.locator('[placeholder*="Country"]').type('INDIA',{delay:3000});
  const options = page.locator("[class='ta-results list-group ng-star-inserted']");
  await options.waitFor();
  const optionsAvailable = await options.locator('button').count();

  for(let j=0; j<optionsAvailable;j++){
      text = await options.locator('button').nth(j).textContent();
      if( text === ' India'){
          await options.locator('button').nth(j).click();
          break;

      }
  }

//   const emailVerify = await page.locator('.user__name input[type="text"]').textContent();
//   await expect(emailVerify).toEqual('anshika@gmail.com');
  await page.locator('a[class="btnn action__submit ng-star-inserted"]').click();
  const ordID = page.locator('label[class="ng-star-inserted"]');
  await ordID.waitFor();
  const orderID = await ordID.textContent();
  console.log(orderID);

  await page.locator("[routerlink*='myorders']").first().click();

  const table = page.locator("tbody tr");
  await table.first().waitFor();
  const tableList = await table.count();
  for(let k=0; k<tableList; k++)
  {
       visibleOrder = await table.nth(k).locator('th').textContent();
     
      if(orderID.includes(visibleOrder)){
        console.log(visibleOrder);
          

        await table.nth(k).locator('button').first().click();
        break;

      }
  }

 // await page.pause();

});

