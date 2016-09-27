'use strict';

exports.action = {
  name:                   'getMountain',
  description:            'Get mountain',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,
  middleware:             [],

  inputs: {
    mountainId: {
      required: true
    },
  },

  run: function(api, data, next) {
    var error = null;
    api.models.mountain.findAll({where: {id: parseInt(data.params.mountainId)}}).then(function(mountains) {
      data.response.data = mountains;
      next();
    });
  }
};
