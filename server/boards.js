var gameBoards = (function () {
    var boards = {};

    // TODO Update this to use time stamps
    var randomToken = function () {
        return Math.floor(100000 + Math.random() * 900000);
    };

    var uniqueToken = function () {
        var token = randomToken();
        do {
            token = randomToken();
        } while (boards[token] !== undefined);
        return token;
    };

    var create = function (name) {
        var board = new Board(uniqueToken(), name);
        boards[board.token] = board;
        return board;
    };

    var join = function (token, name) {
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

    var remove = function (token) {
        if (boards[token.toString()]) {
            delete boards[token.toString()];
            return true;
        }
        return false;
    };

    var place = function(token, row, col, callback) {
        var board = get(token);
        if (board) {
            // TODO Test validSector() a bit more
            if (board.tiles[row][col].used == false && validSector(board, row, col)) {

                board.currentX = col;
                board.currentY = row;

                board.tiles[row][col].used = true;
                board.tiles[row][col].class = (board.turn == 0) ? 'cross' : 'nought';

                board = calculate(board);
                if (board.winner == undefined) board.turn = (board.turn == 0) ? 1 : 0;
                set(token, board);
                callback(board);
            }
        }
    }

    var validSector = function (board, row, col) {
        if (board.currentY == undefined && board.currentX == undefined) return true;

        if (Math.floor(row / 3) == board.currentY % 3) {
            if (Math.floor(col / 3) == board.currentX % 3) return true;
        }

        var filled = true;
        const sectorX = Math.floor(board.currentX % 3) * 3;
        const sectorY = Math.floor(board.currentY % 3) * 3;
        for (var y = 0; y < 3; y++) {
            if (!filled) continue;
            for (var x = 0; x < 3; x++) {
                if (!filled) continue;
                if (board.tiles[sectorY + y][sectorX + x].used == false) filled = false;
            }
        }
        if (filled) return true;

        return false;
    }

    var calculate = function (board) {
        for (var sY = 0; sY < 3; sY++) {
            for (var sX = 0; sX < 3; sX++) {
                if (board.results[sY][sX].class.length == 0) {
                    const y = sY * 3, x = sX * 3;
                    var compleate = false;

                    var tClass = board.tiles[y][x].class;

                    for (var tY = y; tY < y + 3; tY++) {
                        tClass = board.tiles[tY][x].class;
                        if (tClass.length == 0) continue;
                        if (tClass == board.tiles[tY][x + 1].class && tClass == board.tiles[tY][x + 2].class) {
                            board.results[sY][sX].class = tClass;
                            compleate = true;
                        }
                    }
                    if (compleate) continue;

                    for (var tX = x; tX < x + 3; tX++) {
                        tClass = board.tiles[y][tX].class;
                        if (tClass.length == 0) continue;
                        if (tClass == board.tiles[y + 1][tX].class && tClass == board.tiles[y + 2][tX].class) {
                            board.results[sY][sX].class = tClass;
                            compleate = true;
                        }
                    }
                    if (compleate) continue;

                    tClass = board.tiles[y][x].class;
                    if (tClass.length > 0) {
                        if (tClass == board.tiles[y + 1][x + 1].class && tClass == board.tiles[y + 2][x + 2].class) {
                            board.results[sY][sX].class = tClass;
                            compleate = true;
                        }
                    }
                    if (compleate) continue;

                    tClass = board.tiles[y + 2][x].class;
                    if (tClass.length > 0) {
                        if (tClass == board.tiles[y + 1][x + 1].class && tClass == board.tiles[y][x + 2].class) {
                            board.results[sY][sX].class = tClass;
                            compleate = true;
                        }
                    }
                    if (compleate) continue;
                }
            }
        }

        var winner = undefined;
        for (var i = 0; i < 3; i++) {
            if (tilesEqual(board.results[i][0], board.results[i][1], board.results[i][2])) winner = -1;
        }
        if (winner == undefined) for (var i = 0; i < 3; i++) {
            if (tilesEqual(board.results[0][i], board.results[1][i], board.results[2][i])) winner = -1;
        }
        if (winner == undefined && tilesEqual(board.results[0][0], board.results[1][1], board.results[2][2])) winner = -1;
        if (winner == undefined && tilesEqual(board.results[0][2], board.results[1][1], board.results[2][0])) winner = -1;
        if (winner != undefined) board.winner = board.turn;
        else {
            var filled = true;
            for (var y = 0; y < 3; y++) {
                if (!filled) continue;
                for (var x = 0; x < 3; x++) {
                    if (!filled) continue;
                    if (board.results[y][x].class.length = 0) filled = false;
                }
            }
            if (filled) board.winner = -1;
        }
        return board;
    }

    var tilesEqual = function(tile1, tile2, tile3) {
        const tClass = tile1.class;
        if (tClass.length == 0) return false;
        return tile2.class == tClass && tile3.class == tClass;
    }

    return {
        create: create,
        join: join,
        remove: remove,
        get: get,
        place: place,
        length: Object.keys(boards).length
    };
}());

var Board = function (token, name) {
    if (!(this instanceof Board)) {
        return new Board(tokenname, name);
    }

    this.names = [ name ];
    this.token = token;
    this.turn = 0;
    this.tiles = [];
    this.results = [];
    this.currentX = undefined, currentY = undefined;
    this.winner = undefined;

    for (var y = 0; y < 9; y++) {
        this.tiles[y] = [];
        for (var x = 0; x < 9; x++) {
            this.tiles[y][x] = { used: false, class: '' };
        }
    }

    for (var y = 0; y < 3; y++) {
        this.results[y] = [];
        for (var x = 0; x < 3; x++) {
            this.results[y][x] = { class: '' };
        }
    }
};

module.exports = gameBoards;