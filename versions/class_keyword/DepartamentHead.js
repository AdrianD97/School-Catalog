'use strict';

const config = require('../../config/config');
const Teacher = require('./Teacher');

class DepartamentHead extends Teacher {
    constructor() {
        super();
    }

    static create(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ' + config['tables'][0] + ' WHERE id = ' + id + ' AND diff = 4';
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const row = result[0];

                    const departamentHead = new DepartamentHead();
                    departamentHead.setId = row['id'];
                    departamentHead.setBirthDate = row['birthdate'];
                    departamentHead.setName = row['name'];
                    departamentHead.setIsFired = row['fired'];

                    resolve(departamentHead);
                }
            });
        });
    }
}

module.exports = DepartamentHead;