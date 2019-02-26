const {Pool} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    max: 20, //from node pg module docs
    idleTimeoutMillis: 30000, //from node pg module docs
    connectionTimeoutMillis: 2000 //from node pg module docs
});


const dbQuery = {

    query(text,params){
        return new Promise((resolve,reject) =>{
            pool.query(text, params)
            .then((res) =>{
                resolve(res);
            })
            .catch((err) =>{
                reject(err);
            })
        })
    }
}

module.exports = dbQuery;
