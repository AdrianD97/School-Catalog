const mysql = require('mysql');

const config = require('../config/config.js');

function create_table(conConfig, table, query) {
    const con = mysql.createConnection(conConfig);

    con.connect((err) => {
        if (err) {
            throw err;
        }

        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log('Table ' + table + ' created successfully.');

            con.end();
        });
    });
}

try {
    const conConfig = config['database'];
    conConfig['database'] = config['database_name'];

    let table = config['tables'][0];

    let query = 'CREATE TABLE ' + table
                + '(id INT AUTO_INCREMENT PRIMARY KEY, '
                + 'name VARCHAR(50) NOT NULL, '
                + 'birthday DATE, '
                + 'fired BOOLEAN DEFAULT false, '
                + 'promoted BOOLEAN DEFAULT false, '
                + 'diff INT NOT NULL, '
                + 'CONSTRAINT check_diff CHECK (diff >= 1 AND diff <= 8))';

    create_table(conConfig, table, query);


    table = config['tables'][1];

    query = 'CREATE TABLE ' + table
            + '(grade_id INT AUTO_INCREMENT PRIMARY KEY, '
            + 'grade INT NOT NULL, '
            + 'discipline VARCHAR(10) NOT NULL, '
            + 'grade_date DATE, '
            + 'student_id INT, '
            + 'CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES persons(id), '
            + 'CONSTRAINT check_grade CHECK (grade >= 1 AND grade <= 10))';

    create_table(conConfig, table, query);
} catch (e) {
    console.log(e);
}