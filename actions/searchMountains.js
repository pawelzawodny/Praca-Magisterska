'use strict';

exports.action = {
  name:                   'searchMountains',
  description:            'Search mountains by name or country',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,
  middleware:             [],

  inputs: {
    phrase: {
      required: true
    },
  },

  run: function(api, data, next) {
    var error = null;
    var where = {
      $or: [
        {
          name: {
            $like: '%'+data.params.phrase+'%'
          }
        },
        {
          country: {
            $like: '%'+data.params.phrase+'%'
          }
        }
      ]
    };
    api.models.mountain.findAll({where: where}).then(function(mountains) {
      data.response.data = mountains;
      next();
    });
  }
};
