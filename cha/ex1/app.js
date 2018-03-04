const express = require('express');
const fs = require('fs')
const app = express()


app.get('/', (req, res) => {
    res.send(
        {"msg":"hello world!"}
    )
});

app.get('/movies', (req, res) => {
    let data = fs.readFileSync('./initialDB.json')
    movieList = JSON.parse(data);
    res.send(movieList);
});

app.get('/movie/:id', (req, res) => {
    let id = req.params.id
    let data = fs.readFileSync('./initialDB.json')
    movies = JSON.parse(data);
    movieList = movies.data;
    console.log(movieList.length);
    if(id > movieList.length){
        res.status(400).send({
            "msg": "id id invalid"
        })
    }
    else{
        target_data = movieList[id]
        if (!target_data.req_num){
            target_data.req_num = 1;
        }else{
            target_data.req_num += 1;
        }
        movieList[id] = target_data
        console.log(movieList);
        fs.writeFileSync('./initialDB.json', JSON.stringify({"data":movieList}))
        res.send(target_data)
    }
});


app.listen(3000, () => {
    console.log('server is opened')
});