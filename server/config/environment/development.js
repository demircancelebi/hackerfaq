'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: process.env.MONGOLAB_DEV_URI ||
        'mongodb://localhost/hackerfaq-dev'
  },

  seedDB: false
};
