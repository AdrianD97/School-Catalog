'use strict';

const config = require('../../config/config');
const Person = require('./Person');

class Student extends Person {
    constructor() {
        super();
        this._grades = [];
        this._promoted = false;
    }

    get getGrades() {
        return this._grades;
    }

    set setGrades(grades) {
        this._grades = grades;
    }

    get hasPromoted() {
        return this._promoted;
    }

    set setHasPromoted(promoted) {
        this._promoted = promoted;
    }

    promote() {
        const grades = this.getGrades;
        const lenght = grades.length;

        const sum = grades.reduce((a, b) => {
            return a + b.grade;
        }, 0);

        const avg = sum / lenght;

        let promoted = null;
        let id = this.getId;

        if (avg >= 5) {
            promoted = true;
        } else {
            promoted = false;
        }

        this.setHasPromoted = promoted;
        return new Promise((resolve, reject) => {
            const query = 'UPDATE ' + config['tables'][0] + ' SET promoted=' + promoted  + ' WHERE id = ' + id + ' AND diff = 8';
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows + " record(s) updated");
                }
            });
        });
    }

    static create(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ' + config['tables'][0] + ' p '
                        + ' INNER JOIN ' + config['tables'][1] + ' g '
                        + 'ON p.id = g.student_id WHERE (p.diff = 8 AND p.id = ' + id + ')';
    
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const grades = result.map((row) => {
                        return {
                            grade: row['grade'],
                            discipline: row['discipline']
                        };
                    });
                    const row = result[0];

                    const student = new Student();
                    student.setId = row['id'];
                    student.setBirthDate = row['birthdate'];
                    student.setName = row['name'];
                    student.setGrades = grades;
                    student.setHasPromoted = row['promoted'];

                    resolve(student);
                }
            });
        });
    }
}

module.exports = Student;