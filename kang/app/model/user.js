// const Bookshelf = require('./')
var config = require('../../knexfile');
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);

const model = {
  User,
  Board
}

var User = bookshelf.Model.extend({
  tableName: 'user'
});

var Board = bookshelf.Model.extend({
  tableName: 'board'
});
  
  
module.exports = model;