//AJAX const
const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppId = 'kid_Hy3KFnDAg';
const kinveyAppSecret = 'fd84c6f5f613441b9025ec75538b808a';
const kinveyAppAuthHeaders = {
    Authorization: 'Basic ' + btoa(kinveyAppId + ':' + kinveyAppSecret),
    contentType: 'application/json'
};



function loginUser(e) {
    e.preventDefault();
    let userData = {
        username: $('#formLogin input[name=login-username]').val(),
        password: $('#formLogin input[name=login-passwd]').val()
    };
    $.ajax({
        url: kinveyBaseUrl + 'user/' + kinveyAppId + '/login',
        method: 'POST',
        headers: kinveyAppAuthHeaders,
        data: userData,
        success: loginSuccess,
        error: handleAjaxError
    });

    $('#formLogin input[name=login-username]').val('');
    $('#formLogin input[name=login-passwd]').val('');

    function loginSuccess(userInfo) {
        saveAuthInSession(userInfo);
        toastr.success('User LogIn!', 'Welcome, ' + sessionStorage.getItem('username') + '!', { timeOut: 5000 });
        // context.redirect('#/');
        // document.location.reload(true);
        $('#welcome-msg').text(`Welcome, ${sessionStorage.getItem('username')} !`);
    }
}

function registerUser(e) {
    e.preventDefault();
    let userData = {
        username: $('#tb-reg-username').val(),
        password: $('#tb-reg-password').val()
    };

    $.ajax({
        method: "POST",
        url: kinveyBaseUrl + "user/" + kinveyAppId + "/",
        headers: kinveyAppAuthHeaders,
        data: userData,
        success: registerSuccess,
        error: handleAjaxError
    });

    $('#tb-reg-username').val('');
    $('#tb-reg-password').val('');

    function registerSuccess(userInfo) {
        saveAuthInSession(userInfo);
        toastr.success('User registered!', 'Welcome, ' + sessionStorage.getItem('username') + '!', { timeOut: 5000 });
    }

}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response);
    if (response.readyState === 0) {
        errorMsg = "Cannot connect due to network error.";
    } else if (response.responseJSON &&
        response.responseJSON.description) {
        errorMsg = response.responseJSON.description;
    } else {
        errorMsg = response.status + ' (' + response.statusText + ')';
    }
    toastr.error(errorMsg);
}

function logoutUser() {
    sessionStorage.clear();
    $('#loggedInUser').text('');
    context.redirect('#/');
    document.location.reload(true);
    toastr.success('Logout successful.');
}

function saveAuthInSession(userInfo) {
    let userAuth = userInfo._kmd.authtoken;
    sessionStorage.setItem('authToken', userAuth);
    let userId = userInfo._id;
    sessionStorage.setItem('userId', userId);
    let username = userInfo.username;
    sessionStorage.setItem('username', username);
    $('#loggedInUser').text('Hello, ' + username + '!');
    $('#loggedInUser').show();
}

function getKinveyUserAuthHeaders() {
    return {
        Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
    };
}