'use strict';

exports.action = {
  name:                   'getMountains',
  description:            'Get mountains',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,
  middleware:             [],

  inputs: {},

  run: function(api, data, next) {
    var error = null;
    api.models.mountain.findAll().then(function(mountains) {
      data.response.data = mountains;
      next();
    });
  }
};
