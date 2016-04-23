'use strict';

module.exports = function(parko) {
    var User = parko.getModel('User');
    var Vehicle = parko.getModel('Vehicle');

    var UserController = {
        index: function(req, res, next) {
            User.find()
                .populate('vehicle')
                .exec(function (err, users) {
                    res.json(users);
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
                    var user = new User(req.body);
                    user.vehicle = vehicle._id;

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
