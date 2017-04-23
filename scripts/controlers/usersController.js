var usersController = function() {

    //   function all(context) {
    //     var users;
    //     data.users.get()
    //       .then(function(resUsers) {
    //         users = resUsers;
    //         return templates.get('users');
    //       })
    //       .then(function(template) {
    //         context.$element().html(template(users));
    //         $('.btn-add-friend').on('click', function() {
    //           var id = $(this).parents('.user-box').attr('data-id');
    //           data.friends.sentRequest(id);
    //         });
    //       });
    //   }

    function register(context) {
        templates.get('register')
            .then(function(template) {
                context.$element().html(template());

                $('#btn-register').on('click', registerUser)
            });
    }

    function login(context) {
        templates.get('login')
            .then(function(template) {
                context.$element().html(template());

                $('#create-account').on('click', function() {
                    context.redirect('#/users/register');
                });
                $('#btn-login').on('click', loginUser);


                // $('#btn-register').on('click', function() {
                //   var user = {
                //     username: $('#tb-reg-username').val(),
                //     password: $('#tb-reg-pass').val()
                //   };

                //   data.users.register(user)
                //     .then(function() {
                //       toastr.success('User registered!');
                //       context.redirect('#/');
                //       document.location.reload(true);
                //     });
                // });
            });
    }

    return {
        // all: all,
        register: register,
        login: login
    };
}();