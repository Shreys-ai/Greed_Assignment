

module.exports = {
  url: 'https://ultimateqa.com/automation',

  elements: {
    allLinks: {
      selector: 'a[href]',
      locateStrategy: 'css selector'
    }
  },

  commands: [{
    async userRedirectsToUrl() {
      this.navigate();
      return this.api.window.maximize();
    },


    async validatePageTitle(expectedText) {
      const title = await this.api.getTitle();
      console.log("title is "+ title)
      // this.api.assert.equal(title, string);
      return this.assert.titleEquals(expectedText);
    },

    async validateAllLinks() {
      await this.api.pause(2000);
      const elements = await this.api.element.findAll('@allLinks');
      const links = await elements;

      for (const element of links) {
        try {
          const href = await element.getAttribute('href');
          const response = await fetch(href);
          if (response.status === 200) {
            console.log("This is a valid URL: " + href);
          } else {
            console.log("❌❌❌ Invalid URL: " + href);
          }
        } catch (err) {
          console.log("Error fetching " + err.message);
        }
      }
    },

    async getBrowserLogs() {
      const logs = this.api.getLog('browser');
      return await logs;
    }
  }]
};
