const Database = require('./database/Database');
const config = require('../config/config');

const conConfig = config['database'];
conConfig['database'] = config['database_name'];

try {
    const db = new Database(conConfig);
    
    console.log("Create succesfully db");
}
catch (e) {
    console.log(e);
}

