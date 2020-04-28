const puppeteer = require('puppeteer');
const Layouter = require('./Layouter');

async function run() {
    const layouter = new Layouter().getInstance();
    let layout = layouter.currentLayout();

    const browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    while (layout !== "finished") {
        await takeScreenshot(page, layouter);
        layout = layouter.nextLayout();
    }

    await page.close();
    await browser.close();
    console.log("Finished.")

}

async function takeScreenshot(page, layouter) {
    await page.goto("http://localhost:3333/");
    await page.waitForSelector('#cyCanvas');
    const element = await page.waitForSelector('#cytoscapeComponent');
    const fileName = layouter.getFileName() + ".png";
    await element.screenshot({path: "./images/" + fileName});
    console.log("Saved file " + fileName);
}

module.exports = run;

run();

