'use strict';

module.exports = function(parko) {
    var router = parko.createRouter();
    var ctrl = parko.controllers.authenticate;

    router.get('/login', ctrl.login);

    parko.registerRoute("/", router);
    return router;
}
