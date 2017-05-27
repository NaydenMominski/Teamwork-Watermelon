'use strict';
// import 'sammy';
// import 'jquery';
import userController from 'js/controllers/userController.js';
import homeController from 'js/controllers/homeController.js';
import booksController from 'js/controllers/booksController.js';

let container = '#main';
let sammyApp = Sammy(container, function() {

    if (userController.isUserLoggedIn()) {
        $('#btn-navlogout').show();
        $('#btn-navlogin').hide();
        $('.cart_cur_block').show();
        $('#welcome-msg').show().text(`Welcome, ${sessionStorage.getItem('username')} !`);

    } else {
        $('#btn-navlogout').hide();
        $('#btn-navlogin').show();
        $('.cart_cur_block').hide();
    }


    this.get('#/', function() {
        this.redirect('#/home');

    });

    booksController.bookevent();
    userController.userEvent();


    this.get('#/home', homeController.all);
    this.get('#/register', userController.register);
    this.get('#/login', userController.login);
    this.get('#/logout', userController.logout);

    this.get('#/books', booksController.all);
    this.get('#/book/:bookID', booksController.showBookByID);
    this.get('#/books/:query', booksController.all);

    this.get('#/newbook', booksController.addbook);

    this.get('#/userbooks', booksController.userbooks);
    this.get('#/userbook/:bookID', booksController.showUserBookByID);
    this.get('#/userbooks/:query', booksController.userbooks);

    this.get('#/bookinfo', booksController.bookinfo);


});
sammyApp.run('#/');