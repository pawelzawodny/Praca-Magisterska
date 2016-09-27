var Sequelize = require("sequelize");
var SequelizeFixtures = require('sequelize-fixtures');
var async = require('async');

module.exports = {
    initialize: function(api, next){
        api.mysql = {};
        api.mysql.sequelize = {};
        api.models = {};

        next();
    },
    start: function(api, next){
        api.mysql.sequelize = new Sequelize(api.config.mysql.database, null, null, api.config.mysql);
        api.models = {
            mountain: api.mysql.sequelize.import(__dirname + "/../models/mountain.js"),
            forecast: api.mysql.sequelize.import(__dirname + "/../models/forecast.js"),
            // ...
        }

        async.each(api.models, function(model, cb) {
            if ("associate" in model) {
                model.associate(api.models);
                cb();
            }
        }, function() {
            next();
        });

    }
}