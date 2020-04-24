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

     while(layout !== "finished") {
         //await takeScreenshot(page, layouter);
         layout = layouter.nextLayout();
      }


    await page.close();
    await browser.close();
    console.log("Finished.")

}

async function takeScreenshot(page, layouter) {
    await page.goto("http://localhost:3333/");
    console.log("page loaded");
    //await page.screenshot({path: "./images/" + layouter.getFileName()});
    const element = await page.waitForSelector('#cytoscapeComponent');
    await element.screenshot({path: "./images/" + layouter.getFileName() +".png"});
}

module.exports = run;

run();

