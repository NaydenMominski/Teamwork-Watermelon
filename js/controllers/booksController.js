'use strict'
import 'jquery'

import data from 'js/data.js'
import templates from 'js/templates.js'
import utils from 'js/utils.js'

export default {

    all: function() {

        let size = +this.params.size || 6,
            page = +this.params.page || 0,
            query = this.params.query,
            sortBy = this.params.sortBy;

        Promise.all([data.books.all(), templates.load('book-all')])
            .then(function([data, template]) {

                let allData = data;
                // -----query Categories

                if (query) {
                    query = decodeURIComponent(query.trim());
                    data = data.filter(function(params) {
                        return params.genre === query;
                    });
                    query = encodeURIComponent(query.trim());
                }


                let dataGenre = allData.map(function(item) { return item.genre });
                let category = dataGenre.filter(function(item, pos) {
                    return dataGenre.indexOf(item) == pos;
                });
                let encodeCategory = category.map(x => encodeURIComponent(x.trim()));
                let cat = [];

                for (var i = 0; i < category.length; i++) {
                    cat.push({
                        category: category[i],
                        encodeCategory: encodeCategory[i]
                    });
                }
                // ----Pagination-----
                var pagesLen = ((data.length / size) | 0) + 1,
                    pages = [],
                    queries = [];

                for (var i = 0; i < pagesLen; i += 1) {
                    pages.push({
                        size: size,
                        page: i,
                        displayPage: i + 1,
                        query: query,
                        sortBy: sortBy
                    });
                }

                queries.push({
                    query: query,
                    sortBy: sortBy
                });
                // -----sorting-----
                if (sortBy) {
                    utils.sorting(data, sortBy);
                }

                data = data.slice(page * size, (page + 1) * size);

                $('#main').html(template({
                    books: data,
                    pages: pages,
                    queries: queries,
                    category: cat

                }));
            });
    },
    showBookByID: function() {
        let bookId = this.params['bookID'];
        Promise.all([data.books.bookinfo(bookId), templates.load('book-details')])
            .then(function([data, template]) {
                $('#main').html(template(data));

            });
    },

    showUserBookByID: function() {
        let bookId = this.params['bookID'];

        Promise.all([data.books.bookinfo(bookId), templates.load('userbook-details')])
            .then(function([data, template]) {
                $('#main').html(template(data));

            });
    },

    addbook: function(context) {
        templates.load('addbook')
            .then(function(templateHtml) {
                context.$element().html(templateHtml());

            });

    },
    userbooks: function() {
        let size = +this.params.size || 6,
            page = +this.params.page || 0,
            query = this.params.query,
            sortBy = this.params.sortBy;

        Promise.all([data.books.all(), templates.load('userbook-all')])
            .then(function([data, template]) {

                var db_curentuser = $.grep(data, function(v) {
                    return v._acl.creator === sessionStorage.getItem('userId');
                });

                let allDataUser = db_curentuser;

                if (query) {
                    query = decodeURIComponent(query.trim());
                    db_curentuser = db_curentuser.filter(function(params) {
                        return params.genre === query;
                    });
                    query = encodeURIComponent(query.trim());
                }


                let dataGenre = allDataUser.map(function(item) { return item.genre });
                let category = dataGenre.filter(function(item, pos) {
                    return dataGenre.indexOf(item) == pos;
                });
                let encodeCategory = category.map(x => encodeURIComponent(x.trim()));
                let cat = [];

                for (var i = 0; i < category.length; i++) {
                    cat.push({
                        category: category[i],
                        encodeCategory: encodeCategory[i]
                    });
                }
                var pagesLen = ((db_curentuser.length / size) | 0) + 1,
                    pages = [],
                    queries = [];

                for (var i = 0; i < pagesLen; i += 1) {
                    pages.push({
                        size: size,
                        page: i,
                        displayPage: i + 1,
                        query: query,
                        sortBy: sortBy
                    });
                }
                queries.push({
                    query: query,
                    sortBy: sortBy
                });

                if (sortBy) {
                    utils.sorting(db_curentuser, sortBy);
                }

                db_curentuser = db_curentuser.slice(page * size, (page + 1) * size);

                $('#main').html(template({
                    books: db_curentuser,
                    pages: pages,
                    queries: queries,
                    category: cat
                }));

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


            data.books.createBook(title, author, genre, price, url, description)
                .then(function(data) {
                    window.location = window.location.origin + '#/books';
                    toastr.success('Create Book');
                })
                .catch(function(err) {
                    toastr.error('Error: The book is not created');
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


            data.books.bookForEdit(bookID, title, author, genre, price, url, description)
                .then(function(data) {
                    window.location = window.location.origin + '#/userbooks';
                    toastr.success('Edit book Successful');
                })
                .catch(function(err) {
                    toastr.error('Error: The book has not been edited');
                });

        });

        $('#btn-shoping-card').on('click', function(e) {

            $('#shoping-card-content').toggleClass("show");
            e.preventDefault();
            let userId = sessionStorage.getItem('userId');
            Promise.all([data.users.getUserData(userId), templates.load('shoping-card')])
                .then(function([data, template]) {

                    let db_curentuser = data.shopingcard;
                    let totalPrice = 0;

                    db_curentuser.forEach(function(book) {
                        totalPrice += +book.price;
                    });
                    totalPrice = parseFloat(totalPrice.toString()).toFixed(2);

                    $('#shoping-card-content').html(template({
                        books: db_curentuser,
                        totalPrice: totalPrice
                    }));

                });
        });

        $('#main').on('click', '#btn-add-shoping-card', function(ev) {

            let userId = sessionStorage.getItem('userId');
            let bookToAdd = $('#product_addtocart_form input').val();

            Promise.all([data.books.bookinfo(bookToAdd), data.users.getUserData(userId)])
                .then(function([book, userData]) {
                    // console.log(userData);
                    var body = {
                        // shopingcard: [],
                        shopingcard: userData.shopingcard,
                        username: userData.username,
                        firstname: userData.firstname,
                        lastname: userData.lastname,
                        email: userData.email,

                    };
                    body.shopingcard.push(book);
                    data.users.putUserInfo(userId, body);
                    toastr.success('The book is added to the Shoping Cart');
                });
        });

        $('#main').on('click', '#shareBtn', function(ev) {
            console.log('facebook');
            let bookToAdd = $('#product_addtocart_form input').val();
            FB.ui({
                method: 'feed',
                name: 'DebugmodeEventPlans',
                link: 'http://localhost:1461/ShareonFB.html',
                caption: 'hey how is my Application ? tell me dude',
                description: 'hey how is my Application ?',
                message: ''
            });
        });

    }
}