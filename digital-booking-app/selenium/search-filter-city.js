/** @format */

const { Builder, Key, By, Capabilities } = require("selenium-webdriver");
const chromeCapabilities = Capabilities.chrome();
const asserts = require("assert");

async function TC_003() {
  chromeCapabilities.set("chromeOptions", { args: ["--headles"] });
  let driver = await new Builder()
    .forBrowser("chrome")
    .withCapabilities(chromeCapabilities)
    .build();

  await driver.get("http://www.digitalbooking.co/");
  await driver.manage().window().maximize();
  await driver.sleep(6000);

  //filter
  await driver
    .findElement(By.className("select_inputSelect__8w93M"))
    .sendKeys("Bogotá");

  await driver.findElement(By.className("search_buttonSearch__ND5_Y")).click();
  await driver.sleep(5000);
  await driver.executeScript("window.scrollTo(0, 1200)", "");

  let cityToCompare = await driver.findElement(By.id("Bogotá"));
  asserts.strictEqual(await cityToCompare.getText(), "Bogotá");
  console.log("Se filtro con exito");
  await driver.sleep(2000);
  driver.quit();
}

TC_003();
