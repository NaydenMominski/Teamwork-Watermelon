'use strict'

export default {
    lenght: function(text, min, max) {
        return new Promise(function(resolve, reject) {
            if (text.length >= min && text.length <= max) {
                resolve('OK');
            } else {
                reject('error');
            }
        });
    },
    validateUrl: function(str) {
        return new Promise(function(resolve, reject) {
            let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            if (regexp.test(str)) {
                resolve('OK');
            } else {
                reject(toastr.error('Invalid URL'));
            }
        });
    }
}