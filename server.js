const express = require('express');
const app = express();
const todo = require('./src/database/controllers/todo');

const bodyParser = require('body-parser') //middleware: to read input
const port = 3000;


//application settings
app.set('views','./views')
app.set('view engine','pug')

//middleware 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public')); //need express to allow access to this folder

//basic route
app.get('/',todo.getAllTasks);
app.post('/addtask',todo.addTask);

app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
})