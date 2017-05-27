'use strict'
System.config({
    transpiler: 'plugin-babel',
    map: {
        // System.js files
        'plugin-babel': 'libs/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'libs/systemjs-plugin-babel/systemjs-babel-browser.js',
        'text': 'libs/systemjs-plugin-text/text.js',

        // App files
        'app': 'js/app.js',
        'kinveyRequester': 'js/kinveyRequester.js',
        'data': 'js/data.js',
        'userController': 'js/controllers/userController.js',
        'homeController': 'js/controllers/homeController.js',
        'booksController': 'js/controllers/booksController.js',
        'templates': './js/templates.js',
        'validator': './js/validator.js',
        'utils': './js/utils.js',


        // Library files

        'jquery': 'libs/jquery/dist/jquery.js',
        'handlebars': 'libs/handlebars/dist/handlebars.min.js',
        'sammy': '/libs/sammy/lib/sammy.js',
        // 'sha1': 'libs/js-sha1/src/sha1.js',
        'toastr': "libs/toastr/toastr.js",
        'cryptojs': 'libs/crypto-js/crypto-js.js'
    }
});

System.import('app');