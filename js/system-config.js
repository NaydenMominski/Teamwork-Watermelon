'use strict'
System.config({
    transpiler: 'plugin-babel',
    map: {
        // System.js files
        'plugin-babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'text': 'node_modules/systemjs-plugin-text/text.js',

        // App files
        'app': 'js/app.js',
        // 'myRouter': 'js/myRouter.js',
        'kinveyRequester': 'js/kinveyRequester.js',
        'data': 'js/data.js',
        'userController': 'js/controllers/userController.js',
        'homeController': 'js/controllers/homeController.js',
        'booksController': 'js/controllers/booksController.js',
        'templates': './js/templates.js',
        'validator': './js/validator.js',
        'utils': './js/utils.js',

        // templates
        // 'homeTemplate': 'templates/home.handlebars',

        // Library files

        'jquery': 'bower_components/jquery/dist/jquery.js',
        'handlebars': 'bower_components/handlebars/handlebars.js',
        'sammy': '/bower_components/sammy/lib/sammy.js',
        'sha1': 'bower_components/js-sha1/src/sha1.js',
        'toastr': "bower_components/toastr/toastr.js",
        'cryptojs': 'bower_components/crypto-js/crypto-js.js'
    }
});

System.import('app');