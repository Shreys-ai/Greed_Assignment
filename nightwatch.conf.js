// https://nightwatchjs.org/gettingstarted/configuration/

// const { firefox } = require("nightwatch");

module.exports = {
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  src_folders: ['test'],

  // See https://nightwatchjs.org/guide/concepts/page-object-model.html
  page_objects_path: ['page_objects'],

  // See https://nightwatchjs.org/guide/concepts/test-globals.html
  globals_path: '',

  webdriver: {},

  test_workers: {
    enabled: true
  },

  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: 'http://localhost',

      screenshots: {
        enabled: false,
        path: 'screens',
        on_failure: true
      },

      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          // w3c:false,
          args: ['--disable-gpu', '--remote-debugging-port=9222']
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          // args: [
          //'--no-sandbox',
          //'--ignore-certificate-errors',
          //'--allow-insecure-localhost',
          //'--headless=new'
          // ]
        },
        loggingPrefs: {
          performance: 'ALL',
          browser: 'ALL'
        }
      },

      webdriver: {
        start_process: true,
        server_path: ''
      },

      test_runner: {
        // https://nightwatchjs.org/guide/writing-tests/using-cucumberjs.html
        type: 'cucumber',

        options: {
          feature_path: 'test/features/nightwatch/',
          require: [
            'features/nightwatch/step_definitions/*.js'],
          auto_start_session: true,
          parallel: 2
        }
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: false,
          args: ['--disable-gpu', '--remote-debugging-port=9222']
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          // args: [
          //'--no-sandbox',
          //'--ignore-certificate-errors',
          //'--allow-insecure-localhost',
          //'--headless=new'
          // ]
        },
        loggingPrefs: {
          performance: 'ALL',
          browser: 'ALL'
        }
      },

      webdriver: {
        start_process: true,
        server_path: '',
        port: 9515,
        cli_args: [
          // --verbose
        ]
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          log: { level: 'trace' },
          args: ['-devtools', '-console']
        }
      },
      loggingPrefs: {
        performance: 'ALL',
        browser: 'ALL'
      },
      webdriver: {
        start_process: true,
        server_path: require('geckodriver').path,
        log_path: './logs/geckodriver.log'  // 👈 stores logs in a file
      }
    },

    //////////////////////////////////////////////////////////////////////////////////
    // Configuration for using the browserstack.com cloud service                    |
    //                                                                               |
    // Please set the username and access key by setting the environment variables:  |
    // - BROWSERSTACK_USERNAME                                                       |
    // - BROWSERSTACK_ACCESS_KEY                                                     |
    // .env files are supported                                                      |
    //////////////////////////////////////////////////////////////////////////////////
    browserstack: {
      selenium: {
        host: 'hub.browserstack.com',
        port: 443
      },
      // More info on configuring capabilities can be found on:
      // https://www.browserstack.com/automate/capabilities?tag=selenium-4
      desiredCapabilities: {
        'bstack:options': {
          userName: process.env.BROWSERSTACK_USERNAME,
          accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
          os: 'Windows',
          osVersion: '11',
        }
      },

      disable_error_log: true,
      webdriver: {
        timeout_options: {
          timeout: 60000,
          retry_attempts: 3
        },
        keep_alive: true,
        start_process: false
      }
    },

    'browserstack.local': {
      extends: 'browserstack',
      desiredCapabilities: {
        'browserstack.local': true
      }
    },

    'browserstack.chrome': {
      extends: 'browserstack',
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: true
        }
      }
    },

    'browserstack.local_chrome': {
      extends: 'browserstack.local',
      desiredCapabilities: {
        browserName: 'chrome'
      }
    },

  },

  usage_analytics: {
    enabled: true,
    log_path: './logs/analytics',
    client_id: '019cf9f4-3686-4a6b-974b-9f9863ea6c67'
  }

};
