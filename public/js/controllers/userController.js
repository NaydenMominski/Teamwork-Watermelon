'use strict';
import 'jquery';

import data from 'js/data.js';
import templates from 'js/templates.js';



export default {
    login: function(context) {
        templates.load('login')
            .then(function(templateHtml) {
                context.$element().html(templateHtml);
            });
    },
    register: function(context) {
        templates.load('register')
            .then(function(templateHtml) {
                context.$element().html(templateHtml);
            });
    },

    logout: function() {

        data.users.logout()
            .then(function() {
                toastr.success(sessionStorage.getItem('username') + ' Log Out');
                sessionStorage.clear();

                $('#btn-navlogout').hide();
                $('#btn-navlogin').show();
                $('.cart_cur_block').hide();
                $('#welcome-msg').hide().text('');
                // context.redirect('#/home');
                window.location = window.location.origin + '#/home';
            })
            .catch(function() {
                toastr.error('No User to Log Out ');
            });

    },

    isUserLoggedIn: function() {
        let name = sessionStorage.getItem('username');

        if (!name) {
            return false;
        } else {
            return true;
        }
    },

    userEvent: function() {
        $('#main').on('click', '#btn-register', function(ev) {
            let username = $('#tb-reg-username').val(),
                password = $('#tb-reg-password').val(),
                firstname = $('#tb-reg-firstname').val(),
                lastname = $('#tb-reg-lastname').val(),
                email = $('#tb-reg-email').val(),
                repassword = $('#tb-reg-repassword').val();

            data.users.register(username, password, firstname, lastname, email, repassword)
                .then(function(data) {
                    $('#tb-reg-username').val('');
                    $('#tb-reg-password').val('');
                    $('#tb-reg-firstname').val('');
                    $('#tb-reg-lastname').val('');
                    $('#tb-reg-email').val('');
                    $('#tb-reg-repassword').val('');

                    toastr.success('Registered User');
                    // context.redirect('#/login');
                    window.location = window.location.origin + '#/login';
                })
                .catch(function(err) {
                    toastr.error('Error:Unregistered user');
                });
        });

        $('#main').on('click', '#btn-login', function(ev) {

            let username = $('#formLogin input[name=login-username]').val(),
                password = $('#formLogin input[name=login-passwd]').val();

            data.users.login(username, password)
                .then(function(response) {
                    $('#formLogin input[name=login-username]').val('');
                    $('#formLogin input[name=login-passwd]').val('');

                    $('#btn-navlogout').show();
                    $('#btn-navlogin').hide();
                    $('.cart_cur_block').show();

                    toastr.success('User Log In!', 'Welcome, ' + sessionStorage.getItem('username') + '!', { timeOut: 2000 });

                    $('#welcome-msg').show().text(`Welcome, ${sessionStorage.getItem('username')} !`);
                    // context.redirect('#/home');

                    window.location = window.location.origin + '#/books';
                }, function(error) {
                    toastr.error('Login unsuccessful!');

                });
        });


    }
};