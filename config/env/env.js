/**
 * Created by tom on 30-11-2017.
 */
var env = {
    webPort: process.env.PORT || 3000,
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || '',
    dbUser: process.env.DB_USES || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbDatabase: process.env.DB_DATABASE || 'serie'
};

var dburl = process.env.NODE_ENV === 'production' ?
    'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase :
    'mongodb://localhost/' + env.dbDatabase;





module.exports = {
    env: env,
    dbURL: dburl
};