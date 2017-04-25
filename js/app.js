'use strict'
import 'sammy'
import 'jquery'
import userController from 'js/controllers/userController.js'
import homeController from 'js/controllers/homeController.js'

var container = '#main';
var sammyApp = Sammy(container, function() {
    this.get('#/', function() {
        this.redirect('#/home');

    });

    this.get('#/home', homeController.all);
    this.get('#/register', userController.register);
    this.get('#/login', userController.login);
    this.get('#/logout', userController.logout);
});
sammyApp.run('#/');