const { Given, When, Then } = require('@cucumber/cucumber');
// let automationPage;

Given('User navigates to Automation Practice', () => {
    const automationPage = browser.page.automationPage();
    automationPage.userRedirectsToUrl();
    browser.pause(20000);
})

Then('User validates the Page Title', async () => {
    // if want to declare in step def then call with this way ->     // browser.assert.titleEquals()
    const automationPage = browser.page.automationPage();
    automationPage.validatePageTitle('Automation Practice - Ultimate QA');
    console.log('Title is \\"Automation Practice - Ultimate QA\\"');
})

Then('User validates all link is working and redirect to proper URL', async () => {
    const automation = browser.page.automationPage();
    await automation.validateAllLinks();

    // browser.pause(2000);
    // const buttonsElement = browser.element.findAll('a[href]');
    // const buttons = await buttonsElement;

    // for (const element of buttons) {
    //     const href = await element.getAttribute('href');
    //     const response = await fetch(href);
    //     if (response.status == 200) {
    //         console.log("this is valid url " + href)
    //     } else {
    //         console.log("❌❌❌❌ Invalid url " + href)
    //     }
    // }
})

When('User Fetches JS\\/console error on browser developer tools', async () => {
    const automation = browser.page.automationPage();
    const value = await automation.getBrowserLogs();
    console.log(value);
});