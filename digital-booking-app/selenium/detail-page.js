/** @format */

const { Builder, Key, By, Capabilities } = require("selenium-webdriver");
const chromeCapabilities = Capabilities.chrome();
const asserts = require("assert");

async function TC_005() {
  chromeCapabilities.set("chromeOptions", { args: ["--headles"] });
  let driver = await new Builder()
    .forBrowser("chrome")
    .withCapabilities(chromeCapabilities)
    .build();

  await driver.get("http://www.digitalbooking.co/");
  await driver.manage().window().maximize();
  await driver.sleep(8000);

  //filter
  await driver.executeScript("window.scrollTo(0, 900)", "");
  await driver.findElement(By.className("card_button__vSk2w")).click();

  console.log("se clickeo correctamente");
  await driver.executeScript("window.scrollTo(0, -900)", "");
  await driver.sleep(5000);
  let headerProduct = await driver.findElement(By.id("product-detail-header"));
  asserts.strictEqual(await headerProduct.getText(), "Hotel Tequendama");
  console.log("h2 encontrado");
  await driver.sleep(3000);
  driver.quit();
}

TC_005();
