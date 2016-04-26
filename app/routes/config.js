'use strict';

module.exports = function(parko) {
    var router = parko.createRouter();
    var configController = parko.controllers.config;

    router.get('/', configController.index);
    router.get('/:id', configController.get);
    router.post('/', configController.create);
    router.put('/:id', configController.update);
    router.delete('/:id', configController.delete)

    parko.registerRoute("/config", router);
    return router;
}
