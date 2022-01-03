/** @format */

const { Builder, Key, By, Capabilities } = require("selenium-webdriver");
const chromeCapabilities = Capabilities.chrome();
const asserts = require("assert");

async function TC_001() {
  chromeCapabilities.set("chromeOptions", { args: ["--headles"] });
  let driver = await new Builder()
    .forBrowser("chrome")
    .withCapabilities(chromeCapabilities)
    .build();

  await driver.get("http://www.digitalbooking.co/register");
  await driver.manage().window().maximize();
  await driver.sleep(1000);

  //Register
  await driver.findElement(By.id("name")).sendKeys("Pepe");
  await driver.findElement(By.id("lastName")).sendKeys("Muleiro");
  await driver.findElement(By.id("email")).sendKeys("pepe@gmail.com");
  await driver.sleep(300);
  await driver.executeScript("window.scrollTo(0, 200)", "");
  await driver.findElement(By.id("password")).sendKeys("Pm123456");
  await driver.findElement(By.id("password2")).sendKeys("Pm123456");
  await driver.sleep(1000);
  await driver
    .findElement(By.className("register_createAccountButton__1yozG"))
    .click();
  await driver.sleep(6000);
  driver.quit();
}

TC_001();
