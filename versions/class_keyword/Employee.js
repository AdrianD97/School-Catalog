'use strict';

const config = require('../../config/config');
const Person = require('./Person');

class Employee extends Person {
    constructor() {
        super();
        this._fired = false;
    }

    get isFired() {
        return this._fired;
    }

    set setIsFired(fired) {
        this._fired = fired;
    }

    static create(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ' + config['tables'][0] + ' WHERE id = ' + id + ' AND diff = 2';
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const row = result[0];

                    const employee = new Employee();
                    employee.setId = row['id'];
                    employee.setBirthDate = row['birthdate'];
                    employee.setName = row['name'];
                    employee.setIsFired = row['fired'];

                    resolve(employee);
                }
            });
        });
    }
}

module.exports = Employee;