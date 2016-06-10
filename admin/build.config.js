module.exports = {
    banner: {
        full: '/**!\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %>\n' +
        ' * <%= pkg.description %>\n' +
        ' *\n' +
        ' * (c) ' + new Date().getFullYear() + ' - <%= pkg.author %>\n' +
        ' * <%= pkg.license %> License' +
        ' * <%= pkg.repository.url %>\n' +
        ' *\n' +
        ' */\n\n',
        min: '/**!\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %>\n' +
        ' * <%= pkg.description %>\n' +
        ' *\n' +
        ' * (c) ' + new Date().getFullYear() + ' - <%= pkg.author %>\n' +
        ' * <%= pkg.license %> License' +
        ' * <%= pkg.repository.url %>\n' +
        ' *\n' +
        ' */\n\n'
    },
    port: 10001,
    paths: {
        input: 'src/**/*',
        output: '../public/admin/',
        server_path: '../public/'
    },
    js: {
        vendor: {
            input: [
                'vendor/jquery/dist/jquery.js',
                'vendor/angular/angular.js',
                'vendor/bootstrap/dist/js/bootstrap.js',
                'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
                'vendor/angular-bootstrap-show-errors/src/showErrors.js',
                'vendor/angular-cookies/angular-cookies.js',
                // 'vendor/angular-mocks/angular-mocks.js',
                'vendor/angular-ui-router/release/angular-ui-router.js',
                'vendor/angular-local-storage/dist/angular-local-storage.js',
                'vendor/angular-jwt/dist/angular-jwt.js',
                // 'vendor/angular-youtube-mb/dist/angular-youtube-embed.min.js',
                'vendor/angular-animate/angular-animate.js',
                'vendor/angular-sanitize/angular-sanitize.js',
                'vendor/angular-moment/angular-moment.js',
                'vendor/moment/min/moment.min.js',
                // 'vendor/angular-ui-mask/dist/mask.js',
                'vendor/angular-loading-bar/build/loading-bar.js',
                'vendor/angular-ui-notification/dist/angular-ui-notification.js',
                'vendor/angular-autodisable/src/angular-autodisable.js',
                'vendor/bootstrap-daterangepicker/daterangepicker.js',
                'vendor/ng-bs-daterangepicker/src/ng-bs-daterangepicker.js',
                // 'vendor/ng-file-upload-shim/ng-file-upload-shim.js', //no html5 browser support
                // 'vendor/ng-file-upload-shim/ng-file-upload.js'
            ],
            output: 'vendor.js'
        },
        files: {
            input: [
                'src/**/*.js',
                '!src/**/*.spec.js',
                '!src/**/*.scenario.js'
            ],
            output: '../public/admin/js/'
        }
    },
    less: {
        input: [
            'src/less/main.less',
            'src/common/**/*.less',
            'src/modules/**/*.less'
        ],
        output: '../public/admin/css/'
    },
    htaccess: {
        input: 'src/.htaccess',
        output: './.htaccess'
    },
    html: {
        input: 'src/index.html',
        output: './index.html',
        tpl: {
            output: 'templates.js',
            modules: 'src/modules/**/*.tpl.html',
            common: 'src/common/**/*.tpl.html'
        }
    },
    assets: {
        fonts: {
            input: ['src/assets/fonts/**/*.{ttf,woff,woff2,eof,eot}'],
            output: '../public/admin/assets/fonts/'
        },
        images: {
            input: ['src/assets/**/*.{png,gif,jpeg,jpg}'],
            output: '../public/admin/assets/'
        },
        favicons: {
            input: ['src/assets/favicon/*.{png,ico}'],
            output: '../public/admin/'
        },
        svg: {
            input: 'src/assets/**/*.svg',
            output: '../public/admin/assets/'
        }
    },
    docs: {
        input: 'src/docs/*.{html,md,markdown}',
        output: 'docs/',
        templates: 'src/docs/_templates/',
        assets: 'src/docs/assets/**'
    },
    test: {
        input: 'src/**/*.spec.js',
        karma: 'test/karma.conf.js',
        spec: 'test/spec/**/*.js',
        coverage: 'test/coverage/',
        results: 'test/results/'
    },
    placeholders: [
        {
            match: 'API_URL',
            replacement: process.env.API_URL + '/'
        }
    ]
};