'use strict';

const config = require('../../config/config');
const Employee = require('./Employee');

class Administrator extends Employee {
    constructor() {
        super();
    }

    static create(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ' + config['tables'][0] + ' WHERE id = ' + id + ' AND diff = 5';
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const row = result[0];

                    const administrator = new Administrator();
                    administrator.setId = row['id'];
                    administrator.setBirthDate = row['birthdate'];
                    administrator.setName = row['name'];
                    administrator.setIsFired = row['fired'];

                    resolve(administrator);
                }
            });
        });
    }
}

module.exports = Administrator;