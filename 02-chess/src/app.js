import config from './config'
import $ from "jquery";
import ChessBoard from 'chessboardjs'
import Chess from 'chess.js'
import Socket from 'socket.io-client';
window.$ = $;
window.jQuery = $;
var jQuery = $;
require('bootstrap');

var board;
var game = new Chess.Chess();
var player;
var $history = $('#history');
var active;
var $board = $('#board');

var socket = Socket.connect('https://chess.dovigo.org');
window.game = game;

socket.on( 'undo', function() {
  // Undo
  game.undo();

  // Update board
  board.position( game.fen(), false );

  // Update status and history
  updateStatus();
});

socket.on( 'restart', function() {
  // Undo
  game.reset();

  // Update board
  board.position( game.fen(), false );

  // Update status and history
  updateStatus();
} );

socket.on( 'move', function( data ) {
  // Move
  var move = game.move( data.move );

  // Update the board
  board.move( move.from + '-' + move.to );

  board.position( game.fen() );
  updateStatus();

  // Highlight move
  setHighlight( player.color === 'white' ? 'black' : 'white', move.from, move.to );
});

socket.on( 'game created', function( data ) {
    $( '#url' ).val( location.protocol + '//' + location.host + '/' + data.game.id );
    alert("New Game created with: " + location.protocol + '//' + location.host + '/' + data.game.id);
    window.history.pushState( data, "chess", '/' + data.game.id );
    $( '#game-create' ).hide();
});

socket.on( 'game joined', function( data ) {
  $( '#game-create' ).hide();
  game.load_pgn( data.game.pgn );

  var history = game.history( {verbose: true} );
  var lastMove = history[0];
  var prevMove = history[1];

  if (lastMove) {
      setHighlight( lastMove.color === 'w' ? 'white' : 'black', lastMove.from, lastMove.to );
  }
  if (prevMove) {
      setHighlight( prevMove.color === 'b' ? 'black' : 'white', prevMove.from, prevMove.to );
  }

  board.position( data.game.fen, false );
  board.orientation( data.player.color );

  player = data.player;

  updateStatus();
});

socket.on( 'game started', function( data ) {
  active = true;
});

// Join game by pathname
if (window.location.pathname.length > 1) {
  socket.emit( 'join game', { game: window.location.pathname.substr( 1 ) } );
};
// do not pick up pieces if the game is over
// only pick up pieces for the side to move
var onDragStart = function(source, piece, position, orientation) {
  if (game.game_over() === true ||
     (game.turn() === 'w' && player.color === 'black') ||
     (game.turn() === 'b' && player.color === 'white') ||
     (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
     (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
  var legal_moves = game.moves({square: source});
  for (var i = 0; i < legal_moves.length; i++) {
    $( '.square-' + legal_moves[i].slice(-2) ).addClass( 'highlight1-32417' );
  }
};

var onDrop = function(source, target) {
  var move = game.move( {
    from:      source,
    to:        target,
    promotion: 'q'
  });

  // Illegal move
  if (move === null) {
    return 'snapback';
  }

  // Highlight
  setHighlight( player.color, source, target );

  // Update status and history
  updateStatus();

  // Send move to server
  socket.emit('move', { move: move.san });
};

var onSnapEnd = function() {
  board.position(game.fen());
};

var setHighlight = function( color, from, to ) {
    $( '.square-55d63' ).removeClass( 'highlight-132417' );
    $( '.square-' + from ).addClass( 'highlight-132417' );
    $( '.square-' + to ).addClass( 'highlight-132417' );
};

var updateStatus = function() {
    var status = '';

    // Update history
    var list = createHistoryList( game.pgn() );
    var html = '';
    list.forEach( function( move ) {
        if (move) {
            html += '<li>' + move + '</li>';
        }
    });
    $history.find( 'ul' ).html( html );

    var moveColor = 'White';
    if (game.turn() === 'b') {
        moveColor = 'Black';
    }

    // checkmate?
    if (game.in_checkmate() === true) {
        status = 'Game over, ' + moveColor + ' is in checkmate.';
    }

    // draw?
    else if (game.in_draw() === true) {
        status = 'Game over, drawn position';
    }

    // game still on
    else {
        status = moveColor + ' to move';

        // check?
        if (game.in_check() === true) {
            status += ', ' + moveColor + ' is in check';
        }
    }

    console.log( 'Status: ', status );
};

// History
var createHistoryList = function( pgn ) {
    var list = [];
    if (typeof pgn === 'string' && pgn) {
        list = pgn.split( /\ ?[0-9]+\.\ / );
    }
    return list;
};

$( '#game' ).modal();
$( '#game-create' ).on( 'click', function( e ) {
    e.preventDefault();

    socket.emit( 'new game', {
        duration: $( '#timer' ).val()
    });
});

var cfg = {
  snapbackSpeed: 550,
  appearSpeed: 1500,
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  pieceTheme: 'http://www.willangles.com/projects/chessboard/img/chesspieces/wikipedia/{piece}.png',
  onSnapEnd: onSnapEnd
};

board = new ChessBoard('board1', cfg);
$(window).resize(board.resize);
$(document).ready(function(){
  $('.btn-undo').on( 'click', function() {
    console.log("test")
    game.undo();

    // Update board
    board.position( game.fen(), false );

    // Update status and history
    updateStatus();

    // Send move to server
    socket.emit( 'undo' );
  });

  // Restart
  $('.btn-restart').on( 'click', function() {
    game.reset();

    // Update board
    board.position( game.fen(), false );

    // Update status and history
    updateStatus();

    // Send move to server
    socket.emit( 'restart' );
  });
});
