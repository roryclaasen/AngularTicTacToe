var gameBoards = (function () {
    var boards = {};

    var randomToken = function() {
        return Math.floor(100000 + Math.random() * 900000);
    };

    var uniqueToken = function() {
        var token = randomToken();
        do {
            token = randomToken();
        } while (boards[token] !== undefined);
        return token;
    };

    var create = function(name, socketId) {
        var board = {
            names: [ name ],
            token: uniqueToken(),
            turn: 0,
            tiles: [],
            currentX: undefined,
            currentY: undefined,
            winner: false
        }
        boards[board.token] = board;
        return board;
    };

    var join = function(token, name, socketId) {
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
        if (token !== undefined) {
            if (boards[token.toString()]) return boards[token.toString()];
        }
        return undefined;
    };

    var set = function (token, newBoard) {
        if (boards[token.toString()]) {
            boards[token.toString()] = newBoard;
        }
    };

    // TODO Test this function
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
        set: set,
        length: Object.keys(boards).length
    };
}());

module.exports = function (socket) {
    const commands = {
        board: {
            new: 'board:new',
            updateTiles: 'board:updateTiles',
            place: 'board:place',
            update: 'board:update',
            updated: 'board:updated',
            remove: 'board:remove',
            removed: 'board:removed'
        },
        user: {
            disconnected: 'user:left'
        },
        game: {
            join: 'board:join'
        }
    };

    var username = undefined;
    var token = undefined;

    socket.on(commands.board.new, function (data, callback) {
        var newBoard = gameBoards.create(data.username);
        console.log('%s (%s) created New Board: %d', newBoard.names[0], data.guid, newBoard.token);
        username = data.username;
        token = newBoard.token;
        callback({
            board: newBoard,
            guid: data.guid
        });
    });

    socket.on(commands.game.join, function (data, callback) {
        var board = gameBoards.join(data.token, data.name);
        username = data.name;
        token = data.token;
        if (board.error) {
            console.log('%s failed to join %s, reason: %s', data.name, data.token, board.error);
            callback(board);
        } else {
            console.log('%s has joined game %s', board.names[1], board.token);
            callback(board);
        }
    });

    socket.on(commands.board.update, function (data) {
        var board = gameBoards.get(data);
        // console.log('Updating board (%s)', board.token)
        socket.broadcast.emit(commands.board.updated, board);
    });

    socket.on(commands.board.updateTiles, function (data) {
        var board = gameBoards.get(data.token);
        if (board) {
            board.tiles = data.tiles;
            gameBoards.set(data.token, board);
            socket.broadcast.emit(commands.board.updated, board);
        }
    });

    socket.on(commands.board.place, function (data, callback) {
        var board = gameBoards.get(data.token);
        if (board) {
            const col = data.placeX, row = data.placeY;
            if (board.tiles[row][col].used == false && validSector(board, row, col)) {
                // TODO Also check if the game has been won

                board.currentX = col;
                board.currentY = row;

                board.tiles[row][col].used = true;
                board.tiles[row][col].class = (board.turn) ? 'cross' : 'nought';

                board.turn = (board.turn == 0) ? 1 : 0;

                // Calculate Winning Results

                gameBoards.set(data.token, board);

                socket.broadcast.emit(commands.board.updated, board);
                callback(board);               
            }
        }
    });

    socket.on(commands.board.remove, function (data) {
        if (gameBoards.remove(data.token)) {
            socket.broadcast.emit(commands.board.removed, {
                token: data.token 
            });
        }
    });

    socket.on('disconnect', function (reason) {
        if (token) {
            socket.broadcast.emit(commands.user.disconnected, {
                reason: reason,
                name: username,
                token: token
            });
            var removed = gameBoards.remove(token);
            if (removed) {
                console.log('User left (%s, %s), removed board %s', username, socket.id, token);
                console.log('%d active boards left', gameBoards.length);
            } else {
                console.log('User left (%s, %s), board already removed', username, socket.id);
            }
        }
    });

    var validSector = function(board, row, col) {
        if (board.currentY == undefined && board.currentX == undefined) return true;

        if (Math.floor(row / 3) == board.currentY % 3) {
            if (Math.floor(col / 3) == board.currentX % 3) return true;
        }

        var filled = true;
        const sectorX = Math.floor(board.currentX % 3) * 3;
        const sectorY = Math.floor(board.currentY % 3) * 3;
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                if (!filled) continue;
                if (this.board.tiles[sectorY + y][sectorX + x].used == false) filled = false;
            }
        }
        if (filled) return true;
        
        return false;
    }
};
