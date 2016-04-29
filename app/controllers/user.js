'use strict';

module.exports = function(parko) {
    var User = parko.models.user;

    var UserController = parko.modules.controller.createController();

    UserController.index = function(req, res, next) {
        var response = {
            count: 0,
            data: []
        };

        User.count(function(err, count) {
            if (err)
                res.status(500).json(UserController.createErrorResponse(err.name, err.message));
            else {
                response.count = count;

                // Check if it has pagination
                var limit = Math.min(count, req.query.limit);
                var page = Math.max(0, req.query.page - 1);

                User.find()
                    .limit(limit)
                    .skip(limit * page)
                    .sort({id: 'desc'})
                    .exec(function (err, users) {
                        if (err)
                            res.status(500).json(UserController.createErrorResponse(err.name, err.message));
                        else {
                            response.data = users;
                            res.json(UserController.createSuccessResponse(response));
                        }
                    });
            }
        });
    };

    UserController.get = function(req, res, next) {
        User.findById(req.params.id)
            .exec(function(err, user) {
                if (err) {
                    res.status(500).json(UserController.createErrorResponse(err.name, err.message));
                } else {
                    res.json(UserController.createSuccessResponse(user));
                }
            });
    }

    UserController.create = function(req, res, next) {
        var user = new User(req.body);
        user.save(function(err) {
            if (err) {
                res.status(500).json(UserController.createErrorResponse(err.name, err.message));
            } else {
                res.json(UserController.createSuccessResponse(user));
            }
        });
    }

    UserController.update = function(req, res, next) {
        User.update({_id: req.params.id}, req.body, {new:true}, function(err, user) {
            if (err)
                res.status(500).json(UserController.createErrorResponse(err.name, err.message));
            else {
                res.json(UserController.createSuccessResponse({}));
            }
        });
    }

    UserController.delete = function(req, res, next) {
        User.remove({_id: req.params.id}, function(err) {
            if (err)
                res.status(500).json(UserController.createErrorResponse(err.name, err.message));
            else {
                res.json(UserController.createSuccessResponse({}));
            }
        })
    }

    UserController.block = function(req, res, next) {
        User.update({_id: req.params.id}, {$set: {isBlocked: true}}, function(err, response) {
            if (err)
                res.status(500).json(UserController.createErrorResponse(err.name, err.message));
            else
                res.json(UserController.createSuccessResponse({}));
        });
    }

    UserController.unblock = function(req, res, next) {
        User.update({_id: req.params.id}, {$set: {isBlocked: false}}, function(err, response) {
            if (err)
                res.status(500).json(UserController.createErrorResponse(err.name, err.message));
            else
                res.json(UserController.createSuccessResponse({}));
        });
    }

    return UserController;
}
