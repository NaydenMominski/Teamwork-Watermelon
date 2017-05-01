import 'jquery'

import data from 'js/data.js'
import templates from 'js/templates.js'
import validator from 'js/validator.js'
// import utils from 'js/utils.js'

export default {

    all: function() {
        // var size = +sammy.params['size'] || 6,
        //     page = +sammy.params['page'] || 0;
        let size = +this.params.size || 6,
            page = +this.params.page || 0,
            query = this.params.query;
        //     sortBy = this.params.sortBy;

        // console.log(sortBy);

        Promise.all([data.books.all(), templates.load('book-all')])
            .then(function([data, template]) {

                // searchPattern = decodeURI(params.productName).toLowerCase();
                // console.log(searchPattern);


                if (query) {
                    // console.log(query);
                    query = decodeURIComponent(query.trim());
                    data = data.filter(function(params) {
                        return params.genre === query;
                    });
                }

                var pagesLen = ((data.length / size) | 0) + 1,
                    pages = [],
                    queries = [];

                for (var i = 0; i < pagesLen; i += 1) {
                    pages.push({
                        size: size,
                        page: i,
                        displayPage: i + 1
                    });
                }
                queries.push({
                    query: query
                });
                // -----sorting-----

                // if (sortBy) {
                //     if (sortBy === "title") {
                //         data.sort((a, b) => { return a.title.localeCompare(b.title); });
                //     } else if (sortBy === "titledesc") {
                //         data.sort((a, b) => { return b.title.localeCompare(a.title); });
                //     } else if (sortBy === "price") {
                //         data.sort((a, b) => { return a.price.localeCompare(b.price); });
                //     } else if (sortBy === "pricedesc") {
                //         data.sort((a, b) => { return b.price.localeCompare(a.price); });
                //     }

                // }

                // log($('#dd-sorting option:selected').text());
                data = data.slice(page * size, (page + 1) * size);

                $('#main').html(template({
                    books: data,
                    pages: pages,
                    queries: queries

                }));
            });
        // $('#main').on('click', '#btn-filter', function(ev) {
        //     var size = $('#dd-sorting option:selected').text();
        //     console.log(size);
        //     ,
        //         page = 0;
        //     sammy.redirect('#/posts/' + size + '/' + page);
        // });
    },
    showBookByID: function() {
        let bookId = this.params['bookID'];
        Promise.all([data.books.bookinfo(bookId), templates.load('book-details')])
            .then(function([data, template]) {
                $('#main').html(template(data));

            });
        // window.location = window.location.origin + '#/book/' + bookId;
    },

    showUserBookByID: function() {
        let bookId = this.params['bookID'];

        Promise.all([data.books.bookinfo(bookId), templates.load('userbook-details')])
            .then(function([data, template]) {
                $('#main').html(template(data));

            });
        // window.location = window.location.origin + '#/userbook/' + bookId;
    },

    addbook: function(context) {
        templates.load('addbook')
            .then(function(templateHtml) {
                context.$element().html(templateHtml());

            });

    },
    userbooks: function() {
        let size = +this.params.size || 6,
            page = +this.params.page || 0;


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

            });
    },

    search: function(params) {

        console.log("search");
        // data.books.all()
        //     .then((booksObj) => {
        //         let tempBooks = [],
        //             searchPattern = decodeURI(params.productName).toLowerCase();

        //         for (let bookID in booksObj) {
        //             tempBooks.push(booksObj[bookID])
        //             tempBooks[tempBooks.length - 1]._id = bookID;
        //         }

        //         let filteredBooks = [];
        //         for (let book of tempBooks) {
        //             if (book.title.toLowerCase().indexOf(searchPattern) > 0 ||
        //                 book.author.toLowerCase().indexOf(searchPattern) > 0 ||
        //                 book.category.toLowerCase().indexOf(searchPattern) > 0) {
        //                 filteredBooks.push(book);
        //             }
        //         }

        //         console.log(tempBooks);
        //         console.log(filteredBooks);

        //         let body = {
        //             searchValue: decodeURI(params.productName)
        //         };
        //         if (filteredBooks.length > 0) {
        //             body.books = filteredBooks;
        //         }

        //         return templates.compile('search', body);
        //     })
        //     .then((html) => {
        //         _changePageHtml(html);
        //     });
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

        $('#btn-shoping-card').on('click', function(e) {

            $('#shoping-card-content').toggleClass("show");
            e.preventDefault();
            let userId = sessionStorage.getItem('userId');
            Promise.all([data.users.getUserData(userId), templates.load('shoping-card')])
                .then(function([data, template]) {

                    let db_curentuser = data.shopingcard;
                    let totalPrice = 0;

                    db_curentuser.forEach(function(book) {
                        console.log(book.price);
                        totalPrice += +book.price;
                    });
                    totalPrice = parseFloat(totalPrice.toString()).toFixed(2);

                    $('#shoping-card-content').html(template({
                        books: db_curentuser,
                        totalPrice: totalPrice
                    }));

                });
        });

        // $('#main').on('change', '#dd-sorting', function(e) {
        //     if ($("#dd-sorting option:selected").val() === "title") {
        //         window.location = window.location + '&sortBy=title';
        //     } else if ($("#dd-sorting option:selected").val() === "titledesc") {
        //         window.location = window.location + '&sortBy=titledesc';
        //     } else if ($("#dd-sorting option:selected").val() === "price") {
        //         window.location = window.location + '&sortBy=price';
        //     } else if ($("#dd-sorting option:selected").val() === "pricedesc") {
        //         window.location = window.location + '&sortBy=pricedesc';
        // }
        // else{

        // }
        // console.log(this.options[e.target.selectedIndex].text);
        // alert($("#dd-sorting option:selected").text());
        // console.log($("#dd-sorting option:selected").val());
        // });
    }
}