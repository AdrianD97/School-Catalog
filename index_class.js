'use strict';

const Database = require('./database/Database');
const config = require('./config/config');
const { Person, Employee, Student, Boss, Teacher, DepartamentHead, Administrator, ProDean, Dean } = require('./versions/class_keyword');

const conConfig = config['database'];
conConfig['database'] = config['database_name'];

try {
    const db = new Database(conConfig);

    global.db = db;
    let emp = null;
    let stud = null;

    // fetch the person with id = 2
    // Person.create(2).then((person) => {
    //     console.log("Person: \n", {
    //         id: person.getId,
    //         name: person.getName,
    //         birthDate: person.getBirthDate,
    //         age: person.getAge
    //     });

    //     db.close();
    // }).catch((err) => {
    //     console.log(err);
    // });


    // fetch the employee with id = 3
    // Employee.create(3).then((employee) => {
    //     console.log("Employee: \n", {
    //         id: employee.getId,
    //         name: employee.getName,
    //         birthDate: employee.getBirthDate,
    //         age: employee.getAge,
    //         fired: employee.isFired
    //     });

    //     db.close();
    // }).catch((err) => {
    //     console.log(err);
    // });



    // Employee.create(3).then((employee) => {
    //     console.log("Employee: \n", {
    //         id: employee.getId,
    //         name: employee.getName,
    //         birthDate: employee.getBirthDate,
    //         age: employee.getAge,
    //         fired: employee.isFired
    //     });

    //     emp = employee;
    // }).catch((err) => {
    //     console.log(err);
    // });

    // // fetch the boss with id = 17
    // Boss.create(17).then((boss) => {
    //     console.log("Boss: \n", {
    //         id: boss.getId,
    //         name: boss.getName,
    //         birthDate: boss.getBirthDate,
    //         age: boss.getAge
    //     });

    //     // fire the the employee emp
    //     boss.fire(emp).then((result) => {
    //         console.log(result);
    //         db.close();

    //         console.log(emp.getName + ' was fired?' + emp.isFired);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }).catch((err) => {
    //     console.log(err);
    // });
       


    // fetch the student with id = 15
    // Student.create(15).then((student) => {
    //     console.log("Student: \n", {
    //         id: student.getId,
    //         name: student.getName,
    //         birthDate: student.getBirthDate,
    //         age: student.getAge,
    //         grades: student.getGrades,
    //         promoted: student.hasPromoted
    //     });

    //     student.promote().then((result) => {
    //         console.log(result);
    //         db.close();

    //         console.log(student.getName + ' promoted?' + student.hasPromoted);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }).catch((err) => {
    //     console.log(err);
    // });




    // fetch the student with id = 16
    // Student.create(16).then((student) => {
    //     console.log("Student: \n", {
    //         id: student.getId,
    //         name: student.getName,
    //         birthDate: student.getBirthDate,
    //         age: student.getAge,
    //         grades: student.getGrades,
    //         promoted: student.hasPromoted
    //     });
    //     stud = student;
    // }).catch((err) => {
    //     console.log(err);
    // })

    // // fetch the teacher with id = 5
    // Teacher.create(5).then((teacher) => {
    //     console.log("Teacher: \n", {
    //         id: teacher.getId,
    //         name: teacher.getName,
    //         birthDate: teacher.getBirthDate,
    //         age: teacher.getAge,
    //         fired: teacher.isFired
    //     });

    //     teacher.evaluateStudent(stud, 9, 'BD1').then((result) => {
    //         console.log(result);
    //         db.close();

    //         console.log('student ' + stud.getId + ' has following grades:\n', stud.getGrades);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }).catch((err) => {
    //     console.log(err);
    // });


    // fetch the student with id = 16
    // Student.create(16).then((student) => {
    //     console.log("Student: \n", {
    //         id: student.getId,
    //         name: student.getName,
    //         birthDate: student.getBirthDate,
    //         age: student.getAge,
    //         grades: student.getGrades,
    //         promoted: student.hasPromoted
    //     });
    //     stud = student;
    // }).catch((err) => {
    //     console.log(err);
    // })

    // // fetch the departamentHead with id = 8
    // DepartamentHead.create(8).then((departamentHead) => {
    //     console.log("DepartamentHead: \n", {
    //         id: departamentHead.getId,
    //         name: departamentHead.getName,
    //         birthDate: departamentHead.getBirthDate,
    //         age: departamentHead.getAge,
    //         fired: departamentHead.isFired
    //     });

    //     departamentHead.evaluateStudent(stud, 10, 'BD2').then((result) => {
    //         console.log(result);
    //         db.close();

    //         console.log('student ' + stud.getId + ' has following grades:\n', stud.getGrades);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }).catch((err) => {
    //     console.log(err);
    // });


    // fetch the administrator with id = 10
    // Administrator.create(10).then((administrator) => {
    //     console.log("Administrator: \n", {
    //         id: administrator.getId,
    //         name: administrator.getName,
    //         birthDate: administrator.getBirthDate,
    //         age: administrator.getAge,
    //         fired: administrator.isFired
    //     });

    //     db.close();
    // }).catch((err) => {
    //     console.log(err);
    // });


    // fetch the proDean with id = 12
    // ProDean.create(12).then((proDean) => {
    //     console.log("ProDean: \n", {
    //         id: proDean.getId,
    //         name: proDean.getName,
    //         birthDate: proDean.getBirthDate,
    //         age: proDean.getAge,
    //         fired: proDean.isFired
    //     });

    //     db.close();
    // }).catch((err) => {
    //     console.log(err);
    // });

    // fetch the dean with id = 14
    Dean.create(14).then((dean) => {
        console.log("Dean: \n", {
            id: dean.getId,
            name: dean.getName,
            birthDate: dean.getBirthDate,
            age: dean.getAge,
            fired: dean.isFired
        });

        db.close();
    }).catch((err) => {
        console.log(err);
    });

} catch (e) {
    console.log(e);
}

