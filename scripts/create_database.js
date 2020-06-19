const mysql = require('mysql');

const config = require('../config/config');

function create_database(conConfig, dbname) {
    const con = mysql.createConnection(conConfig);

    con.connect((err) => {
        if (err) {
            throw err;
        }

        const query = 'CREATE DATABASE ' + dbname;
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log('Database ' + dbname + ' created successfully.');

            con.end();
        });
    });
}

try {
    create_database(config['database'], config['database_name']);
} catch (e) {
    console.log(e);
}
