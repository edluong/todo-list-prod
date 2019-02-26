//purpose of the file is to run functions to create tables

const {Pool} = require('pg'); //node postgres module to connect to the database
const dotenv = require('dotenv');

//need to config dotenv to grab the variables from the .env file
dotenv.config();

//settings for AWS RDS of Postgres
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

//connect to the database
pool.on('connect',() =>{
    console.log('connected to the db');
});

//get current time; test function to see how it works
const now = () => pool.query('SELECT NOW()')
    .then((res) =>{
        console.log(res.rows[0].now);
        pool.end();
    })
    .catch((err) =>{
        console.log(err);
        pool.end();
    })

//delete non-default tasks the settings of the project
const delNonDefault = () => pool.query("DELETE FROM list WHERE task not in ('learn nodejs','finish react tutorial')")
    .then((res) =>{
        console.log(res);
        pool.end();
    })
    .catch((err) =>{
        pool.end();
    })

const updateDefault = () => pool.query("UPDATE list SET completed='N' WHERE task in ('learn nodejs','finish react tutorial')")
    .then((res) =>{
        console.log(res);
        pool.end();
    })
    .catch((err) =>{
        pool.end();
    })

const showTasks = () => pool.query("SELECT * FROM list")
    .then((res) =>{
        console.log(res.rows);
        pool.end();
    })
    .catch((err) =>{
        pool.end();
    })


pool.on('remove', () =>{
    console.log('client removed');
    process.exit(0);
});


module.exports = {
    now,
    delNonDefault,
    showTasks,
    updateDefault
};

require('make-runnable');