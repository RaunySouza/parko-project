'use strict';

module.exports = function(parko) {
    var router = parko.createRouter();
    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

    parko.registerRoute('/', router);
    return router;
}
