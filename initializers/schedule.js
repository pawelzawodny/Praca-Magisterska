var schedule = require('node-schedule');

module.exports = {
    initialize: function(api, next){
        api.scheduledJobs = [];
        next();
    },

    start: function(api, next){

        return next();
        var job = schedule.scheduleJob('0 0/1 * 1/1 * ? *', function(){
            // we want to ensure that only one instance of this job is scheduled in our environment at once,
            // no matter how many schedulers we have running

            if(api.resque.scheduler && api.resque.scheduler.master){
                //  api.tasks.enqueue("crawler", {}, 'default', function(error, toRun){
                //      api.log('sssss');
                // });

            }
        });

        api.scheduledJobs.push(job);

        next();
    },

    stop: function(api, next){
        api.scheduledJobs.forEach(function(job){
            job.cancel();
        });

        next();
    }
};