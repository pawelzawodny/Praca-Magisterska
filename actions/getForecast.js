'use strict';
var moment = require('moment');
exports.action = {
    name: 'getForecast',
    description: 'Get forecast',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {
        mountainId: {
            required: true
        },
        date: {
            required: false,
            default: function (p) {
                return 0;
            }
        },
        dateTo: {
            required: false,
            default: function (p) {
                return 0;
            }
        },
        height: {
            required: false,
            default: function (p) {
                return 0;
            }
        },
    },

    run: function (api, data, next) {
        var error = null;
        var date;
        var dateTo;
        if (data.params.date == 0) {
            if (moment().utc().hour() < 12) {
                date = moment().utc().startOf('day');
            } else if (moment().utc().hour() > 12 || moment().utc().hour() < 20) {
                date = moment().utc().startOf('day').hour(12);
            } else {
                date = moment().utc().startOf('day').hour(20);
            }
        } else {
            date = moment.unix(data.params.date).utc();
        }
        var where = {
            mountainId: data.params.mountainId,
            createdAt: {
                $gte: date.toDate()
            }
        };
        if (data.params.height > 0) {
            where.height = data.params.height;
        }
        if (data.params.dateTo > 0) {
            dateTo = moment.unix(data.params.dateTo).utc();
            where.createdAt.$lte = dateTo.toDate();
        }


        api.models.forecast.findAll({where: where, order: 'createdAt ASC'}).then(function (forecast) {
            data.response.data = forecast;
            return next(error);
        });
    }
};
