var env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        api_version: 'v1',

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

        rest_url: function() {
            return '/api/' + this.api_version;
        },

        db: {
            host: 'ds051740.mongolab.com',
            port: 51740,
            database: '/medicus',
            username: 'hpilosyan',
            password: 1234
        }
    }
};

module.exports = config[env];