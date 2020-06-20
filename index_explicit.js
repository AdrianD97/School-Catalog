'use strict';

const Database = require('./database/Database');
const config = require('./config/config');


const conConfig = config['database'];
conConfig['database'] = config['database_name'];

try {
    const db = new Database(conConfig);

    global.db = db;

    require('./versions/explicit_prototype_and_function');

} catch(e) {
    console.log(e);
}
