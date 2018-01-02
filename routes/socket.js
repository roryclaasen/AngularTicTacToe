var gameBoard = (function () {
    var boards = {};

    var randomToken = function() {
        return Math.floor(100000 + Math.random() * 900000);
    };

    var uniqueToken = function() {
        var token = randomToken();
        do {
            token = randomToken();
        } while (boreds[token] !== undefined);
        return token;
    };

    var create = function(name) {
        var board = {
            names: [ name ],
            token: uniqueToken(),
            turn: 0,
            tiles: []
        }
        boards[board.token] = board;
        return board;
    };

    var join = function(token, name) {
        console.log('token: %s, name: %s', token, name);
        var board = boards[token.toString()];

        if (board === undefined) return {
            error: 'No Game exists with token',
            token: token
        };
        if (board.names.length == 2) return {
            error: 'This game is currently full'
        };

        board.names.push(name);
        boards[token.toString()] = board;

        return board;
    };

    var get = function (token) {
        if (boards[token.toString()]) {
            return boards[token.toString()];
        }
        return undefined;
    };

    var set = function (token, newBoard) {
        if (boards[token.toString()]) {
            boards[token.toString()] = newBoard;
        }
    };

    var remove = function (token) {
        if (boards[token.toString()]) {
            delete boards[token.toString()];
            return true;
        }
        return false;
    };

    return {
        create: create,
        join: join,
        remove: remove,
        get: get,
        set: set
    };
}());

module.exports = function (socket) {

    const commands = {
        board: {
            new: 'board:new',
            created: 'board:created',
            updateTiles: 'board:updateTiles',
            updated: 'board:updated',
            remove: 'board:remove',
            removed: 'board:removed'
        },
        game: {
            join: 'board:join',
            joined: 'board:joined'
        }
    };
    socket.on(commands.board.new, function (data) {
        var newBoard = gameBoards.create(data);
        console.log('%s created New Board: %d', newBoard.names[0], newBoard.token);
        socket.emit(commands.board.created, newBoard);
    });

    socket.on(commands.game.join, function (data) {
        var board = gameBoards.join(data.token, data.name);
        if (board.error) {
            socket.emit(commands.game.joined, board);
        } else {
            console.log('%s has joined game %s', board.names[1], board.token);
            socket.emit(commands.game.joined, board);
        }
    });

    socket.on(commands.board.updateTiles, function (data) {
        var board = gameBoards.get(data.token);
        if (board) {
            board.tiles = data.tiles;
            gameBoards.set(data.token, board);
            socket.emit(commands.board.updateTiles, board);
        }
    });

    socket.on(commands.board.remove, function (data) {
        if (gameBoards.remove(data.token)) {
            socket.emit(commands.board.removed, {
                token: data.token 
            });
        }
    });
};
