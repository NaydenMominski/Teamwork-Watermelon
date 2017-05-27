'use strict'
import 'jquery'

const kinveyBaseUrl = 'https://baas.kinvey.com/';
const kinveyAppId = 'kid_HyPtpJTCe';
const kinveyAppSecret = 'c80fcffa3bbe48b1bcceeafe6aa1ee1e';
const kinveyAppAuthHeaders = {
    Authorization: 'Basic ' + btoa(kinveyAppId + ':' + kinveyAppSecret),
    contentType: 'application/json'

};
// const proba = {
//     Authorization: 'Kinvey efa6dc3e-ffaf-4440-9eb2-6892c0586036.Z+SBnciTZHFrg6BXv3j1jPcEowI70VU0N6Hsn+SIza0=',
//     contentType: 'application/json'

// };

function getKinveyUserAuthHeaders() {
    return {
        Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
    };
}
export default {


    loginUser: function(username, password) {
        return $.ajax({
            method: 'POST',
            url: kinveyBaseUrl + 'user/' + kinveyAppId + '/login',
            headers: kinveyAppAuthHeaders,
            data: { username, password },
            // success: function(data) { resolve(data) },
            // error: function(err) { reject(err) }
        });
    },

    registerUser: function(username, password, firstname, lastname, email) {
        let userData = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            email: email,
            shopingcard: []

        };

        return $.ajax({
            method: 'POST',
            url: kinveyBaseUrl + 'user/' + kinveyAppId + '/',
            headers: kinveyAppAuthHeaders,
            data: JSON.stringify(userData),
            contentType: 'application/json'
                // success: function(data) { resolve(data) },
                // error: function(err) { reject(err) }
        });
    },
    logoutUser: function() {
        return $.ajax({
            method: 'POST',
            url: kinveyBaseUrl + 'user/' + kinveyAppId + '/_logout',
            headers: getKinveyUserAuthHeaders(),
        });
    },

    findAllBooks: function() {
        return $.ajax({
            method: 'GET',
            url: kinveyBaseUrl + 'appdata/' + kinveyAppId + '/books',
            headers: getKinveyUserAuthHeaders()
        });


    },
    getbookinfo: function(bookId) {
        // let bookId = '59007c34c8ad28df66075645';
        return $.ajax({
            method: 'GET',
            url: kinveyBaseUrl + 'appdata/' + kinveyAppId + '/books/' + bookId,
            headers: getKinveyUserAuthHeaders(),

        });
    },

    findUserBooks: function() {
        $.ajax({
            method: 'GET',
            url: kinveyBaseUrl + 'appdata/' + kinveyAppId + '/books',
            headers: getKinveyUserAuthHeaders()
        });

    },
    createBook: function(title, author, genre, price, url, description) {
        return $.ajax({
            method: 'POST',
            url: kinveyBaseUrl + 'appdata/' + kinveyAppId + '/books',
            headers: getKinveyUserAuthHeaders(),
            data: { title, author, genre, price, url, description }
        });
    },

    editBook: function(bookId, title, author, genre, price, url, description) {
        return $.ajax({
            method: 'PUT',
            url: kinveyBaseUrl + 'appdata/' + kinveyAppId + '/books/' + bookId,
            headers: getKinveyUserAuthHeaders(),
            data: { title, author, genre, price, url, description }
        });
    },
    deleteBook: function(bookId) {
        return $.ajax({
            method: 'DELETE',
            url: kinveyBaseUrl + 'appdata/' + kinveyAppId + '/books/' + bookId,
            headers: getKinveyUserAuthHeaders()
        });
    },
    sortBooksAscending: function(bySortingElement) {
        return $.ajax({
            method: 'GET',
            url: kinveyBaseUrl + 'appdata/' + kinveyAppId + '/books?query={}&sort=' + bySortingElement,
            headers: getKinveyUserAuthHeaders()
        });


    },
    getUserInfo: function(userId) {
        return $.ajax({
            method: 'GET',
            url: kinveyBaseUrl + 'user/' + kinveyAppId + '/' + userId,
            headers: getKinveyUserAuthHeaders(),
            contentType: 'application/json'

        });
    },
    editUserInfo: function(userId, newdata) {
        return $.ajax({
            method: 'PUT',
            url: kinveyBaseUrl + 'user/' + kinveyAppId + '/' + userId,
            headers: getKinveyUserAuthHeaders(),
            contentType: 'application/json',
            data: JSON.stringify(newdata)

        });
    },



};