import { AppiumDriver, createDriver, SearchOptions } from "nativescript-dev-appium";

describe("Shared modal from home and back", () => {
    let driver: AppiumDriver;

    before(async () => {
        driver = await createDriver();
    });

    after(async () => {
        await driver.quit();
        console.log("Quit driver!");
    });

    afterEach(async function () {
        if (this.currentTest.state === "failed") {
            await driver.logScreenshot(this.currentTest.title);
        }
    });

    it ("should find home component", async () => {
        await assertComponent(driver, "HOME COMPONENT");
    });

    it("should open/close shared modal from home component", async () => {
        await openModal(driver);
        await closeModal(driver);
    });

    it ("should find home component again", async () => {
        await assertComponent(driver, "HOME COMPONENT");
    });
});

describe("Shared modal from second and back", () => {
    let driver: AppiumDriver;

    before(async () => {
        driver = await createDriver();
        await driver.resetApp();
    });

    after(async () => {
        await driver.quit();
        console.log("Quit driver!");
    });

    afterEach(async function () {
        if (this.currentTest.state === "failed") {
            await driver.logScreenshot(this.currentTest.title);
        }
    });

    it ("should find home component", async () => {
        await assertComponent(driver, "HOME COMPONENT");
    });

    it ("should navigate to second component", async() => {
        await navigateToSecondComponent(driver);
    });

    it ("should find second component", async () => {
        await assertComponent(driver, "SECOND COMPONENT");
    });

    it("should open/close shared modal from second component", async () => {
        await openModal(driver);
        await closeModal(driver);
    });

    it ("should find second component again", async () => {
        await assertComponent(driver, "SECOND COMPONENT");
    });
});

describe("Shared modal from different components", () => {
    let driver: AppiumDriver;

    before(async () => {
        driver = await createDriver();
        await driver.resetApp();
    });

    after(async () => {
        await driver.quit();
        console.log("Quit driver!");
    });

    afterEach(async function () {
        if (this.currentTest.state === "failed") {
            await driver.logScreenshot(this.currentTest.title);
        }
    });

    it ("should find home component", async () => {
        await assertComponent(driver, "HOME COMPONENT");
    });

    it("should open/close shared modal from home component", async () => {
        await openModal(driver);
        await closeModal(driver);
    });

    it ("should find home component again", async () => {
        await assertComponent(driver, "HOME COMPONENT");
    });

    it ("should navigate to second component", async() => {
        await navigateToSecondComponent(driver);
    });

    it ("should find second component", async () => {
        await assertComponent(driver, "SECOND COMPONENT");
    });

    it("should open/close shared modal from second component", async () => {
        await openModal(driver);
        await closeModal(driver);
    });

    it ("should find second component again", async () => {
        await assertComponent(driver, "SECOND COMPONENT");
    });

    it ("should navigate back to home component", async () => {
        await goBack(driver);
        await assertComponent(driver, "HOME COMPONENT");
    });

    it("should open/close shared modal from home component after manipulations with second", async () => {
        await openModal(driver);
        await closeModal(driver);
    });

    it ("should find home component again", async () => {
        await assertComponent(driver, "HOME COMPONENT");
    });
});

async function assertComponent(driver: AppiumDriver, message: string) {
    await driver.findElementByText(message, SearchOptions.exact);
}

async function navigateToSecondComponent(driver: AppiumDriver) {
    const navigateBtnTap = await driver.findElementByText("GO TO SECOND (TO OPEN SHARED MODAL)", SearchOptions.exact);
    await navigateBtnTap.click();
}

async function assertSecondComponent(driver: AppiumDriver) {
    await driver.findElementByText("SECOND COMPONENT", SearchOptions.exact);
}

async function openModal(driver: AppiumDriver) {
    const btnTap = await driver.findElementByText("SHOW SHARED MODAL", SearchOptions.exact);
    await btnTap.click();
}

async function closeModal(driver: AppiumDriver) {
    const closeBtnTap = await driver.findElementByText("CLOSE MODAL", SearchOptions.exact);
    await closeBtnTap.click();
}

async function goBack(driver: AppiumDriver) {
    const backBtnTap = await driver.findElementByText("GO BACK", SearchOptions.exact);
    await backBtnTap.click();
}
