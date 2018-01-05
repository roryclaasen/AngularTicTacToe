const boardMaster = require('../boards.js');
module.exports = function (socket) {

    const commands = {
        board: {
            new: 'board:new',
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
        var newBoard = boardMaster.create(data.username);
        console.log('%s (%s) created New Board: %d', newBoard.names[0], data.guid, newBoard.token);
        username = data.username;
        token = newBoard.token;
        callback({
            board: newBoard,
            guid: data.guid
        });
    });

    socket.on(commands.game.join, function (data, callback) {
        var board = boardMaster.join(data.token, data.name);
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
        var board = boardMaster.get(data);
        // console.log('Updating board (%s)', board.token)
        socket.broadcast.emit(commands.board.updated, board);
    });

    socket.on(commands.board.place, function (data, callback) {
        boardMaster.place(data.token, data.placeY, data.placeX, function(board) {
            if (board.winner) {
                console.log('%s has won game %s', board.names[board.winner], board.token);
            }
            socket.broadcast.emit(commands.board.updated, board);
            callback(board);   
        });
    });

    socket.on(commands.board.remove, function (data) {
        if (boardMaster.remove(data.token)) {
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
            var removed = boardMaster.remove(token);
            if (removed) {
                console.log('User left (%s, %s), removed board %s', username, socket.id, token);
                console.log('%d active boards left', boardMaster.length);
            } else {
                console.log('User left (%s, %s), board already removed', username, socket.id);
            }
        }
    });
};
