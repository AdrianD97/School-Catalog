'use strict';

function Person() {
    this._id = 0;
    this._name = 'Unknown';
    this._birthDate = Date.now();
}

Person.prototype.getId = function() {
    return this._id;
}

Person.prototype.setId = function(id) {
    return this._id = id;
}

Person.prototype.getName = function() {
    return this._name;
}

Person.prototype.setName = function(name) {
    return this._name = name;
}

Person.prototype.getBirthDate = function() {
    return this._birthDate;
}

Person.prototype.setBirthDate = function(birthDate) {
    return this._birthDate = birthDate;
}

Person.prototype.getAge = function() {
    return Date.now() - this.getBirthDate();
}


Person.create = function(query) {
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                const row = result[0];

                resolve(row);
            }
        });
    });
}

module.exports = Person;

