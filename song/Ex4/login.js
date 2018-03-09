const fs = require('fs');
const express = require('express');
const app = express();

let data = fs.readFileSync("user.json");

app.get('/', (req, res) =>{
    res.send(<h1>Home page</h1>);
});

app.get('/login', (req, res, next)=>{
    dishtml(req, res);
    if(err){
        next();
    }
});



app.listen(3000);

function dishtml(req, res){
    
}