const Pool = require('pg').Pool

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const CreateTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE company (
            ID SERIAL PRIMARY KEY ,
            name varchar(128),
            cn_number varchar(64)
            );`)

        console.log("table Created Successfully !")
    }
    catch( error ) {

        console.log(error?.message || error );
    }
 
}

module.exports =  { CreateTable }
