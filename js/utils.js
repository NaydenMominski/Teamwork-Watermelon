'use strict';

import cryptoJS from 'cryptojs';

export default {


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

    },
    encryptToSha1: function(string) {
        let toSha1 = cryptoJS.SHA1(string).toString();

        return toSha1;
    }

}