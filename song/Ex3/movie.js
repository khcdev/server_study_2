var fs = require('fs');
var express = require('express');
var app = express();

var data = fs.readFileSync('initialDB.json');
var movieList = JSON.parse(data);


app.get('/movie/:id', (req, res, next) => {
    var url = req.url;
    var id = url.split('/')[2];
    var movie = null;

    for (var i = 0; i < movieList.length; i++) {
        var temp = movieList[i];
        if (id == temp.id){
            movie = temp;
            break;
        }
    }

    if (movie) {
        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
        res.end(JSON.stringify(movie));
    }
    else{
        var errorMasseage = new Error('Not movie data\n');
        next(errorMasseage);
        return;
    }
});
app.use(errorHandler);
app.listen(3000);

function errorHandler(err, req, res, next) {
    res.send(err.toString());
}