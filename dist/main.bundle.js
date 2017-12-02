webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-dark bg-dark navbar-expand-lg\" *ngIf=\"navbar\">\r\n    <a class=\"navbar-brand\" href=\"/\">\r\n        <img src=\"favicon.ico\" width=\"30\" height=\"30\" class=\"d-inline-block align-top\" alt=\"\">\r\n        {{ title }}\r\n    </a>\r\n    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNav\" aria-controls=\"navbarNav\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n        <span class=\"navbar-toggler-icon\"></span>\r\n    </button>\r\n    <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\r\n        <ul class=\"navbar-nav\">\r\n            <li class=\"nav-item active\">\r\n                <a class=\"nav-link\" href=\"/index.html\">Home <span class=\"sr-only\">(current)</span></a>\r\n            </li>\r\n            <li class=\"nav-item\">\r\n                <a class=\"nav-link\" href=\"https://github.com/roryclaasen/AngularTicTacToe/\">Source Code</a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</nav>\r\n\r\n<div class=\"layout\">\r\n    <div class=\"center\">\r\n        <div *ngIf=\"!loaded\">\r\n            <div class=\"mb-4 text-white text-center\">\r\n                <h1>{{ (username.length > 0 ) ? username : 'Tic-Tac-Toe' }}</h1>\r\n            </div>\r\n            \r\n            <div class=\"card mx-auto\" style=\"max-width: 30rem;\">\r\n                <div class=\"card-header\">{{ inputPrompt }}</div>\r\n                <div class=\"card-body\">\r\n                    <div class=\"card-text\">\r\n                        <div class=\"input-group\">\r\n                            <input type=\"{{ inputType }}\" class=\"form-control\" placeholder=\"{{ inputLabel }}\" [attr.aria-label]=\"inputLabel\" maxlength=\"{{ (inputType == 'text') ? 24 : 6 }}\"\r\n                                [(ngModel)]='input'>\r\n                        </div>\r\n                    </div>\r\n                    <button class=\"btn btn-warning mt-3 float-left\" (click)='resetInputs()' *ngIf=\"username.length > 0\">Back</button>\r\n                    <button class=\"btn btn-success mt-3 ml-2 float-right\" (click)='validate()' [ngClass]=\"(input.length==0) ? 'disabled' : ''\">Continue</button>\r\n                    <button class=\"btn btn-primary mt-3 float-right\" (click)='createServer()' *ngIf=\"username.length > 0\">Create Server</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <app-game *ngIf=\"loaded\" [gameData]=\"inputs\"></app-game>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'TicTacToe';
        this.navbar = false;
        this.loaded = false; // false;
        this.inputPrompt = 'Enter your username';
        this.inputLabel = 'Username';
        this.input = '';
        this.inputType = 'text';
        this.username = '';
        this.gamePin = '';
        this.inputs = {
            'id': '',
            'username': ''
        };
    }
    AppComponent.prototype.validate = function () {
        var input = this.input;
        var length = input.length;
        if (length > 0) {
            if (this.username.length === 0) {
                this.username = input;
                this.input = '';
                this.inputPrompt = 'Enter the Game Pin or Create a server';
                this.inputLabel = 'Game Pin';
                this.inputType = 'number';
            }
            else {
                this.join(input);
            }
        }
    };
    AppComponent.prototype.resetInputs = function () {
        this.username = this.input = '';
        this.inputType = 'text';
        this.inputPrompt = 'Enter your username';
        this.inputLabel = 'Username';
    };
    AppComponent.prototype.createServer = function () {
        this.join(this.getUniqueId());
    };
    AppComponent.prototype.join = function (gamePin) {
        this.gamePin = gamePin;
        this.inputs = {
            'id': this.gamePin,
            'username': this.username
        };
        this.loaded = true;
    };
    AppComponent.prototype.getUniqueId = function () {
        return Math.floor(100000 + Math.random() * 900000);
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__game_game_compontent__ = __webpack_require__("../../../../../src/app/game/game.compontent.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';






var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__game_game_compontent__["a" /* GameComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                // BrowserAnimationsModule,
                __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastModule"].forRoot()
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/board.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BoardService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board__ = __webpack_require__("../../../../../src/app/board.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BoardService = (function () {
    function BoardService() {
    }
    BoardService.prototype.createBoard = function (size) {
        if (size === void 0) { size = 9; }
        var tiles = [];
        for (var y = 0; y < size; y++) {
            tiles[y] = [];
            for (var x = 0; x < size; x++) {
                tiles[y][x] = { used: false, class: '', status: '' };
            }
        }
        this.board = new __WEBPACK_IMPORTED_MODULE_1__board__["a" /* Board */]({
            tiles: tiles
        });
        return this.createResultsBoard(3);
    };
    BoardService.prototype.createResultsBoard = function (size) {
        if (size === void 0) { size = 3; }
        var tiles = [];
        for (var y = 0; y < size; y++) {
            tiles[y] = [];
            for (var x = 0; x < size; x++) {
                tiles[y][x] = { class: '' };
            }
        }
        this.results = new __WEBPACK_IMPORTED_MODULE_1__board__["a" /* Board */]({
            tiles: tiles
        });
        return this;
    };
    BoardService.prototype.calculateResults = function () {
        for (var sY = 0; sY < 3; sY++) {
            for (var sX = 0; sX < 3; sX++) {
                if (this.results.tiles[sY][sX].class.length === 0) {
                    var y = sY * 3, x = sX * 3;
                    var compleate = false;
                    var tClass = this.board.tiles[y][x].class;
                    for (var tY = y; tY < y + 3; tY++) {
                        tClass = this.board.tiles[tY][x].class;
                        if (tClass.length === 0) {
                            continue;
                        }
                        if (tClass === this.board.tiles[tY][x + 1].class && tClass === this.board.tiles[tY][x + 2].class) {
                            this.results.tiles[sY][sX].class = tClass;
                            compleate = true;
                        }
                    }
                    if (compleate) {
                        continue;
                    }
                    for (var tX = x; tX < x + 3; tX++) {
                        tClass = this.board.tiles[y][tX].class;
                        if (tClass.length === 0) {
                            continue;
                        }
                        if (tClass === this.board.tiles[y + 1][tX].class && tClass === this.board.tiles[y + 2][tX].class) {
                            this.results.tiles[sY][sX].class = tClass;
                            compleate = true;
                        }
                    }
                    if (compleate) {
                        continue;
                    }
                    tClass = this.board.tiles[y][x].class;
                    if (tClass.length > 0) {
                        if (tClass === this.board.tiles[y + 1][x + 1].class && tClass === this.board.tiles[y + 2][x + 2].class) {
                            this.results.tiles[sY][sX].class = tClass;
                            compleate = true;
                        }
                    }
                    if (compleate) {
                        continue;
                    }
                    tClass = this.board.tiles[y + 2][x].class;
                    if (tClass.length > 0) {
                        if (tClass === this.board.tiles[y + 1][x + 1].class && tClass === this.board.tiles[y][x + 2].class) {
                            this.results.tiles[sY][sX].class = tClass;
                            compleate = true;
                        }
                    }
                }
            }
        }
        return this;
    };
    BoardService.prototype.getBoard = function () {
        return this.board;
    };
    BoardService.prototype.getResultBoard = function () {
        return this.results;
    };
    BoardService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], BoardService);
    return BoardService;
}());



/***/ }),

/***/ "../../../../../src/app/board.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Board; });
var Board = (function () {
    function Board(values) {
        if (values === void 0) { values = {}; }
        Object.assign(this, values);
    }
    return Board;
}());



/***/ }),

/***/ "../../../../../src/app/game/game.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"card mx-auto\">\r\n        <div class=\"card-header\" *ngIf=\"players < 2 \">Waiting for 2nd user to join...</div>\r\n        <div class=\"card-body\">\r\n            <div class=\"card-text\" *ngIf=\"players < 2 \">\r\n                <h3>{{ gameData.id }}</h3>\r\n                Tell your friend to use <b>{{ gameData.id }}</b> as the game pin\r\n            </div>\r\n            <div class=\"card-text\" *ngIf=\"player > 1\">\r\n                Sorry, only 2 players can play at a time. You can start your own game by visiting\r\n                <a href=\"{{ gameUrl }}\">{{ gameUrl }}</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div *ngIf=\"players == 2\">\r\n        <div class=\"col-7\">\r\n            <table class=\"grid is-bordered float-right\">\r\n                <tbody>\r\n                    <tr *ngFor=\"let row of board.tiles; let y = index\">\r\n                        <td *ngFor=\"let col of row; let x = index\" (click)=\"place($event)\" id=\"t{{y}}{{x}}\" [ngClass]=\"validSector(y, x) ? '' : 'disabled'\">\r\n                            <div class=\"color\" [ngClass]=\"col.class\"></div>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <div class=\"col-5\">\r\n            <div class=\"d-table h-100\">\r\n                <div class=\"d-table-cell align-middle h-100\">\r\n                    <table class=\"grid is-bordered results float-left\">\r\n                        <tbody>\r\n                            <tr *ngFor=\"let row of resultBoard.tiles; let y = index\">\r\n                                <td *ngFor=\"let col of row; let x = index\" id=\"t{{y}}{{x}}\">\r\n                                    <div class=\"color\" [ngClass]=\"col.class\"></div>\r\n                                </td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/game/game.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "table.grid {\n  border: solid 4px black;\n  margin: auto; }\n  table.grid:not(.results) tr:nth-child(3), table.grid:not(.results) tr:nth-child(6) {\n    border-bottom: solid 4px black; }\n  table.grid:not(.results) tr td {\n    border: solid 1px black; }\n    table.grid:not(.results) tr td:nth-child(3), table.grid:not(.results) tr td:nth-child(6) {\n      border-right: solid 4px black; }\n    table.grid:not(.results) tr td:not(.disabled):hover {\n      background-color: #cccccc;\n      cursor: pointer; }\n  table.grid tr td {\n    border: solid 1px black;\n    width: 50px;\n    height: 50px;\n    padding: 0;\n    background: white; }\n    table.grid tr td.disabled {\n      background-color: #666666;\n      cursor: default; }\n    table.grid tr td .color.cross {\n      background-color: red; }\n    table.grid tr td .color.nought {\n      background-color: blue; }\n    table.grid tr td .color {\n      height: 100%;\n      pointer-events: none; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/game/game.compontent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__board_service__ = __webpack_require__("../../../../../src/app/board.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NUM_PLAYERS = 2;
var BOARD_SIZE = 9;
var GameComponent = (function () {
    function GameComponent(boardService, toastr, _vcr) {
        this.boardService = boardService;
        this.toastr = toastr;
        this._vcr = _vcr;
        this.canPlay = true;
        this.player = 0;
        this.players = 0;
        this.valuesEntered = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.winner = false;
        this.gameUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
        this.toastr.setRootViewContainerRef(_vcr);
        this.createBoard();
        this.initPusher();
    }
    Object.defineProperty(GameComponent.prototype, "gameData", {
        get: function () {
            return this._gameData;
        },
        set: function (value) {
            this._gameData = value;
            this.valuesEntered.next({ value: 'changed to ' + this._gameData });
            console.log(value);
            this.initPusher();
            this.listenForChanges();
        },
        enumerable: true,
        configurable: true
    });
    GameComponent.prototype.initPusher = function () {
        var _this = this;
        var pusher = new Pusher('98657ea4123db5df46a6', {
            authEndpoint: '/pusher/auth',
            cluster: 'eu'
        });
        this.pusherChannel = pusher.subscribe(this.gameData.id);
        this.pusherChannel.bind('pusher:member_added', function (member) { return _this.players++; });
        this.pusherChannel.bind('pusher:subscription_succeeded', function (members) {
            _this.players = members.count;
            _this.setPlayer(_this.players);
            _this.toastr.success('Success', 'Connected!');
        });
        this.pusherChannel.bind('pusher:member_removed', function (member) { return _this.players--; });
        return this;
    };
    GameComponent.prototype.listenForChanges = function () {
        var _this = this;
        this.pusherChannel.bind('client-fire', function (obj) {
            _this.canPlay = !_this.canPlay;
            _this.board[obj.boardId] = obj.board;
        });
        return this;
    };
    GameComponent.prototype.setPlayer = function (players) {
        if (players === void 0) { players = 0; }
        this.player = players - 1;
        if (players === 1) {
            this.canPlay = true;
        }
        else if (players === 2) {
            this.canPlay = false;
        }
        return this;
    };
    GameComponent.prototype.place = function (e) {
        var id = e.target.id, row = id.substring(1, 2), col = id.substring(2, 3), tile = this.board.tiles[row][col];
        if (!this.checkValidHit(row, col, tile)) {
            return;
        }
        this.currentY = row;
        this.currentX = col;
        this.board.tiles[row][col].used = true;
        this.board.tiles[row][col].class = (this.player === 1) ? 'cross' : 'nought'; // TODO get player color
        this.boardService.calculateResults();
        this.pusherChannel.trigger('client-fire', {
            player: this.player,
            board: this.board
        });
        return this;
    };
    GameComponent.prototype.checkValidHit = function (row, col, tile) {
        if (this.winner) {
            return false;
        }
        if (tile.class.length > 0) {
            return false;
        }
        if (!this.validSector(row, col)) {
            return false;
        }
        return true;
    };
    GameComponent.prototype.createBoard = function () {
        this.boardService.createBoard(BOARD_SIZE);
        return this;
    };
    Object.defineProperty(GameComponent.prototype, "board", {
        get: function () {
            return this.boardService.getBoard();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameComponent.prototype, "resultBoard", {
        get: function () {
            return this.boardService.getResultBoard();
        },
        enumerable: true,
        configurable: true
    });
    GameComponent.prototype.validSector = function (row, col) {
        if (this.currentY === undefined && this.currentX === undefined) {
            return true;
        }
        if (Math.floor(row / 3) === this.currentY % 3) {
            if (Math.floor(col / 3) === this.currentX % 3) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(GameComponent.prototype, "validPlayer", {
        get: function () {
            return (this.players >= NUM_PLAYERS) && (this.player < NUM_PLAYERS);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], GameComponent.prototype, "valuesEntered", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], GameComponent.prototype, "gameData", null);
    GameComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-game',
            template: __webpack_require__("../../../../../src/app/game/game.component.html"),
            styles: [__webpack_require__("../../../../../src/app/game/game.component.scss")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__board_service__["a" /* BoardService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__board_service__["a" /* BoardService */], __WEBPACK_IMPORTED_MODULE_1_ng2_toastr_ng2_toastr__["ToastsManager"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]])
    ], GameComponent);
    return GameComponent;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]).catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map