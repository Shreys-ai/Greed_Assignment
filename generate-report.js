const reporter = require('cucumber-html-reporter');
const browser = process.env.BROWSER || 'Unknown'; // get from env

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber_report.json',
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    "Browser": browser,
    "Platform": process.platform,
    "Executed": "Jenkins"
  }
};

reporter.generate(options);