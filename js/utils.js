// export default {

//     pagination: function([data, template]) {
//         console.log("object");
//         var pagesLen = ((data.length / size) | 0) + 1,
//             pages = [];

//         for (var i = 0; i < pagesLen; i += 1) {
//             pages.push({
//                 size: size,
//                 page: i,
//                 displayPage: i + 1
//             });
//         }
//         data = data.slice(page * size, (page + 1) * size);

//         $('#main').html(template({
//             books: data,
//             pages: pages
//         }));
//     }
// }