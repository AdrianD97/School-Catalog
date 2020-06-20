'use strict';

const config = require('../config/config');

const Person = require('./explicit_prototype_and_function/Person');

const table = config['tables'][0];
let query = null;

/* ============================= */
/*           Person              */
/* ============================= */

const person = new Person();

// query = 'SELECT * FROM ' + table + ' WHERE id = 1 AND diff = 1';
// Person.create(query).then((response) => {

//     person.setId(response['id']);
//     person.setBirthDate(response['birthdate']);
//     person.setName(response['name']);

//     console.log("Person: \n", {
//         id: person.getId(),
//         name: person.getName(),
//         birthDate: person.getBirthDate(),
//         age: person.getAge()
//     });

//     db.close();
// }).catch((err) => {
//     console.log(err);
// });


/* ============================= */
/*            Employee           */
/* ============================= */
const employee = Object.create(person);
employee.isFired = function() {
    return this._fired;
};

employee.setIsFired = function(fired) {
    this._fired = fired;
};

// query = 'SELECT * FROM ' + table + ' WHERE id = 4 AND diff = 2';
// Person.create(query).then((response) => {

//     employee.setId(response['id']);
//     employee.setBirthDate(response['birthdate']);
//     employee.setName(response['name']);
//     employee.setIsFired(response['fired']);

//     console.log("Employee: \n", {
//         id: employee.getId(),
//         name: employee.getName(),
//         birthDate: employee.getBirthDate(),
//         age: employee.getAge(),
//         fired: employee.isFired()
//     });

//     db.close();
// }).catch((err) => {
//     console.log(err);
// });



/* ============================= */
/*            Boss               */
/* ============================= */
const boss = Object.create(person);
boss.fire = function(emp) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE ' + config['tables'][0] + ' SET fired=true WHERE id = ' + emp.getId() + ' AND diff != 1';
        db.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                emp.setIsFired(true);
                resolve(result.affectedRows + " record(s) updated");
            }
        });
    })
};

// const employee2 = Object.create(employee);
// query = 'SELECT * FROM ' + table + ' WHERE id = 3 AND diff = 2';
// Person.create(query).then((response) => {

//     employee2.setId(response['id']);
//     employee2.setBirthDate(response['birthdate']);
//     employee2.setName(response['name']);
//     employee2.setIsFired(response['fired']);

//     console.log("Employee: \n", {
//         id: employee2.getId(),
//         name: employee2.getName(),
//         birthDate: employee2.getBirthDate(),
//         age: employee2.getAge(),
//         fired: employee2.isFired()
//     });
// }).catch((err) => {
//     console.log(err);
// });


// query = 'SELECT * FROM ' + table + ' WHERE id = 18 AND diff = 9';
// Person.create(query).then((response) => {

//     boss.setId(response['id']);
//     boss.setBirthDate(response['birthdate']);
//     boss.setName(response['name']);

//     console.log("Boss: \n", {
//         id: boss.getId(),
//         name: boss.getName(),
//         birthDate: boss.getBirthDate(),
//         age: boss.getAge(),
//     });

//     boss.fire(employee2).then((result) => {
//         console.log(result);

//         db.close();

//         console.log(employee2.getName() + " was fired ? " + employee2.isFired());
//     }).catch((err) => {
//         console.log(err);
//     });
// }).catch((err) => {
//     console.log(err);
// });



/* ============================= */
/*            Student            */
/* ============================= */
const student = Object.create(person);

student.hasPromoted = function() {
    return this._promoted;
};

student.setHasPromoted = function(promoted) {
    this._promoted = promoted;
};

student.getGrades = function() {
    return this._grades;
};

student.setGrades = function(grades) {
    this._grades = grades;
};

student.readGreades = function() {
    const id = this.getId();
    return new Promise((resolve, reject) => {
        const query = 'SELECT grade, discipline FROM ' + config['tables'][1] + ' WHERE student_id = ' + id;
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

                resolve(grades);
            }
        }); 
    });
};

student.promote = function() {
    const grades = this.getGrades();
    const lenght = grades.length;

    const sum = grades.reduce((a, b) => {
        return a + b.grade;
    }, 0);

    const avg = sum / lenght;

    let promoted = null;
    let id = this.getId();

    if (avg >= 5) {
        promoted = true;
    } else {
        promoted = false;
    }

    this.setHasPromoted(promoted);

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
};

// query = 'SELECT * FROM ' + table + ' WHERE id = 16 AND diff = 8';
// Person.create(query).then((response) => {
//     student.setId(response['id']);
//     student.setBirthDate(response['birthdate']);
//     student.setName(response['name']);
//     student.setHasPromoted(response['promoted']);

//     student.readGreades().then((result) => {
//         const grades = result.map((row) => {
//             return {
//                 grade: row['grade'],
//                 discipline: row['discipline']
//             };
//         });

//         student.setGrades(grades);
//         console.log("Student: \n", {
//             id: student.getId(),
//             name: student.getName(),
//             birthDate: student.getBirthDate(),
//             age: student.getAge(),
//             promoted: student.hasPromoted(),
//             grades: student.getGrades()
//         });

//         student.promote().then((result) => {
//             console.log(result);

//             db.close();

//             console.log(student.getName() + " promoted ? " + student.hasPromoted());
//         }).catch((err) => {
//             console.log(err);
//         });
//     }).catch((err) => {
//         console.log(err);
//     });

// }).catch((err) => {
//     console.log(err);
// });




/* ============================= */
/*           Teacher             */
/* ============================= */
const teacher = Object.create(employee);

teacher.evaluateStudent = function(student, grade, discipline) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO ' + config['tables'][1] + '(grade, discipline, grade_date, student_id) '
                    + 'VALUES(' + grade + ', \'' + discipline + '\', \'2020-07-05\', ' + student.getId() + ')';

        db.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                const grades = student.getGrades();

                grades.push({
                    grade: grade,
                    discipline: discipline
                });

                student.setGrades(grades);
                resolve(result);
            }
        });
    });
}


// student2 = Object.create(student);
// query = 'SELECT * FROM ' + table + ' WHERE id = 16 AND diff = 8';
// Person.create(query).then((response) => {
//     student2.setId(response['id']);
//     student2.setBirthDate(response['birthdate']);
//     student2.setName(response['name']);
//     student2.setHasPromoted(response['promoted']);

//     student2.readGreades().then((result) => {
//         const grades = result.map((row) => {
//             return {
//                 grade: row['grade'],
//                 discipline: row['discipline']
//             };
//         });

//         student2.setGrades(grades);

//         console.log("Student: \n", {
//             id: student2.getId(),
//             name: student2.getName(),
//             birthDate: student2.getBirthDate(),
//             age: student2.getAge(),
//             promoted: student2.hasPromoted(),
//             grades: student2.getGrades()
//         });
//     }).catch((err) => {
//         console.log(err);
//     });
// }).catch((err) => {
//     console.log(err);
// });

// query = 'SELECT * FROM ' + table + ' WHERE id = 5 AND diff = 3';
// Person.create(query).then((response) => {
//     teacher.setId(response['id']);
//     teacher.setBirthDate(response['birthdate']);
//     teacher.setName(response['name']);
//     teacher.setIsFired(response['fired']);

//     console.log("Teacher: \n", {
//         id: teacher.getId(),
//         name: teacher.getName(),
//         birthDate: teacher.getBirthDate(),
//         age: teacher.getAge(),
//         fired: teacher.isFired()
//     });

//     teacher.evaluateStudent(student2, 7, 'Mate3').then((result) => {
//         console.log(result);

//         console.log("Student: \n", {
//             id: student2.getId(),
//             name: student2.getName(),
//             birthDate: student2.getBirthDate(),
//             age: student2.getAge(),
//             promoted: student2.hasPromoted(),
//             grades: student2.getGrades()
//         });
//         db.close();
//     }).catch((err) => {
//         console.log(err);
//     });
// }).catch((err) => {
//     console.log(err);
// });


/* ============================= */
/*       DepartamentHead         */
/* ============================= */
const departamentHead = Object.create(teacher);

// const student3 = Object.create(student);
// query = 'SELECT * FROM ' + table + ' WHERE id = 15 AND diff = 8';
// Person.create(query).then((response) => {
//     student3.setId(response['id']);
//     student3.setBirthDate(response['birthdate']);
//     student3.setName(response['name']);
//     student3.setHasPromoted(response['promoted']);

//     student3.readGreades().then((result) => {
//         const grades = result.map((row) => {
//             return {
//                 grade: row['grade'],
//                 discipline: row['discipline']
//             };
//         });

//         student3.setGrades(grades);

//         console.log("Student: \n", {
//             id: student3.getId(),
//             name: student3.getName(),
//             birthDate: student3.getBirthDate(),
//             age: student3.getAge(),
//             promoted: student3.hasPromoted(),
//             grades: student3.getGrades()
//         });
//     }).catch((err) => {
//         console.log(err);
//     });
// }).catch((err) => {
//     console.log(err);
// });

// query = 'SELECT * FROM ' + table + ' WHERE id = 7 AND diff = 4';
// Person.create(query).then((response) => {
//     teacher.setId(response['id']);
//     teacher.setBirthDate(response['birthdate']);
//     teacher.setName(response['name']);
//     teacher.setIsFired(response['fired']);

//     console.log("DeparatamentHead: \n", {
//         id: teacher.getId(),
//         name: teacher.getName(),
//         birthDate: teacher.getBirthDate(),
//         age: teacher.getAge(),
//         fired: teacher.isFired()
//     });

//     teacher.evaluateStudent(student3, 10, 'Mate2').then((result) => {
//         console.log(result);

//         console.log("Student: \n", {
//             id: student3.getId(),
//             name: student3.getName(),
//             birthDate: student3.getBirthDate(),
//             age: student3.getAge(),
//             promoted: student3.hasPromoted(),
//             grades: student3.getGrades()
//         });
//         db.close();
//     }).catch((err) => {
//         console.log(err);
//     });
// }).catch((err) => {
//     console.log(err);
// });


/* ============================= */
/*       Administrator           */
/* ============================= */
const administrator = Object.create(employee);

// query = 'SELECT * FROM ' + table + ' WHERE id = 9 AND diff = 5';
// Person.create(query).then((response) => {
//     administrator.setId(response['id']);
//     administrator.setBirthDate(response['birthdate']);
//     administrator.setName(response['name']);
//     administrator.setIsFired(response['fired']);

//     console.log("Administrator: \n", {
//         id: administrator.getId(),
//         name: administrator.getName(),
//         birthDate: administrator.getBirthDate(),
//         age: administrator.getAge(),
//         fired: administrator.isFired()
//     });

//     db.close();
// }).catch((err) => {
//     console.log(err);
// });


/* ============================= */
/*           ProDean             */
/* ============================= */
const proDean = Object.create(employee);

// query = 'SELECT * FROM ' + table + ' WHERE id = 12 AND diff = 6';
// Person.create(query).then((response) => {
//     proDean.setId(response['id']);
//     proDean.setBirthDate(response['birthdate']);
//     proDean.setName(response['name']);
//     proDean.setIsFired(response['fired']);

//     console.log("ProDean: \n", {
//         id: proDean.getId(),
//         name: proDean.getName(),
//         birthDate: proDean.getBirthDate(),
//         age: proDean.getAge(),
//         fired: proDean.isFired()
//     });

//     db.close();
// }).catch((err) => {
//     console.log(err);
// });


/* ============================= */
/*             Dean              */
/* ============================= */
const dean = Object.create(proDean);

query = 'SELECT * FROM ' + table + ' WHERE id = 13 AND diff = 7';
Person.create(query).then((response) => {
    dean.setId(response['id']);
    dean.setBirthDate(response['birthdate']);
    dean.setName(response['name']);
    dean.setIsFired(response['fired']);

    console.log("Dean: \n", {
        id: dean.getId(),
        name: dean.getName(),
        birthDate: dean.getBirthDate(),
        age: dean.getAge(),
        fired: dean.isFired()
    });

    db.close();
}).catch((err) => {
    console.log(err);
});
