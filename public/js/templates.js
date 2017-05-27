'use strict'
/*globals Handlebars */

export default {
    load: function(name) {
        let url = `templates/${name}.handlebars`;

        return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                success: function(data) {
                    resolve(Handlebars.compile(data));
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
    }
};