'use strict';

const config = require('../../config/config');
const Employee = require('./Employee');

class Teacher extends Employee {
    constructor() {
        super();
    }

    evaluateStudent(student, grade, discipline) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO ' + config['tables'][1] + '(grade, discipline, grade_date, student_id) '
                        + 'VALUES(' + grade + ', \'' + discipline + '\', \'2020-07-05\', ' + student.getId + ')';

            
            const grades = student.getGrades;

            grades.push({
                grade: grade,
                discipline: discipline
            });

            student.setGrades = grades;

            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static create(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ' + config['tables'][0] + ' WHERE id = ' + id + ' AND diff = 3';
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const row = result[0];

                    const teacher = new Teacher();
                    teacher.setId = row['id'];
                    teacher.setBirthDate = row['birthdate'];
                    teacher.setName = row['name'];
                    teacher.setIsFired = row['fired'];

                    resolve(teacher);
                }
            });
        });
    }
}

module.exports = Teacher;