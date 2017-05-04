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
    }
}