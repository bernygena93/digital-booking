/** @format */

const { Builder, Key, By, Capabilities } = require("selenium-webdriver");
const chromeCapabilities = Capabilities.chrome();
const asserts = require("assert");

async function TC_002() {
  chromeCapabilities.set("chromeOptions", { args: ["--headles"] });
  let driver = await new Builder()
    .forBrowser("chrome")
    .withCapabilities(chromeCapabilities)
    .build();

  await driver.get("http://www.digitalbooking.co/login");
  await driver.manage().window().maximize();
  await driver.sleep(1000);

  //Login
  await driver.sleep(1000);
  await driver
    .findElement(By.id("email"))
    .sendKeys("walter_93_gena@hotmail.com");
  await driver.findElement(By.id("password")).sendKeys("Wg123456");
  await driver.findElement(By.className("login_loginButton__Y1YcB")).click();
  await driver.sleep(2000);
  await driver.sleep(6000);
  driver.quit();
}

TC_002();
