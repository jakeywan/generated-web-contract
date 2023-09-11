const seeds = require('./seeds.js')
const puppeteer = require('puppeteer')



const takeScreenshots = async (index) => {
    
    console.log('running again', index)


    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    page.setViewport({ height: 720, width: 720, deviceScaleFactor: 2.5 })

    await page.goto(`https://web.leegte.org?id=${seeds[index]}`).catch(err => console.log('Error going to page:', err))
    await page.waitForSelector('.ui.visible')
    await page.$eval('.ui.visible', el => el.remove());
    await page.$eval('.ui-toggle-wrapper', el => el.remove());
    await page.waitForNetworkIdle({ idleTime: 1500 })
    await page.screenshot({path: `screenshots/${index}.png`})

    await browser.close()

    if (index < 999) {
        takeScreenshots(index + 1)

    }

    
}

takeScreenshots(540)