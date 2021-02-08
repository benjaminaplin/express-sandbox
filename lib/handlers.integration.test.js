const portfinder = require('portfinder');
const puppeteer = require('puppeteer')

const app = require('../index.ts')

let server = null;
let port = 3000

beforeEach(async () => {
  port = await portfinder.getPortPromise()
  if(app){
    server = app.listen(port)
  }
})

afterEach(() => {
  server.close()
})

xit('home page links to about page', async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`http://localhost:3000`)
  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-test-id="about"]'),
  ])
  expect(page.url()).toBe(`http://localhost:${port}/about`)
  await browser.close()
})
