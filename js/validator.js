'use strict'

export default {
    lenght: function(text, min, max, name) {

        if (text.length < min || text.length > max) {
            return {
                message: `Invalid ${name}: Length must be between ${min} and ${max}`
            };
        }
    },
    validateString: function(str, min, max, name) {
        if (typeof str !== 'string' || str.length < min || str.length > max) {
            return {
                message: `Invalid ${name}: Length must be between ${min} and ${max}`
            };
        }

    },
    validateNumber: function(num, name) {
        let pattern = /^\d*\.?\d*$/;
        if (!pattern.test(num) || num === '') {
            return {
                message: `Invalid ${name}: The ${name} must be a number`
            };
        }

    },

    validateEmail: function(email) {
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!pattern.test(email)) {
            return {
                message: `Invalid email`
            };
        }

    },


    validateUrl: function(url) {

        if (!url || url.length === 0) {
            return;
        }
        var pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
        if (!pattern.test(url)) {
            return {
                message: 'Invalid url'
            };
        }
    }
}