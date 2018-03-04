var express = require('express');
var app = express();
var fs = require('fs');

var data = fs.readFileSync('./movieData.json');
var movieList = JSON.parse(data);

var server = app.listen(3000, function(){
    console.log('ss');
});

var countData = fs.readFileSync('count.txt', 'utf8');
var count = 0;

app.get('/movies', showMovieList);
app.get('/movie/:id', showMovieDetailList);

function showMovieList(req, res){

        // 영화 목록 만들기
        var list = [];
        for(var i=0; i<movieList.length; i++){
            var movie = movieList[i];
            list.push({id:movie.id, title:movie.title});
        }

        // 항목 갯수와 영화 목록 정보
        var result = {
            count: list.length,
            data: list
        }

        res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'});
        res.end(JSON.stringify(result));
}

function showMovieDetailList(req, res){
    var url = req.url;
    
    var id = url.split('/')[2];
        var movie = null;
        // 영화 데이터베이스에서 영화 검색
        for(var i=0; i<movieList.length; i++){
            var item = movieList[i];
            if(id == item.id){
                movie = item;
                break;
            }
        }
        // 검색된 영화 정보 제공
        if(movie){
            res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'});
            console.log(countData);
            res.end(JSON.stringify(movie));
        }
        else{
            // 영화 정보가 없는 경우
            res.writeHead(404, {'Content-Type':'application/json;charset=utf-8'});
            var message = {
                error : {
                    code : 404,
                    message : "영화 정보가 없습니다."
                }
            }
            res.end(JSON.stringify(message));
        }
}

/*
function showMovieList(req, res){
    var url = req.url;
    if(url == '/movies'){
        // 영화 목록 만들기
        var list = [];
        for(var i=0; i<movieList.length; i++){
            var movie = movieList[i];
            list.push({id:movie.id, title:movie.title});
        }

        // 항목 갯수와 영화 목록 정보
        var result = {
            count: list.length,
            data: list
        }

        res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'});
        res.end(JSON.stringify(result));
    }
    else{
        // 영화 상세 정보를 위한 id 추출
        var id = url.split('/')[2];
        var movie = null;
        // 영화 데이터베이스에서 영화 검색
        for(var i=0; i<movieList.length; i++){
            var item = movieList[i];
            if(id == item.id){
                movie = item;
                break;
            }
        }
        // 검색된 영화 정보 제공
        if(movie){
            res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'});
            res.end(JSON.stringify(movie));
        }
        else{
            // 영화 정보가 없는 경우
            res.writeHead(404, {'Content-Type':'application/json;charset=utf-8'});
            var message = {
                error : {
                    code : 404,
                    message : "영화 정보가 없습니다."
                }
            }
            res.end(JSON.stringify(message));
        }
    }
}

*/