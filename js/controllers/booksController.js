import 'jquery'

import data from 'js/data.js'
import templates from 'js/templates.js'
import validator from 'js/validator.js'
import notifier from 'js/notifier.js'

export default {

    all: function(sammy) {
        var size = +sammy.params['size'] || 6,
            page = +sammy.params['page'] || 0;

        Promise.all([data.books.all(), templates.load('book-all')])
            .then(function([data, template]) {

                var pagesLen = ((data.length / size) | 0) + 1,
                    pages = [];

                for (var i = 0; i < pagesLen; i += 1) {
                    pages.push({
                        size: size,
                        page: i,
                        displayPage: i + 1
                    });
                }
                data = data.slice(page * size, (page + 1) * size);

                $('#main').html(template({
                    books: data,
                    pages: pages
                }));
            });
    },
    showBookByID: function() {
        let bookId = this.params['bookID'];
        Promise.all([data.books.bookinfo(bookId), templates.load('book-details')])
            .then(function([data, template]) {
                $('#main').html(template(data));

            });
        window.location = window.location.origin + '#/books/' + bookId;
    },

    showUserBookByID: function() {
        let bookId = this.params['bookID'];

        Promise.all([data.books.bookinfo(bookId), templates.load('userbook-details')])
            .then(function([data, template]) {
                $('#main').html(template(data));

            });
        window.location = window.location.origin + '#/userbooks/' + bookId;
    },
    deletebook: function() {

    },
    addbook: function(context) {
        templates.load('addbook')
            .then(function(templateHtml) {
                context.$element().html(templateHtml());

            });

    },
    userbooks: function(sammy) {
        var size = +sammy.params['size'] || 6,
            page = +sammy.params['page'] || 0;

        Promise.all([data.books.all(), templates.load('userbook-all')])
            .then(function([data, template]) {

                var db_curentuser = $.grep(data, function(v) {
                    return v._acl.creator === sessionStorage.getItem('userId');
                });

                var pagesLen = ((db_curentuser.length / size) | 0) + 1,
                    pages = [];

                for (var i = 0; i < pagesLen; i += 1) {
                    pages.push({
                        size: size,
                        page: i,
                        displayPage: i + 1
                    });
                }
                db_curentuser = db_curentuser.slice(page * size, (page + 1) * size);

                $('#main').html(template({
                    books: db_curentuser,
                    pages: pages
                }));
                // $('#main').html(template(db_curentuser));
            });
    },

    bookevent: function() {

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
                    window.location = window.location.origin + '#/books';
                    toastr.success('Create Book');
                })
                .catch(function(err) {
                    toastr.error('Error');
                });

        });

        $('#main').on('click', '#btn-delbook', function(ev) {
            let bookID = $('#user_book_form input').val();
            data.books.bookForDelete(bookID)
                .then(function(response) {
                    toastr.success('Book Deleted');
                    window.location = window.location.origin + '#/userbooks';
                }, function(error) {
                    toastr.error('Unsuccessful!');
                    // context.redirect('#/home');
                    // window.location = window.location.origin + '#/userbooks';
                });
        });
        $('#main').on('click', '#btn-editbook', function(ev) {
            let bookID = $('#user_book_form input').val();
            Promise.all([data.books.bookinfo(bookID), templates.load('editbook')])
                .then(function([data, template]) {
                    $('#main').html(template(data));

                });

        });

        $('#main').on('click', '#btn-edit-book', function(ev) {
            let bookID = $('#book_for_edit').attr('data-id');

            var title = $('#newbook-title').val(),
                author = $('#newbook-author').val(),
                genre = $('#newbook-genre').val(),
                price = $('#newbook-price').val(),
                url = $('#newbook-url').val(),
                description = $('#newbook-description').val();

            validator.lenght(title, 1, 60)
                .then(function() {
                    return data.books.bookForEdit(bookID, title, author, genre, price, url, description);
                })
                .then(function(data) {
                    window.location = window.location.origin + '#/userbooks';
                    toastr.success('Edit book Successful');
                })
                .catch(function(err) {
                    toastr.error('Error');
                });

        });
    }
}