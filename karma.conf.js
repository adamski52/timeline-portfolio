// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require('karma-jasmine'),
            require('karma-spec-reporter'),
            require('karma-phantomjs-launcher'),
            require('karma-remap-istanbul'),
            require('@angular/cli/plugins/karma')
        ],
        proxies: {
            "/api/repos/adamski52/lol/contents/thumbnail.png": "/base/test-assets/thumbnail.png"
        },
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        files: [
            {pattern: './src/test.ts', watched: false},
            {pattern: './test-assets/**', included: false, served: true, watched: false}
        ],
        preprocessors: {
            './src/test.ts': ['@angular/cli']
        },
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        remapIstanbulReporter: {
            reports: {
                html: 'coverage',
                lcovonly: './coverage/coverage.json'
            }
        },
        angularCli: {
            environment: 'dev',
            config: './angular-cli.json'
        },
        specReporter: {
            suppressSkipped: true,
            maxLogLines: 5,
            lateReport: true
        },
        reporters: ['spec', 'karma-remap-istanbul'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    });
};
