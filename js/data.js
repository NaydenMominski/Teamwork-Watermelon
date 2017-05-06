'use strict'
// data.js
import 'jquery'
import kinveyRequester from 'js/kinveyRequester.js'
import validator from 'js/validator.js'
import utils from 'js/utils.js'
// import requester from 'js/requester.js'
// import cookie from 'js/cookie.js'


function saveAuthInSession(userInfo) {
    let userAuth = userInfo._kmd.authtoken;
    sessionStorage.setItem('authToken', userAuth);
    let userId = userInfo._id;
    sessionStorage.setItem('userId', userId);
    let username = userInfo.username;
    sessionStorage.setItem('username', username);

}

function getKinveyUserAuthHeaders() {
    return {
        Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
    };
}

// function encode(username, password) {
//     return sha1(username + password)
// }

// var cookieName = 'sessionKey';

// function setSessionKey(sessionKey) {
//     cookie.set(cookieName, sessionKey, 10);
// }

// function getSessionKey() {
//     return cookie.get(cookieName);
// }



export default {
    users: {
        register: function(username, password, firstname, lastname, email, repassword) {
            let errUserName = validator.lenght(username, 3, 40, "User Name")
            if (errUserName) {
                return Promise.reject(toastr.error(errUserName.message));
            }

            if (email != '') {
                let errEmail = validator.validateEmail(email);
                if (errEmail) {
                    return Promise.reject(toastr.error(errEmail.message));
                }
            }

            if (password != repassword) {
                return Promise.reject(toastr.error('Invalid Password'));
            }

            let errPass = validator.lenght(password, 3, 40, "Password")
            if (errPass) {

                return Promise.reject(toastr.error(errPass.message));
            }
            password = utils.encryptToSha1(password);
            return kinveyRequester.registerUser(username, password, firstname, lastname, email)
        },


        login: function(username, password) {
            password = utils.encryptToSha1(password);
            return kinveyRequester.loginUser(username, password)
                .then(saveAuthInSession);

        },

        logout: function() {
            return kinveyRequester.logoutUser();

        },
        getUserData: function(userId) {

            return kinveyRequester.getUserInfo(userId);
        },
        putUserInfo: function(userId, newdata) {
            return kinveyRequester.editUserInfo(userId, newdata);
        },
        // current: function() {
        //     return getSessionKey();
        // }
    },
    books: {
        all: function() {

            return kinveyRequester.findAllBooks();

        },
        bookinfo: function(bookId) {
            return kinveyRequester.getbookinfo(bookId);
        },

        createBook: function(title, author, genre, price, url, description) {
            let errTitle = validator.validateString(title, 1, 60, "Title");
            if (errTitle) {
                return Promise.reject(toastr.error(errTitle.message));
            }

            let errPrice = validator.validateNumber(price, "Price");
            if (errPrice) {
                return Promise.reject(toastr.error(errPrice.message));
            }
            price = Number(price).toFixed(2);

            if (url != '') {
                let error = validator.validateUrl(url);
                if (error) {
                    return Promise.reject(toastr.error.message);
                }
            }
            return kinveyRequester.createBook(title, author, genre, price, url, description);


        },
        bookForEdit: function(bookId, title, author, genre, price, url, description) {
            let errTitle = validator.validateString(title, 1, 60, "Title");
            if (errTitle) {
                return Promise.reject(toastr.error(errTitle.message));
            }

            let errPrice = validator.validateNumber(price, "Price");
            if (errPrice) {
                return Promise.reject(toastr.error(errPrice.message));
            }
            price = Number(price).toFixed(2);

            if (url != '') {
                let error = validator.validateUrl(url);
                if (error) {
                    return Promise.reject(toastr.error.message);
                }
            }
            return kinveyRequester.editBook(bookId, title, author, genre, price, url, description);
        },
        bookForDelete: function(bookId) {
            return kinveyRequester.deleteBook(bookId);
        },

    }
}