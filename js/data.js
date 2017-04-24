// data.js
import 'jquery'
import kinveyRequester from 'js/kinveyRequester.js'
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

function removeSessionKey() {
    sessionStorage.clear();
    // $('#welcome-msg').text('');
    // toastr.success('Logout successful.');
}

export default {
    users: {
        register: function(username, password) {
            return kinveyRequester.registerUser(username, password)
        },
        login: function(username, password) {
            return kinveyRequester.loginUser(username, password)
                .then(saveAuthInSession)

            // .then(function(userinfo) {
            //     saveAuthInSession(userInfo);
            //     return userinfo.username;
            // })

            // var authcode = encode(username, password),
            //     data = {
            //         username: username,
            //         authCode: authcode
            //     };

            // return requester.postJSON('/auth', data)
            //     .then(function(data) {
            //         setSessionKey(data.sessionKey);
            //         return data.username;
            //     })
        },

        logout: function() {
            return kinveyRequester.logoutUser()
                .then(function() {
                    sessionStorage.clear();
                    toastr.success('Log Out Success')
                });
        },

        current: function() {
            return getSessionKey();
        }
    },
    posts: {
        all: function() {
            // TODO: get query string
            return requester.get('/post');
        },
        add: function(title, body) {
            var data = { title, body },
                headers = { 'X-SessionKey': getSessionKey() };

            return requester.postJSON('/post', data, headers);
        }
    }
}