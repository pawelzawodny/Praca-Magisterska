'use strict';
var chalk = require('chalk');
let cheerio = require('cheerio');
let request = require('request');
var async = require('async');
/**
 * Module dependencies.
 */
var app = require('./../config/lib/app');
var server = app.init(function (app, db, config) {
    console.log('--');
    console.log(chalk.green(config.app.title));
    console.log();
    console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
    console.log(chalk.green('Server:          ' + server));
    console.log(chalk.green('Database:        ' + config.db.uri));
    console.log('-- \n\n');


    console.log(chalk.green('Start crawling url on: www.mountain-forecast.com'));

    //Peaks for poland:

    request('http://www.mountain-forecast.com/countries/Poland', function (error, response, body) {
        var
            $ = cheerio.load(body);

        var data = $('.letter_nav td:last-child a').toArray();
        async.each(data, function (d1, done1) {
            var url = 'http://www.mountain-forecast.com' + d1.attribs.href;
            request(url, function (error, response, body) {
                $ = cheerio.load(body);
                var data = $('.locations-by-country-list td a');
                data = data.toArray();
                //attribs: href

                async.each(data, function (d, done) {

                    var url = 'http://www.mountain-forecast.com' + d.attribs.href;
                    request(url, function (error, response, body) {
                        $ = cheerio.load(body);
                        console.info('----------');
                        var height = $('.elev .active a .height').text().trim();
                        console.info($('#breadcrumbs h2').text() + ' height: ' + height + 'm');
                        console.info('forecast for: ' + height + 'm');


                        var table = $('.forecasts');
                        var summary = $('tr.med td').first().text().trim();
                        var h_temp = $('.forecasts tr').eq(10).children('td').first().text().trim();
                        var wind = $('.forecasts .windcell').first().children('img').attr('alt');
                        console.log(chalk.green("Summary: " + summary));
                        console.log(chalk.green("Max temp: " + h_temp));
                        console.log(chalk.green("Wind: " + wind));

                        request(url, function (error, response, body) {
                            console.info('---------- done \n');
                            return done();
                        })
                    });


                }, function() {
                });
            });
            return done1();



        });
    })


});
