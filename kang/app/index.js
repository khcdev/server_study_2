const express = require('express');
const app = express();
const port = 3002;


var movies = [
  {
    movieId: 1,
    title: "Starwars1",
    director: "조지 루카스",
    year: 1977,
    reviews: [],
    req_num: 0
  },
  {
    movieId: 2,
    title: "Starwars1",
    director: "로빈스 쿠로스",
    year: 1377,
    reviews: [],
    req_num: 0
  },
  {
    movieId: 3,
    title: "Starwars1",
    director: "스타워즈",
    year: 1227,
    reviews: [],
    req_num: 3
  }
]

app.get('/movie/:id', function (req, res) {
  const data = movies.filter((value)=> {
    if(value.movieId == req.params.id) {
      value.req_num++;
      return value;
    }
  })

  if(data.length > 0) {
    res.send(data);
  }
  
  res.status(404).send('Sorry cant find that!');
});

app.get('/movie', function (req, res) {
  const data = movies.filter((value)=> {
    if(value.movieId == req.query.id) {
      value.req_num++;
      return value;
    }
  })

  if(data.length > 0) {
    res.send(data);
  }
  
  res.status(404).send('Sorry cant find that!');
});
app.listen(port, function () {
  console.log('Example app listening on port %d!', port);
});

module.exports = app;
