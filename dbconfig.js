const Pool  = require('pg').Pool;

const pool = new Pool({
    user: "usergroupapi3",
    password: 'password3',
    host: "localhost",
    port: 5432,
    database: "userandgroupapi"

});

module.exports = pool;