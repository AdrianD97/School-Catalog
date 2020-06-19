const config = require('../../config/config');
const Person = require('./Person');

class Boss extends Person {
    constructor() {
        super();
    }

    fire(emp) {
        emp.setIsFired = true;
        return new Promise((resolve, reject) => {
            const query = 'UPDATE ' + config['tables'][0] + ' SET fired=true WHERE id = ' + emp.getId + ' AND diff != 1';
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows + " record(s) updated");
                }
            });
        })
    }

    static create(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ' + config['tables'][0] + ' WHERE id = ' + id + ' AND diff = 9';
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const row = result[0];

                    const boss = new Boss();
                    boss.setId = row['id'];
                    boss.setBirthDate = row['birthdate'];
                    boss.setName = row['name'];

                    resolve(boss);
                }
            });
        });
    }
}

module.exports = Boss;