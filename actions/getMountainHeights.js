'use strict';

exports.action = {
  name:                   'getMountainHeights',
  description:            'Get mountain heights',
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

    var where = {mountainId: data.params.mountainId};
    api.models.forecast.aggregate('height', 'DISTINCT', { where: where, plain: false })
        .map(function (row) { return row.DISTINCT })
        .then(function (tehValueList) {
          data.response.data = tehValueList;
          next();
        })
    ;
  }
};
