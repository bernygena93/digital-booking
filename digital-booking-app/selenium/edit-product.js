/** @format */

const { Builder, Key, By, Capabilities } = require("selenium-webdriver");
const chromeCapabilities = Capabilities.chrome();
const asserts = require("assert");

async function TC_009() {
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
    .sendKeys("digitalbookingg7@gmail.com");
  await driver.findElement(By.id("password")).sendKeys("adminGrupo7");
  await driver.findElement(By.className("login_loginButton__Y1YcB")).click();
  await driver.sleep(2000);
  await driver.sleep(8000);

  await driver
    .findElement(By.className("listPanelProduct_updateButton__3OSl0"))
    .click();
  await driver.sleep(3000);
  await driver
    .findElement(By.xpath("//*[@id='nameProduct']"))
    .sendKeys("modificado");
  await driver.sleep(1000);
  await driver.executeScript("window.scrollTo(0,2500)", "");
  await driver.sleep(1000);
  await driver
    .findElement(By.xpath("//*[@id='root']/div/section/form/div[5]/button"))
    .click();
}

TC_009();
