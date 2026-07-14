const{test, expect}=require('@playwright/test')

test('calendar validation',async ({page})=>{

    const monthNum="6";
    const date='15';
    const year='2024';
    await page.goto('https://rahulshettyacademy.com/seleniumPractice/#/offers');
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(monthNum-1)).click();
    await page.locator("//abbr[text()='15']").click();

})