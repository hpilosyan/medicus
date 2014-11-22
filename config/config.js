var env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        api_version: 'v1',

        host: 'http://localhost',

        port: '3000',

        rest_url: function() {
            return '/api/' + this.api_version;
        },

        db: {
            host: 'localhost',
            port: 27017,
            database: '/medicus'
        }
    },

    production: {
        api_version: 'v1',

        host: 'http://localhost',

        port: '3000',

        rest_url: function() {
            return '/api/' + this.api_version;
        },

        db: {
            host: 'localhost',
            port: 27017,
            database: '/medicus'
        }
    }
};

module.exports = config[env];