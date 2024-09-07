import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
var board1 = null
var game = new Chess()
var $status = $('#status')
var $fen = $('#fen')
var $pgn = $('#pgn')

const socket = io();

var messages = document.querySelector('#messages'); 
var form = document.querySelector('#chat');
var input = document.querySelector('#input');


form.addEventListener('submit', (e) =>{
  e.preventDefault();
  if(input.value){
    socket.emit('chat message', input.value);
    input.value = ''; 
  }
}); 

socket.on('chat message', (msg) => {
  var item = document.createElement('li');
  item.textContent = msg; 
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('chess move', (move) => {
  board1.position(move); 
})


function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false

  // only pick up pieces for the side to move
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}

function onDrop (source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })

  // illegal move
  if (move === null) return 'snapback'

  updateStatus()
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board1.position(game.fen())
  userID = socket.id; 
  socket.emit('chess move', {
    fen: game.fen(), 
    userId: userID, 
  })
}

function updateStatus () {
  var status = ''

  var moveColor = 'White'
  if (game.turn() === 'b') {
    moveColor = 'Black'
  }

  // checkmate?
  if (game.in_checkmate()) {
    status = 'Game over, ' + moveColor + ' is in checkmate.'
  }

  // draw?
  else if (game.in_draw()) {
    status = 'Game over, drawn position'
  }

  // game still on
  else {
    status = moveColor + ' to move'

    // check?
    if (game.in_check()) {
      status += ', ' + moveColor + ' is in check'
    }
  }

  $status.html(status)
  $fen.html(game.fen())
  $pgn.html(game.pgn())
}

window.exit = function () {
  window.location.href = '/pages/lobby'; 
};

var config = {
    pieceTheme: '../img/chesspieces/wikipedia/{piece}.png',
    position: 'start',
    draggable: true,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
}
var board1 = Chessboard('board1', config);



updateStatus()
