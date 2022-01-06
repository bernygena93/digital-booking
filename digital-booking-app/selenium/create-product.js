/** @format */

const { Builder, Key, By, Capabilities } = require("selenium-webdriver");
const chromeCapabilities = Capabilities.chrome();
const asserts = require("assert");

async function TC_008() {
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
  await driver.findElement(By.id("email")).sendKeys("*********");
  await driver.findElement(By.id("password")).sendKeys("********");
  await driver.findElement(By.className("login_loginButton__Y1YcB")).click();
  await driver.sleep(2000);
  await driver.sleep(6000);

  //create-product
  await driver
    .findElement(By.className("administrationPanel_buttonCreate__3_0pW"))
    .click();
  await driver.sleep(4000);
  await driver.findElement(By.id("nameProduct")).sendKeys("Hotel Selenium");
  await driver.findElement(By.id("address")).sendKeys("Av Siempre Viva 123");
  await driver.sleep(1000);
  await driver
    .findElement(
      By.xpath("//*[@id='root']/div/section/form/div[1]/label[2]/div[1]/input")
    )
    .click();
  await driver.sleep(1000);
  await driver.findElement(By.className("select_options__1GBZm")).click();
  await driver.sleep(1000);
  await driver
    .findElement(
      By.xpath("//*[@id='root']/div/section/form/div[1]/label[4]/div[1]/input")
    )
    .click();
  await driver.sleep(1000);
  await driver
    .findElement(By.xpath("//*[@id='adminProduct_citySelect__2Asgt']/li[1]"))
    .click();
  await driver.sleep(1000);
  await driver.executeScript("window.scrollTo(0,200)", "");
  await driver
    .findElement(By.className("inputDescription_inputDescription__7Yer2"))
    .sendKeys("Bienvenidos a hotel selenium donde nada puede malir sal");
  await driver.sleep(1000);
  await driver.executeScript("window.scrollTo(0,550)", "");
  await driver.sleep(1000);
  await driver.findElement(By.id("1")).click();
  await driver.findElement(By.id("3")).click();
  await driver.findElement(By.id("5")).click();
  await driver.sleep(1000);
  await driver.executeScript("window.scrollTo(0,800)", "");
  await driver.sleep(1000);
  await driver
    .findElement(By.id("Normas de la casa description"))
    .sendKeys("Se acepan mascotas");
  await driver.executeScript("window.scrollTo(0,900)", "");
  await driver.sleep(1000);
  await driver
    .findElement(By.id("Salud y seguridad description"))
    .sendKeys(
      "Es Obligatorio el uso de tapabocas dentro de las instalalaciones"
    );
  await driver.executeScript("window.scrollTo(0,1000)", "");
  await driver.sleep(1000);
  await driver
    .findElement(By.id("Política de cancelación description"))
    .sendKeys("Se aceptan cancelaciones hasta 48hs antes del Check-In");
  await driver.sleep(1000);
  await driver.executeScript("window.scrollTo(0,1050)", "");
  await driver.findElement(By.id("title")).sendKeys("Selenium 1");
  await driver.sleep(1000);
  await driver.sleep(1000);
  await driver
    .findElement(By.id("image"))
    .sendKeys(
      "https://exp.cdn-hotels.com/hotels/12000000/11690000/11681100/11681055/0a7423bb_z.jpg?impolicy=fcrop&w=500&h=333&q=medium"
    );
  await driver.sleep(1000);
  await driver
    .findElement(By.className("adminProduct_buttonAddAdminProduct__2jDc8"))
    .click();
  await driver.sleep(3000);
  await driver.executeScript("window.scrollTo(0,2500)", "");
  await driver
    .findElement(By.className("adminProduct_buttonSubmitAdminProduct__3Uau3"))
    .click();
}

TC_008();
