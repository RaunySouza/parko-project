'use strict';

module.exports = function(parko) {
    var Config = parko.models.config;

    var ConfigController = parko.modules.controller.createController();

    ConfigController.index = function(req, res, next) {
        var response = {
            count: 0,
            data: []
        };
    };

    ConfigController.get = function(req, res, next) {

    }

    ConfigController.create = function(req, res, next) {

    }

    ConfigController.update = function(req, res, next) {

    }

    ConfigController.delete = function(req, res, next) {
        
    }

    return ConfigController;
}
