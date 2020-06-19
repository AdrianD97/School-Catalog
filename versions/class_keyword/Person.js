const config = require('../../config/config');

class Person {
    constructor(id = 0, name = 'Unknown', birthDate = Date.now()) {
        this._id = 0;
        this._name = name;
        this._birthDate = birthDate;
    }

    get getId() {
        return this._id;
    }

    set setId(id) {
        this._id = id;
    }

    get getName() {
        return this._name;
    }

    set setName(name) {
        this._name = name;
    }

    get getBirthDate() {
        return this._birthDate;
    }

    set setBirthDate(birthDate) {
        this._birthDate = birthDate;
    }

    get getAge() {
        return Date.now() - this._birthDate; 
    }

    static create(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ' + config['tables'][0] + ' WHERE id = ' + id + ' AND diff = 1';
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const row = result[0];

                    const person = new Person();
                    person.setId = row['id'];
                    person.setBirthDate = row['birthdate'];
                    person.setName = row['name'];

                    resolve(person);
                }
            });
        });
    }
}

module.exports = Person;