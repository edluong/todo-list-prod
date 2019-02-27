const db = require('../db');

const todo = {
    async addTask(req,res) {
        const text = 'INSERT INTO list(task) values($1)';
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
            text: "SELECT task FROM list WHERE completed = 'N'",
            rowMode: 'array'
        };
        const getCompletedListQuery = {
            text: "SELECT task FROM list WHERE completed = 'Y'",
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
            text: "UPDATE list SET completed='Y' WHERE task = ANY ($1)",
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