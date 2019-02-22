const express = require('express');
const app = express();

const bodyParser = require('body-parser') //middleware: to read input
const port = 3000;


//application settings
app.set('views','./views')
app.set('view engine','pug')

//middleware 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public')); //need express to allow access to this folder

//basic route
app.get('/',(req,res)=>{
    res.render('index')
});

app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
})