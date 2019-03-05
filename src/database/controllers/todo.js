const db = require('../db');
const queries = require('./queries');

const todo = {
    async addTask(req,res) {
        const text = queries.addTask;
        const values = [
            req.body.newtask
        ];

        try {
            await db.query(text,values);
            return res.redirect('/');
        }catch(error){
            return res.status(400).send(error);
        }
    },

    async getAllTasks(req,res){
        const getListQuery ={
            text: queries.getListQuery,
            rowMode: 'array'
        };
        const getCompletedListQuery = {
            text: queries.getCompletedListQuery,
            rowMode: 'array'
        } 

        try{
            const task = await db.query(getListQuery);
            const completed = await db.query(getCompletedListQuery);
            
            res.render('index',{task:task.rows,completed:completed.rows});

        }catch(error){
            console.log(error);
            return res.status(400).send(error);
        }
    },

    async completeTask(req,res){

        var completedTaskArr = [];
        completedTaskArr.push(req.body.check);

        const completeTaskQuery ={
            text: queries.completeTaskQuery,
            values: completedTaskArr,
            rowMode: 'array'
        }
        
        try{
            await db.query(completeTaskQuery,[completedTaskArr]);
            res.redirect('/');
        }catch(error){
            console.log(error);
            return res.status(400).send(error);
        }
    }
}

module.exports = todo;