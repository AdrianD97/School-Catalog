'use strict';

const mysql = require('mysql');

class Database {
    constructor(conConfig) {
        this.connection = mysql.createConnection(conConfig);
    }

    query(sql_query, cb) {
        this.connection.query(sql_query, cb);
    }

    close() {
        this.connection.end((err) => {
            if (err) {
                throw err;
            }

            console.log('Conection close successfully');
        });
    }
}

module.exports = Database;