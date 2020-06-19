
const config = require('../../config/config');
const Employee = require('./Employee');

class ProDean extends Employee {
    constructor() {
        super();
    }

    static create(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ' + config['tables'][0] + ' WHERE id = ' + id + ' AND diff = 6';
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const row = result[0];

                    const proDean = new ProDean();
                    proDean.setId = row['id'];
                    proDean.setBirthDate = row['birthdate'];
                    proDean.setName = row['name'];
                    proDean.setIsFired = row['fired'];

                    resolve(proDean);
                }
            });
        });
    }
}

module.exports = ProDean;