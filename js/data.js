// data.js
import 'jquery'
import kinveyRequester from 'js/kinveyRequester.js'
import notifier from 'js/notifier.js'

// import requester from 'js/requester.js'
// import cookie from 'js/cookie.js'


function saveAuthInSession(userInfo) {
    let userAuth = userInfo._kmd.authtoken;
    sessionStorage.setItem('authToken', userAuth);
    let userId = userInfo._id;
    sessionStorage.setItem('userId', userId);
    let username = userInfo.username;
    sessionStorage.setItem('username', username);
    // $('#loggedInUser').text('Hello, ' + username + '!');
    // $('#loggedInUser').show();
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
        register: function(username, password) {
            return kinveyRequester.registerUser(username, password)
        },
        login: function(username, password) {
            return kinveyRequester.loginUser(username, password)
                .then(saveAuthInSession)

        },

        logout: function() {
            return kinveyRequester.logoutUser()

        },

        // current: function() {
        //     return getSessionKey();
        // }
    },
    // posts: {
    //     all: function() {
    //         // TODO: get query string
    //         return requester.get('/post');
    //     },
    //     add: function(title, body) {
    //         var data = { title, body },
    //             headers = { 'X-SessionKey': getSessionKey() };

    //         return requester.postJSON('/post', data, headers);
    //     }
    // }
}