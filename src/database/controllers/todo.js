const db = require('../db');
//const bodyParser = require('body-parser');

const todo = {
    async addTask(req,res) {
        const text = 'INSERT INTO list(task) values($1)';
        const values = [
            req.body.newtask
        ];

        try {
            const {rows} = await db.query(text,values);
            return res.redirect('/');
        }catch(error){
            return res.status(400).send(error);
        }
    },

    async getAllTasks(req,res){
        const getListQuery = "SELECT task FROM list WHERE completed = 'N'";
        const getCompletedListQuery = "SELECT task FROM list WHERE completed = 'Y'";
        try{
            const task = await db.query(getListQuery);
            const completed = await db.query(getCompletedListQuery);
            console.log(task);
            console.log(completed);
            res.render('index',{task:task.result.rows,completed:completed.result.rows});
        }catch(error){
            return res.status(400).send(error);
        }
    }
}

module.exports = todo;