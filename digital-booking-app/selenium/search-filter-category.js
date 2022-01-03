/** @format */

const { Builder, Key, By, Capabilities } = require("selenium-webdriver");
const chromeCapabilities = Capabilities.chrome();
const asserts = require("assert");

async function TC_004() {
  chromeCapabilities.set("chromeOptions", { args: ["--headles"] });
  let driver = await new Builder()
    .forBrowser("chrome")
    .withCapabilities(chromeCapabilities)
    .build();

  await driver.get("http://www.digitalbooking.co/");
  await driver.manage().window().maximize();
  await driver.sleep(6000);

  //filter
  await driver.findElement(By.id("Departamentos")).click();

  await driver.sleep(2000);

  let categoryToCompare = await driver.findElement(By.id("Departamentos"));
  asserts.strictEqual(await categoryToCompare.getText(), "DEPARTAMENTOS");
  console.log("Se filtro con exito");
  await driver.sleep(2000);
  driver.quit();
}

TC_004();
