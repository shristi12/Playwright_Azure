const {test, expect}=require('@playwright/test')

test('first test', async ({browser}) =>
{
  const context=await browser.newContext();
  const page=await context.newPage();
  await page.goto('https://rahulshettyacademy.com/angularpractice/shop');
  const title=await page.locator('[class="card-body"] a').allTextContents();
  //await page.locator('[class="card-body"] a').first().click();
  for(const t of title)
  {
    console.log(t);
  }
});

test('first test without context', async ({page}) =>
{
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator("[type='password']").fill('learning');
  await page.locator('#signInBtn').click();
  console.log(await page.locator('[style*="block"]').textContent());
  await expect(await page.locator('[style*="block"]')).toContainText('Incorrect');
  const blinkText= page.locator('[href*="documents-request"]');
 await expect(blinkText).toHaveAttribute('class','blinkingText');
});

test('tab control', async ({browser}) =>
{
  const context=await browser.newContext();
  const page=await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  
  const documentLink= page.locator('[href*="documents-request"]');

  const[newPage]= Promise.all(
[
 context.waitForEvent('page'),
 await documentLink.click(),
 ]);

 newPage.waitForLoadState();
 console.log(await newPage.locator('.red').textContent());
 });

 test('screen shot validation', async ({browser}) =>
{
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await expect(page.locator('#displayed-text')).toBeVisible();  
  await page.locator('#displayed-text').screenshot({path:'element.png'});
  await page.locator('#hide-textbox').click();
  await page.screenshot({path:'screenshot.png'});
  await expect(page.locator('#displayed-text')).toBeHidden();

 });
 