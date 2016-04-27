'use strict';

module.exports = function(parko) {
    var User = parko.models.user;

    var AuthController = parko.modules.controller.createController();

    AuthController.login = function (req, res, next) {
        User.findOne({})
    };

    return AuthController;
}
