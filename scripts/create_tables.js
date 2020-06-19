'use strict';

const mysql = require('mysql');

const config = require('../config/config');
const { tables } = require('../config/config');

function create_tables(conConfig, tables, queries) {
    const con = mysql.createConnection(conConfig);

    con.connect((err) => {
        if (err) {
            throw err;
        }

        con.query(queries[0], (err, result) => {
            if (err) {
                throw err;
            }

            console.log('Table ' + tables[0] + ' created successfully.');

            con.query(queries[1], (err, result) => {
                if (err) {
                    throw err;
                }

                console.log('Table ' + tables[1] + ' created successfully.');
                con.end();
            });
        });
    });
}

try {
    const conConfig = config['database'];
    conConfig['database'] = config['database_name'];

    const tables = config['tables'];

    const query1 = 'CREATE TABLE ' + tables[0]
                + '(id INT AUTO_INCREMENT PRIMARY KEY, '
                + 'name VARCHAR(50) NOT NULL, '
                + 'birthdate DATE, '
                + 'fired BOOLEAN DEFAULT false, '
                + 'promoted BOOLEAN DEFAULT false, '
                + 'diff INT NOT NULL, '
                + 'CONSTRAINT check_diff CHECK (diff >= 1 AND diff <= 8))';
    
    const query2 = 'CREATE TABLE ' + tables[1]
                + '(grade_id INT AUTO_INCREMENT PRIMARY KEY, '
                + 'grade INT NOT NULL, '
                + 'discipline VARCHAR(10) NOT NULL, '
                + 'grade_date DATE, '
                + 'student_id INT, '
                + 'CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES persons(id), '
                + 'CONSTRAINT check_grade CHECK (grade >= 1 AND grade <= 10))';

    create_tables(conConfig, tables, [ query1, query2 ]);
} catch (e) {
    console.log(e);
}