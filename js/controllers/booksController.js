import 'jquery'

import data from 'js/data.js'
import templates from 'js/templates.js'
import validator from 'js/validator.js'
import notifier from 'js/notifier.js'

export default {


    all: function() {
        Promise.all([data.books.all(), templates.load('book-info')])
            .then(function([data, template]) {
                $('#main').html(template(data));
            })

        // $('#nav-all-books').on('click', function(ev) {
        //     data.books.all();
        // });
        // return templates.load('book-info')
        //     .then(function(templateHtml) {
        //         context.$element().html(templateHtml());

        //     });

    },
    addbook: function(context) {
        templates.load('book-detail')
            .then(function(templateHtml) {
                context.$element().html(templateHtml());

            });
        $('#main').on('click', '#btn-create-book', function(ev) {

            var title = $('#newbook-title').val(),
                author = $('#newbook-author').val(),
                genre = $('#newbook-genre').val(),
                price = $('#newbook-price').val(),
                url = $('#newbook-url').val(),
                description = $('#newbook-description').val();

            validator.lenght(title, 1, 60)
                .then(function() {
                    return data.books.createBook(title, author, genre, price, url, description);
                })
                .then(function(data) {

                    toastr.success('Create Book');
                })
                .catch(function(err) {
                    toastr.error('Error');
                });

        });



    },

}