import 'jquery'

import data from 'js/data.js'
import templates from 'js/templates.js'
import validator from 'js/validator.js'
import notifier from 'js/notifier.js'

export default {


    all: function(context) {
        templates.load('book-info')
            .then(function(templateHtml) {
                context.$element().html(templateHtml);

            });

    },

}