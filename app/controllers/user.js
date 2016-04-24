'use strict';

module.exports = function(parko) {
    var User = parko.models.user;
    var Vehicle = parko.models.vehicle;

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
                    .populate('vehicle')
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
            .populate('vehicle')
            .exec(function(err, user) {
                if (err) {
                    res.status(500).json(UserController.createErrorResponse(err.name, err.message));
                } else {
                    res.json(UserController.createSuccessResponse(user));
                }
            });
    }

    UserController.create = function(req, res, next) {
        var vehicle = new Vehicle(req.body.vehicle);

        vehicle.save(function(err) {
            if (err) {
                res.status(500).json(UserController.createErrorResponse(err.name, err.message));
            } else {
                req.body.vehicle = vehicle._id;
                var user = new User(req.body);

                user.save(function(err) {
                    if (err) {
                        res.status(500).json(UserController.createErrorResponse(err.name, err.message));
                    } else {
                        res.json(UserController.createSuccessResponse(user));
                    }
                });
            }
        });
    }

    UserController.update = function(req, res, next) {
        User.update({_id: req.params.id}, req.body, {new:true}, function(err, user) {
            if (err)
                res.status(500).json(UserController.createErrorResponse(err.name, err.message));
            else {
                Vehicle.update({_id: req.body.vehicle._id}, req.body.vehicle, {new:true}, function(err, vehicle) {
                    if (err)
                        res.status(500).json(UserController.createErrorResponse(err.name, err.message));
                    else
                        res.json(UserController.createSuccessResponse({}));
                });

            }
        });
    }

    UserController.delete = function(req, res, next) {
        User.findById(req.params.id, function(err, user) {
            if (err)
                res.status(500).json(UserController.createErrorResponse(err.name, err.message));
            else {
                User.remove({_id: user._id}, function(err) {
                    if (err) {
                        res.status(500).json(UserController.createErrorResponse(err.name, err.message));
                    } else {
                        Vehicle.remove({_id: user.vehicle}, function(err) {
                            if (err)
                                res.status(500).json(UserController.createErrorResponse(err.name, err.message));
                            else
                                res.json(UserController.createSuccessResponse({}));
                        })
                    }
                });
            }
        });
        /*User.remove({_id: req.params.id}, function(err) {
            if (err) {
                res.status(500).json(UserController.createErrorResponse(err.name, err.message));
            } else {
                Vehicle.remove({_id: req.body.vehicle._id}, function(err) {
                    if (err)
                        res.status(500).json(UserController.createErrorResponse(err.name, err.message));
                    else
                        es.json(UserController.createSuccessResponse({}));
                })
            }
        });*/
    }

    return UserController;
}
