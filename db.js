const Pool=require('pg').Pool;
// const { Pool } = require('pg'); 
const pool=new Pool({
    user:"postgres",
    host:"host.docker.internal",
    database:"students",
    password:"bhumigres",
    port:5432,
});

module.exports=pool;
