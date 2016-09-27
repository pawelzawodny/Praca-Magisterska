'use strict';
var chalk = require('chalk');
var cheerio = require('cheerio');
var request = require('request');
var async = require('async');
var moment = require('moment');
var crawl = function (api, params, next) {
    api.log(chalk.green('Start crawling url on: www.mountain-forecast.com'));

    //Peaks for poland:


    request('http://www.mountain-forecast.com/countries', function(error, response, body) {
        var urls = [];
        var $ = cheerio.load(body);
        $('.mapctrytab.flag-sprites').each(function(i, elem) {
            console.log(1);
            $(this).find('a').each(function(j, elem1) {
                urls.push($(this).attr('href'))
            });
        });
        console.log(urls);

        async.eachLimit(urls, 1, function (url, endDone) {
            api.log('Parsing: '+url);
            request('http://www.mountain-forecast.com'+url, function (error, response, body) {
                var
                    $ = cheerio.load(body);

                var data = $('.letter_nav td:last-child a').toArray();
                async.eachLimit(data, 1, function (d1, done1) {
                    var url = 'http://www.mountain-forecast.com' + d1.attribs.href;
                    request(url, function (error, response, body) {
                        $ = cheerio.load(body);
                        var data = $('.locations-by-country-list td a');
                        data = data.toArray();
                        //attribs: href

                        async.eachLimit(data, 2, function (d, done) {

                            var url = 'http://www.mountain-forecast.com' + d.attribs.href;
                            request(url, function (error, response, body) {
                                $ = cheerio.load(body);
                                var height = $('.elev .active a .height').text().trim();
                                var name = $('#breadcrumbs h2').text().trim();
                                console.info('----------');
                                api.mysql.sequelize.sync().then(function () {

                                    var country = $('h1.fheader nobr').first().text().trim();
                                    country = country.split(',');
                                    country = country[1].trim();
                                    api.models.mountain.findOrCreate({
                                        where: {name: name},
                                        defaults: {name: name, height: height, country: country}
                                    }).spread(function (mountain, create) {
                                        // forecast for now
                                        var date;
                                        var c;
                                        if (moment().utc().hour() < 12) {
                                            c = 1;
                                            date = moment().utc().startOf('day').toDate();
                                        } else if (moment().utc().hour() > 12 || moment().utc().hour() < 18) {
                                            c = 2;
                                            date = moment().utc().startOf('day').hour(12).toDate();
                                        } else {
                                            c = 3;
                                            date = moment().utc().startOf('day').hour(18).toDate();
                                        }
                                        var summary = $('tr.med td').first().text().trim();
                                        var _height = $('.elev .active .height').text().trim();
                                        var wind = parseInt($('.forecasts .windcell').first().children('img').attr('alt'));
                                        var windDir = $('.forecasts .windcell').first().find('img').attr('alt').replace(/[0-9]/g, '');
                                        var snow = $('.forecasts tr').eq(8).children('td').first().text().trim();
                                        var rain = $('.forecasts tr').eq(9).children('td').first().text().trim();
                                        if(snow == '-') snow = 0;
                                        if(rain == '-') rain = 0;
                                        var _data = {
                                            mountainId: mountain.id,
                                            createdAt: date,
                                            height: _height,
                                            maxTemp: $('.forecasts tr').eq(10).children('td').first().text().trim(),
                                            lowTemp: $('.forecasts tr').eq(11).children('td').first().text().trim(),
                                            chillTemp: $('.forecasts tr').eq(12).children('td').first().text().trim(),
                                            freezingLevel: $('.forecasts tr').eq(13).children('td').first().text().trim(),
                                            wind: wind,
                                            windDir: windDir,
                                            snow: snow,
                                            rain: rain,
                                            summary: summary
                                        };
                                        api.models.forecast.findOrCreate({
                                            where: {createdAt: date, mountainId: mountain.id},
                                            defaults: _data
                                        }).spread(function(forecast, c) {
                                            //next forecast
                                            var _d = [];
                                            for(var i = 1; i <= 17; i++) {
                                                date = null;
                                                if (moment().utc().hour() < 12) {
                                                    date = moment().utc().startOf('day');
                                                } else if (moment().utc().hour() > 12 || moment().utc().hour() < 20) {
                                                    date = moment().utc().startOf('day').hour(12);
                                                } else {
                                                    date = moment().utc().startOf('day').hour(20);
                                                }

                                                date = date.add(i * 8, 'hours');
                                                var summary = $('tr.med td').eq(i).text().trim();
                                                var _height = $('.elev .active .height').text().trim();
                                                var wind = parseInt($('.forecasts tr').eq(6).children('td').eq(i).find('img').attr('alt'));


                                                var windDir = $('.forecasts tr').eq(6).children('td').eq(i).find('img').attr('alt').replace(/[0-9]/g, '');
                                                var snow = $('.forecasts tr').eq(8).children('td').eq(i).text().trim();
                                                var rain = $('.forecasts tr').eq(9).children('td').eq(i).text().trim();
                                                if(snow == '-') snow = 0;
                                                if(rain == '-') rain = 0;
                                                var _data = {
                                                    mountainId: mountain.id,
                                                    createdAt: date,
                                                    height: _height,
                                                    maxTemp: $('.forecasts tr').eq(10).children('td').eq(i).text().trim(),
                                                    lowTemp: $('.forecasts tr').eq(11).children('td').eq(i).text().trim(),
                                                    chillTemp: $('.forecasts tr').eq(12).children('td').eq(i).text().trim(),
                                                    freezingLevel: $('.forecasts tr').eq(13).children('td').eq(i).text().trim(),
                                                    wind: wind,
                                                    snow: snow,
                                                    rain: rain,
                                                    windDir: windDir,
                                                    summary: summary
                                                };
                                                _d.push(_data);
                                            }
                                            async.eachLimit(_d, 1, function(_data, __cb) {
                                                api.models.forecast.findOrCreate({
                                                    where: {createdAt: _data.createdAt, mountainId: _data.mountainId},
                                                    defaults: _data
                                                }).spread(function(d, c){
                                                    api.log(d.get({
                                                        plain: true
                                                    }));
                                                    return __cb();
                                                });
                                            }, function() {
                                                return done();
                                            })
                                        }) ;



                                    });
                                });



                                request(url, function (error, response, body) {
                                    console.info('---------- done \n');

                                })
                            });


                        }, function () {
                            return done1();
                        });
                    });



                }, function () {
                    return endDone();
                });
            });




        }, function() {
            next();
        });

    });


};
exports.task = {
    name: 'crawler',
    description: 'My Task',
    frequency: 1000 * 3600 * 5,
    queue: 'default',
    middleware: [],

    run: function (api, params, next) {
        crawl(api, params, next);
    }
};
