const mysql = require('mysql');

const config = require('../config/config');

function insert(conConfig, table, query, values) {
    const con = mysql.createConnection(conConfig);

    con.connect((err) => {
        if (err) {
            throw err;
        }

        con.query(query, [values], (err, result) => {
            if (err) {
                throw err;
            }

            console.log('Insert data into ' + table + ' table successfully.');

            con.end();
        });
    });
}

try {
    const conConfig = config['database'];
    conConfig['database'] = config['database_name'];

    let table = config['tables'][0];

    let query = 'INSERT INTO ' + table + ' VALUES ?';
    let values = [
        [ 1, 'Person1', '1998-10-09', null, null, 1 ],
        [ 2, 'Person2', '1998-01-19', null, null, 1 ],
        [ 3, 'Employee1', '1978-10-09', null, null, 2 ],
        [ 4, 'Employee2', '1948-01-29', null, null, 2 ],
        [ 5, 'Teacher1', '1998-10-09', null, null, 3 ],
        [ 6, 'Teacher2', '1998-01-19', null, null, 3 ],
        [ 7, 'DepartmentHead1', '1978-10-09', null, null, 4 ],
        [ 8, 'DepartmentHead2', '1948-01-29', null, null, 4 ],

        [ 9, 'Administrator1', '1998-10-09', null, null, 5 ],
        [ 10, 'Administrator2', '1998-01-19', null, null, 5 ],
        [ 11, 'ProDean1', '1978-10-09', null, null, 6 ],
        [ 12, 'ProDean2', '1948-01-29', null, null, 6 ],
        [ 13, 'Dean1', '1998-10-09', null, null, 7 ],
        [ 14, 'Dean2', '1998-01-19', null, null, 7 ],
        [ 15, 'Student1', '1978-10-09', null, null, 8 ],
        [ 16, 'Student2', '1948-01-29', null, null, 8 ]
    ];

    insert(conConfig, table, query, values);

    table = config['tables'][1];
    query = 'INSERT INTO ' + table + ' VALUES ?';
    values = [
        [ 1, 10, 'SD', '2020-07-10', 15 ],
        [ 2, 7, 'IC', '2020-07-10', 15 ],
        [ 3, 9, 'ASC', '2020-07-08', 15 ],
        [ 4, 10, 'ASC', '2020-07-08', 16 ],
        [ 5, 9, 'SD', '2020-07-10', 16 ],
        [ 6, 8, 'IC', '2020-07-10', 16 ],
        [ 7, 9, 'PM', '2020-07-05', 15 ],
        [ 8, 10, 'PM', '2020-07-05', 16 ],
        [ 9, 10, 'CN1', '2020-07-11', 15 ],
        [ 10, 6, 'CN1', '2020-07-11', 16 ]
    ];

    insert(conConfig, table, query, values);
} catch (e) {
    console.log(e);
}