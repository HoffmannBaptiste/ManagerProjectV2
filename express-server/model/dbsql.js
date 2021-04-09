'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    database: 'retest',
    port: 3306,
    host: "database-app",
    user: "root",
    password: "8CFmTxG4r5oSS7IYvT2N"
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
