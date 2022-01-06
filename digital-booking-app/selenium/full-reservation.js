/** @format */

const { Builder, Key, By, Capabilities } = require("selenium-webdriver");
const chromeCapabilities = Capabilities.chrome();
const asserts = require("assert");

async function TC_006() {
  chromeCapabilities.set("chromeOptions", { args: ["--headles"] });
  let driver = await new Builder()
    .forBrowser("chrome")
    .withCapabilities(chromeCapabilities)
    .build();

  await driver.get("http://www.digitalbooking.co/login");
  await driver.manage().window().maximize();
  await driver.sleep(3000);

  //login
  await driver.sleep(1000);
  await driver.findElement(By.id("email")).sendKeys("********");
  await driver.findElement(By.id("password")).sendKeys("********");
  await driver.findElement(By.className("login_loginButton__Y1YcB")).click();
  await driver.sleep(2000);
  await driver.sleep(4000);

  //select product
  await driver.executeScript("window.scrollTo(0, 900)", "");
  await driver.sleep(2000);
  await driver.findElement(By.className("card_cardButton__81xei")).click();
  await driver.sleep(4000);
  await driver.executeScript("window.scrollTo(0, -900)", "");
  await driver.executeScript("window.scrollTo(0, 1400)", "");
  await driver.sleep(2000);

  //booking start
  await driver
    .findElement(By.className("productCalendar_buttonCalendar__1O_QX"))
    .click();
  await driver.sleep(4000);
  //===============================================
  //complete booking form
  await driver.findElement(By.id("name")).sendKeys("Walter");
  await driver.findElement(By.id("lastName")).sendKeys("Genario");
  await driver.findElement(By.id("city")).sendKeys("Lujan");
  await driver
    .findElement(By.id("email"))
    .sendKeys("walter_93_gena@hotmail.com");
  //===============================================
  //select booking dates
  await driver.executeScript("window.scrollTo(0, 500)", "");
  await driver.sleep(2000);

  //select checkIn
  await driver
    .findElement(
      By.xpath(
        "//*[@id='root']/div/form/div/div[1]/div[2]/div/div/div/div/div[2]/div[1]/div[2]/div[6]/div[1]/span"
      )
    )
    .click();

  //select checkOut
  await driver
    .findElement(
      By.xpath(
        "//*[@id='root']/div/form/div/div[1]/div[2]/div/div/div/div/div[2]/div[1]/div[2]/div[6]/div[6]/span"
      )
    )
    .click();
  //select time
  await driver.executeScript("window.scrollTo(0, 800)", "");
  await driver.sleep(2000);
  await driver
    .findElement(By.className("booking_selectHour__1bcTf"))
    .sendKeys("10:00 AM");
  await driver.sleep(2000);
  //===============================================
  //confirm booking
  await driver.executeScript("window.scrollTo(0, 1200)", "");
  await driver.sleep(2000);
  await driver
    .findElement(By.className("booking_buttonBooking__168X9"))
    .click();
  await driver.sleep(2000);
  //confirm data
  await driver
    .findElement(By.className("confirmBooking_acceptButton__14-_3"))
    .click();
  //===============================================
  //booking process correct
  let cardConfirmation = await driver.findElement(
    By.xpath("//*[@id='root']/div/div[3]/div/h2")
  );
  asserts.strictEqual(await cardConfirmation.getText(), "¡Muchas gracias!");
  await driver.sleep(2000);
  //===============================================
  driver.quit();
}

TC_006();
