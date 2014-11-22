'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    execute: {
      target: {
        src: 'populate.js'
      }
    },
    simplemocha: {
      options: { globals: ['should'], timeout: 3000, ignoreLeaks: false, ui: 'bdd', reporter: 'tap' },
      all: { src: ['tests/**/*.js'] }
    }
  });

  grunt.registerTask('default', ['execute', 'simplemocha']);
};
