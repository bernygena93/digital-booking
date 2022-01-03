/** @format */

const { Builder, Key, By, Capabilities } = require("selenium-webdriver");
const chromeCapabilities = Capabilities.chrome();
const asserts = require("assert");

async function TC_007() {
  chromeCapabilities.set("chromeOptions", { args: ["--headles"] });
  let driver = await new Builder()
    .forBrowser("chrome")
    .withCapabilities(chromeCapabilities)
    .build();

  await driver.get("http://www.digitalbooking.co/");
  await driver.manage().window().maximize();
  await driver.sleep(7000);

  //select product
  await driver.executeScript("window.scrollTo(0, 900)", "");
  await driver.findElement(By.className("card_cardButton__81xei")).click();
  console.log("select product ok");
  await driver.sleep(4000);
  await driver.executeScript("window.scrollTo(0, -900)", "");
  await driver.executeScript("window.scrollTo(0, 1400)", "");
  //booking init
  await driver
    .findElement(By.className("productCalendar_buttonCalendar__1O_QX"))
    .click();
  console.log("booking init ok");
  await driver.sleep(4000);
  let headerProduct = await driver.findElement(
    By.className("login_messageLogin__3xMt6")
  );
  asserts.strictEqual(
    await headerProduct.getText(),
    "Para realizar una reserva necesitás estar logueado."
  );
  driver.quit();
}

TC_007();
