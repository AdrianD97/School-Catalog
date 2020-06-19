class Person {
    constructor(id = 0, name = 'Unknown', birthDate = Date.now()) {
        this._id = 0;
        this._name = name;
        this._birthDate = birthDate;
    }

    get getId() {
        return this._id;
    }

    set setId(name) {
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

    create(type = 1) {
        return new Person();
    }
}

module.exports = {
    Person
}