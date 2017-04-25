import 'jquery'

const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppId = 'kid_Hy3KFnDAg';
const kinveyAppSecret = 'fd84c6f5f613441b9025ec75538b808a';
const kinveyAppAuthHeaders = {
    Authorization: 'Basic ' + btoa(kinveyAppId + ':' + kinveyAppSecret),
    contentType: 'application/json'

};

function getKinveyUserAuthHeaders() {
    return {
        Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
    };
}
export default {


    loginUser: function(username, password) {
        return $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "user/" + kinveyAppId + "/login",
            headers: kinveyAppAuthHeaders,
            data: { username, password },
            // success: function(data) { resolve(data) },
            // error: function(err) { reject(err) }
        });
    },

    registerUser: function(username, password) {
        let userData = {
            username: username,
            password: password
        };
        return $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "user/" + kinveyAppId + "/",
            headers: kinveyAppAuthHeaders,
            data: { username, password },
            // success: function(data) { resolve(data) },
            // error: function(err) { reject(err) }
        });
    },




    logoutUser: function() {
        return $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "user/" + kinveyAppId + "/_logout",
            headers: getKinveyUserAuthHeaders(),
        });
    },

    // findAllBooks: function() {
    //     return $.ajax({
    //         method: "GET",
    //         url: kinveyBaseUrl + "appdata/" + kinveyAppId + "/books",
    //         headers: getKinveyUserAuthHeaders()
    //     });
    // },

    // findBookById,
    // function(bookId) {
    //     return $.ajax({
    //         method: "GET",
    //         url: kinveyBaseUrl + "appdata/" + kinveyAppId + "/books/" + bookId,
    //         headers: getKinveyUserAuthHeaders()
    //     });
    // },

    createBook: function(title, author, genre, price, url, description) {
        return $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "appdata/" + kinveyAppId + "/Books",
            headers: getKinveyUserAuthHeaders(),
            data: { title, author, genre, price, url, description }
        });
    },

    // editBook: function(bookId, title, author, description) {
    //     return $.ajax({
    //         method: "PUT",
    //         url: kinveyBaseUrl + "appdata/" + kinveyAppId + "/books/" + bookId,
    //         headers: getKinveyUserAuthHeaders(),
    //         data: { title, author, description }
    //     });
    // },

    // deleteBook: function(bookId) {
    //     return $.ajax({
    //         method: "DELETE",
    //         url: kinveyBaseUrl + "appdata/" + kinveyAppId + "/books/" + bookId,
    //         headers: getKinveyUserAuthHeaders()
    //     });
    // }
}