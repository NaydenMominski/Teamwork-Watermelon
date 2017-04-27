import 'jquery'

import data from 'js/data.js'
import templates from 'js/templates.js'
import validator from 'js/validator.js'
import notifier from 'js/notifier.js'


export default {
    login: function() {
        templates.load('login')
            .then(function(templateHtml) {
                $('#main').html(templateHtml());
            });


    },
    register: function() {
        templates.load('register')
            .then(function(templateHtml) {
                $('#main').html(templateHtml());
            });
    },

    logout: function() {
        $('#btn-navlogout').click(function() {
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
        });
    },

    isUserLoggedIn: function() {
        var name = sessionStorage.getItem('username');

        if (!name) {
            return false;
        } else {
            return true;
        }
    },

    userEvent: function() {
        $('#main').on('click', '#btn-register', function(ev) {
            var username = $('#tb-reg-username').val(),
                password = $('#tb-reg-password').val();

            validator.lenght(password, 1, 40)
                .then(function() {
                    return data.users.register(username, password);
                })
                .then(function(data) {
                    $('#tb-reg-username').val('');
                    $('#tb-reg-password').val('');
                    toastr.success('User Registered');
                    // context.redirect('#/login');
                    window.location = window.location.origin + '#/login';
                })
                .catch(function(err) {
                    toastr.error('Error');
                });
        });

        $('#main').on('click', '#btn-login', function(ev) {

            var username = $('#formLogin input[name=login-username]').val(),
                password = $('#formLogin input[name=login-passwd]').val();

            validator.lenght(password, 1, 40)
                .then(function() {
                    return data.users.login(username, password)
                })
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
                    toastr.error('LogIn unsuccessful!');
                    // context.redirect('#/home');
                    window.location = window.location.origin + '#/books';
                });
        });



    }
};