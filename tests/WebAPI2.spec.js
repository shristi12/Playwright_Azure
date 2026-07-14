const {test, expect}=require('@playwright/test')

let webContext;

test.beforeAll(async({browser})=>
{
 const context=await browser.newContext();
 const page=await context.newPage();
 await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.getByPlaceholder('email@example.com').fill('shristi.vats01@gmail.com');
  await page.getByPlaceholder('enter your passsword').fill('Welcome@2021');
  await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await context.storageState({path:'state.json'});
   webContext=await browser.newContext({storageState:'state.json'});
})

test('@API first test', async () =>
{
  const productName='ZARA COAT 3';  
  const page=await webContext.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  const products= page.locator('.card-body')
 
   await page.locator(".card-body b").first().waitFor();
  const title=await page.locator('.card-body b').allTextContents();
  const count=await products.count();
  for(let i=0;i<count;i++)
    {
      if(await products.nth(i).locator('b').textContent()===productName)
      {
        await products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    } 


    await page.locator('[routerlink*="cart"]').click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h3:has-text("ZARA COAT 3")')).toBeVisible();
    await page.locator('.totalRow button').waitFor();
    await page.locator('.totalRow button').click();
    await page.locator('[placeholder*="Country"]').type('ind',{delay:100});
    const dropdown=page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount=await dropdown.locator('button').count();
    for(let i=0;i<optionsCount;i++)
    {
      const text=await dropdown.locator('button').nth(i).textContent();
      if(text.trim()==='India')
      {
        await dropdown.locator('button').nth(i).click();
        console.log('Selected country is '+text);
        break;
      }
    }

    await page.locator('.action__submit').click();
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    // page.pause();
  
});