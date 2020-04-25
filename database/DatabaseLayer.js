
const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost', 
     user:'root', 
     password: 'asd',
     connectionLimit: 5,
     database: 'kamu'
});

module.exports.dbPool = pool;
