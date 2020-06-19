const mysql = require('mysql');

class Database {
    constructor(concConfig) {
        this.connection = mysql.createConnection(config);
    }

    query(sql_query, arg) {
        this.connection.query(sql_query, arg, (err, result) => {
            if (err) {
                throw err;
            }

            return result;
        });
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