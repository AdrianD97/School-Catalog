'use strict';

const config = require('../../config/config');
const ProDean = require('./ProDean');

class Dean extends ProDean {
    constructor() {
        super();
    }

    static create(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ' + config['tables'][0] + ' WHERE id = ' + id + ' AND diff = 7';
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const row = result[0];

                    const dean = new Dean();
                    dean.setId = row['id'];
                    dean.setBirthDate = row['birthdate'];
                    dean.setName = row['name'];
                    dean.setIsFired = row['fired'];

                    resolve(dean);
                }
            });
        });
    }
}

module.exports = Dean;