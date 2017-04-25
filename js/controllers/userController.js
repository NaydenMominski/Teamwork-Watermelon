import 'jquery'

import data from 'js/data.js'
import templates from 'js/templates.js'
import validator from 'js/validator.js'
import notifier from 'js/notifier.js'


export default {
    login: function(username, password) {
        templates.load('login')
            .then(function(templateHtml) {
                $('#main').html(templateHtml);
            });
        $('#main').on('click', '#btn-login', function(ev) {

            var username = $('#formLogin input[name=login-username]').val(),
                password = $('#formLogin input[name=login-passwd]').val();

            validator.lenght(password, 1, 40)
                .then(function() {
                    return data.users.login(username, password)
                })
                .then(function(data) {
                    $('#formLogin input[name=login-username]').val('');
                    $('#formLogin input[name=login-passwd]').val('');

                    $('#btn-navlogout').show();
                    $('#btn-navlogin').hide();
                    $('.top-cart-contain').show();

                    toastr.success('User Log In!', 'Welcome, ' + sessionStorage.getItem('username') + '!', { timeOut: 2000 });
                })
                .catch(function(err) {
                    toast.error("ERROR");
                });

        });
    },
    register: function(username, password) {
        templates.load('register')
            .then(function(templateHtml) {
                $('#main').html(templateHtml);
            });
        $('#main').on('click', '#btn-register', function(ev) {
            var username = $('#tb-reg-username').val(),
                password = $('#tb-reg-password').val();

            validator.lenght(password, 1, 40)
                .then(function() {
                    return data.users.register(username, password)
                })
                .then(function(data) {
                    $('#tb-reg-username').val('');
                    $('#tb-reg-password').val('');
                    toastr.success('User' + sessionStorage.getItem('username') + 'registered');
                })
                .catch(function(err) {
                    toastr.error('Error');
                });

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
                    $('.top-cart-contain').hide();
                })
                .catch(function() {
                    toastr.error('No User to Log Out ');
                }); // .then(function(data) {
            //     notifier.success('Logged out');
            // window.location = window.location.origin;
            // })
            // .catch(function(err) {
            //     notifier.error(err);
            // });

        });
    },
    posts: {

    }
}