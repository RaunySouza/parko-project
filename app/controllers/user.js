'use strict';

module.exports = function(parko) {
    var User = parko.models.user;
    var Vehicle = parko.models.vehicle;

    var UserController = {
        index: function(req, res, next) {
            var response = {
                count: 0,
                data: []
            };

            User.count(function(err, count) {
                if (err)
                    res.send(err);
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
                                res.send(err);
                            else {
                                response.data = users;
                                res.json(response);
                            }
                        });
                }
            });
        },
        show: function(req, res, next) {
            User.findById(req.params.id)
                .populate('vehicle')
                .exec(function(err, user) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(user);
                    }
                });
        },
        create: function(req, res, next) {
            var vehicle = new Vehicle(req.body.vehicle);

            vehicle.save(function(err) {
                if (err) {
                    res.send(err);
                } else {
                    req.body.vehicle = vehicle._id;
                    var user = new User(req.body);

                    user.save(function(err) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            });
        },
        edit: function(req, res, next) {
            res.send("Editing");
        },
        delete: function(req, res, next) {
            res.send("Deleting");
        }
    };

    return UserController;
}
