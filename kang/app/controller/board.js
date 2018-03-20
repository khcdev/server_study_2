var { User, Board, Reply } = require('../model');

exports.boardWrite = async (req, res) => {
  const { type, title, content, author } = req.body
  const user = await User.where({email: "email@email.com"}).fetch();

  var board = new Board({
      id: null,
      title: title, 
      content: content, 
      type: type,
      author: user.get('id')
  });

  try {
      var obj = await board.save(null, { method: 'insert'});
      res.send(200, obj)  
  } catch (error) {
      res.send(400, error);  
  }
}

exports.boardAll = async (req, res) => {
  var board = await Board.fetchAll();
  res.send(200, board);  
}

exports.board = async (req, res) => {
  const id = req.params.id;
  const board = await Board.where({id: id}).fetch();

  if(!board) {
    res.send(400);
  }

  const reply = await Reply.where({board: board.get('id')}).fetchAll();

  var obj = {
    board: board,
    reply: reply
  }

  res.send(200, obj); 
}

exports.replyWrite = async (req, res) => {
  const id = req.params.id;
  const board = await Board.where({id: id}).fetch();

  if(!board) {
    res.send(400);
  }

  var reply = new Reply({
    id: null,
    content: content, 
    board: board.get('id')
  });

  try {
    const obj = await reply.save(null, { method: 'insert'});
    res.send(200, obj); 
  } catch(error) {
    res.send(400, error); 
  }
}