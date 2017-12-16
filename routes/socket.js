var gameBoreds = (function () {
    var boreds = {};

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
        var bored = {
            names: [ name ],
            token: uniqueToken(),
            turn: 0,
            tiles: []
        }
        boreds[bored.token] = bored;
        return bored;
    };

    var join = function(token, name) {
        console.log('token: %s, name: %s', token, name);
        var bored = boreds[token.toString()];

        if (bored === undefined) return {
            error: 'No Game exists with token',
            token: token
        };
        if (bored.names.length == 2) return {
            error: 'This game is currently full'
        };

        bored.names.push(name);
        boreds[token.toString()] = bored;

        return bored;
    };

    // TODO Update function
    var get = function () {
        var res = [];
        for (user in names) {
            res.push(user);
        }
        return res;
    };

    var remove = function (token) {
        if (boreds[token.toString()]) {
            delete boreds[token.toString()];
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
        var newBored = gameBoreds.create(data);
        console.log('%s created New Board: %d', newBored.names[0], newBored.token);
        socket.emit('bored:created', newBored);
    });

    socket.on('bored:join', function (data) {
        var bored = gameBoreds.join(data.token, data.name);
        if (bored.error) {
            socket.emit('bored:joined', bored);
        } else {
            console.log('%s has joined game %s', bored.names[1], bored.token);
            socket.emit('bored:joined', bored);
        }
    });

    socket.on('bored:remove', function (data) {
        if (gameBoreds.remove(data.token)) {
            socket.emit('bored:removed', {
                token: data.token 
            });
        }
    });
};
