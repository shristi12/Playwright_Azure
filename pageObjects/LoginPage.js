class LoginPage
{
constructor(page)
{
 this.page=page;
 this.email=page.getByPlaceholder('email@example.com');
 this.password=page.getByPlaceholder('enter your passsword');
 this.loginButton=page.getByRole('button',{name:"Login"});
}

async goToUrl()
{
    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
}

async validLogin(email,password)
{

  await this.email.fill(email);
  await this.password.fill(password);
  await this.loginButton.click();
  await this.page.waitForLoadState('networkidle');
}
}
module.exports={LoginPage};