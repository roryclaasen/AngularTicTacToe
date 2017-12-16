var gameBoreds = (function () {
    var boreds = {};

    var uniqueToken = function() {
        return toString(Math.floor(100000 + Math.random() * 900000));
    }

    var create = function(name) {
        var token;
        do {
            token = uniqueToken();
        } while(boreds[token] !== undefined);

        var bored = {
            names: [name],
            token: token,
            turn: 0,
            tiles: []
        }
        boreds[token] = bored;

        return bored;
    };

    var join = function(token, name) {
        var bored = boreds[token];
        if (bored === undefined) return {
            result: "error",
            message: "No Game exists with token"
        }

        if (bored.names.length == 2) return {
            result: "error",
            message: "This game is currently full"
        }

        bored.names.push(name);
        return {
            result: "success",
            message: "Added user to game"
        }
    }

    var get = function () {
        var res = [];
        for (user in names) {
            res.push(user);
        }

        return res;
    };

    var remove = function (token) {
        if (boreds[token]) {
            delete boreds[token];
            return true;
        }
        return false;
    };

    return {
        create: create,
        join: join,
        remove: remove,
        get: get
    };
}());

module.exports = function (socket) {
    socket.on('bored:new', function (data) {
        var bored = gameBoreds.create(data.name);
        console.log('Created New Board: %s', board);
        socket.broadcast.emit('bored:created', bored);
    });

    socket.on('send:message', function (data) {
        socket.broadcast.emit('send:message', {
            user: name,
            text: data.message
        });
    });

    socket.on('bored:remove', function (data) {
        if (gameBoreds.remove(data.token)) {
            socket.broadcast.emit('bored:removed', {
                token: data.token 
            });
        }
    });
};
