// const Bookshelf = require('./')
var config = require('../knexfile');
var knex = require('knex')(config);

var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'user'
});

var Board = bookshelf.Model.extend({
  tableName: 'board',
  user: function() {
    return this.belongsToMany(User);
  }
});

var Reply = bookshelf.Model.extend({
  tableName: 'reply',
  board: function() {
    return this.belongsToMany(Board);
  }
});
  
module.exports = {
  User: User,
  Board: Board,
  Reply: Reply
};