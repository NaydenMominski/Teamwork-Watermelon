'use strict'

export default {

    pagination: function(data, size, page) {

        let pagesLen = ((data.length / size) | 0) + 1,
            pages = [];

        for (var i = 0; i < pagesLen; i += 1) {
            pages.push({
                size: size,
                page: i,
                displayPage: i + 1
            });
        }
        return data = data.slice(page * size, (page + 1) * size);
    },
    // if (sortBy) {
    sorting: function(data, sortBy) {
        if (sortBy === "title") {
            data.sort((a, b) => { return a.title.localeCompare(b.title); });
        } else if (sortBy === "titledesc") {
            data.sort((a, b) => { return b.title.localeCompare(a.title); });
        } else if (sortBy === "price") {
            data.sort((a, b) => { return a.price.localeCompare(b.price); });
        } else if (sortBy === "pricedesc") {
            data.sort((a, b) => { return b.price.localeCompare(a.price); });
        }

    }

}