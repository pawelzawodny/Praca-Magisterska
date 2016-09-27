'use strict';

exports.action = {
  name:                   'getRandomMountains',
  description:            'Get random mountains',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,
  middleware:             [],

  inputs: {
    limit: {
      required: false,
      default: function (p) {
        return 3;
      }
    }
  },

  run: function(api, data, next) {
    var error = null;
    api.models.mountain.findAll({ limit: parseInt(data.params.limit),  order: [
      api.mysql.sequelize.fn( 'RAND' )
    ] }).then(function(mountains) {
      data.response.data = mountains;
      next();
    });
  }
};
