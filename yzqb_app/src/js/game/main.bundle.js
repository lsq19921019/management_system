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

module.exports = "<audio  #bgm loop>\n  <source src=\"/assets/bgm.mp3\" type=\"audio/mpeg\">\n</audio>\n<div #container class=\"container\">\n  <canvas #canvas class=\"ground\">\n  </canvas>\n</div>\n<app-joystick #joystick [mode]=\"mode\"></app-joystick>\n<app-speed-up #speedUp></app-speed-up>\n<app-menu [(visibility)]=\"menuVisibility\" (startSingleGame)=\"startSingleGame()\" (startOnlineGame)=\"startOnlineGame()\"> </app-menu>\n<app-rank #rank [score]=\"dragon?.score\"></app-rank>\n<app-gameover [(visibility)]=\"gameoverVisibility\" [score]=\"dragon?.score\" [time]=\"totalTime\"></app-gameover>"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n  width: 100%;\n  height: 100%;\n  background-color: #87CEFA;\n  overflow: hidden; }\n\n.ground {\n  background-color: #fff;\n  box-shadow: 0 6px 14px 0 rgba(0, 0, 0, 0.5), 0 0 0 3px rgba(0, 0, 0, 0.08); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__factory_dragon__ = __webpack_require__("../../../../../src/app/factory/dragon.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__factory_food__ = __webpack_require__("../../../../../src/app/factory/food.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__joystick_joystick_component__ = __webpack_require__("../../../../../src/app/joystick/joystick.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__speed_up_speed_up_component__ = __webpack_require__("../../../../../src/app/speed-up/speed-up.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ws_ws_service__ = __webpack_require__("../../../../../src/app/ws/ws.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__rank_rank_component__ = __webpack_require__("../../../../../src/app/rank/rank.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppComponent = (function () {
    function AppComponent(wsService) {
        this.wsService = wsService;
        this.gridSize = 20;
        this.gridColor = '#f6f6f6';
        this.height = 800;
        this.width = 800;
        this.bot = [];
        this.screenCenter = {
            x: 0,
            y: 0
        };
        this.start = false;
        this.mode = 0;
        // visibility
        this.menuVisibility = true;
        this.gameoverVisibility = false;
        // 加速系数
        this.speedUpCoefficient = 1.6;
        // foods
        this.foods = [];
    }
    AppComponent.prototype.initGame = function () {
        this.bgm.nativeElement.play();
        this.totalTime = 0;
        this.joystick.joystick.init();
        this.speedUp.speedUp.init();
        this.dragon = new __WEBPACK_IMPORTED_MODULE_1__factory_dragon__["a" /* Dragon */]('test', { x: 150, y: 150 }, 0, 200, [{ x: 150, y: 151 }, { x: 150, y: 152 }, { x: 150, y: 153 }, { x: 149, y: 153 }, { x: 148, y: 153 }, { x: 147, y: 152 }, { x: 147, y: 151 },
            { x: 147, y: 152 }, { x: 147, y: 153 }, { x: 147, y: 154 }, { x: 147, y: 155 }, { x: 147, y: 156 }, { x: 147, y: 157 }, { x: 147, y: 158 },
            { x: 147, y: 159 }, { x: 147, y: 160 }, { x: 147, y: 161 }, { x: 147, y: 162 }], 0, '#FF4040');
        this.bot = [];
        this.foods = [];
        this.lastDate = null;
        for (var i = 0; i < 10; i++) {
            this.generatorBot();
        }
        for (var i = 0; i < 10; i++) {
            this.generatorFood();
        }
        this.render();
        this.rank.start();
    };
    AppComponent.prototype.initOnlineGame = function () {
        this.joystick.joystick.init();
        this.speedUp.speedUp.init();
        this.onlineRender();
    };
    AppComponent.prototype.ngOnInit = function () {
        this.ctx = this.groud.nativeElement.getContext('2d');
        if (window.devicePixelRatio) {
            this.groud.nativeElement.style.width = this.width + 'px';
            this.groud.nativeElement.style.height = this.height + 'px';
            this.groud.nativeElement.height = this.height * window.devicePixelRatio;
            this.groud.nativeElement.width = this.width * window.devicePixelRatio;
            this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
    };
    AppComponent.prototype.clearCtx = function (ctx) {
        ctx.clearRect(0, 0, this.width, this.height);
    };
    AppComponent.prototype.renderGroud = function (ctx, position) {
        this.groud.nativeElement.style.transform
            = 'translate(' + (this.screenCenter.x - position.x) + 'px,' + (this.screenCenter.y - position.y) + 'px)';
        ctx.lineWidth = 1;
        for (var x = 0; x < this.height / this.gridSize; x++) {
            ctx.beginPath();
            ctx.lineTo(0, x * this.gridSize);
            ctx.lineTo(this.height, x * this.gridSize);
            ctx.strokeStyle = this.gridColor;
            ctx.stroke();
        }
        for (var x = 0; x < this.width / this.gridSize; x++) {
            ctx.beginPath();
            ctx.lineTo(x * this.gridSize, 0);
            ctx.lineTo(x * this.gridSize, this.width);
            ctx.strokeStyle = this.gridColor;
            ctx.stroke();
        }
    };
    AppComponent.prototype.onlineRender = function () {
        this.screenCenter = {
            x: this.container.nativeElement.offsetWidth / 2,
            y: this.container.nativeElement.offsetHeight / 2
        };
        this.clearCtx(this.ctx);
        this.renderGroud(this.ctx, this.wsService.dragons[this.wsService.id].header);
        for (var i in this.wsService.dragons) {
            if (this.wsService.dragons[i]) {
                this.renderDragon(this.ctx, this.wsService.dragons[i]);
            }
        }
        if (this.start) {
            requestAnimationFrame(this.onlineRender.bind(this));
        }
    };
    AppComponent.prototype.render = function () {
        var _this = this;
        this.screenCenter = {
            x: this.container.nativeElement.offsetWidth / 2,
            y: this.container.nativeElement.offsetHeight / 2
        };
        this.clearCtx(this.ctx);
        var now = Date.now();
        if (!this.lastDate) {
            this.lastDate = now;
        }
        this.update(now - this.lastDate);
        this.renderGroud(this.ctx, this.dragon.header);
        this.foods.forEach(function (food) {
            food.render(_this.ctx);
        });
        this.dragon.render(this.ctx);
        for (var i in this.bot) {
            if (this.bot[i]) {
                this.bot[i].render(this.ctx);
            }
        }
        if (this.collisionDetection()) {
            this.gameOver();
        }
        this.lastDate = now;
        if (this.start) {
            requestAnimationFrame(this.render.bind(this));
            if (!this.botTime || Date.now() - this.botTime >= 5000) {
                this.botTime = Date.now();
                for (var i = 0; i < 8; i++) {
                    this.generatorFood();
                    this.generatorBot();
                }
            }
        }
    };
    AppComponent.prototype.renderDragon = function (ctx, dragon) {
        if (!dragon.alive) {
            return;
        }
        // draw body
        ctx.beginPath();
        ctx.moveTo(dragon.header.x, dragon.header.y);
        dragon.body.forEach(function (position, index) {
            ctx.lineTo(position.x, position.y);
        });
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = dragon.radius * 2;
        ctx.strokeStyle = dragon.color;
        ctx.stroke();
        ctx.closePath();
        // draw header
        ctx.beginPath();
        ctx.fillStyle = dragon.headerColor;
        ctx.arc(dragon.header.x, dragon.header.y, dragon.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        // eyes
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(dragon.header.x + (dragon.radius - 2) * Math.cos(Math.PI * (dragon.direction - 90) / 180), dragon.header.y - (dragon.radius - 2) * Math.sin(Math.PI * (dragon.direction - 90) / 180), 2, 0, 2 * Math.PI);
        ctx.arc(dragon.header.x + (dragon.radius - 2) * Math.cos(Math.PI * (dragon.direction + 90) / 180), dragon.header.y - (dragon.radius - 2) * Math.sin(Math.PI * (dragon.direction + 90) / 180), 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(dragon.header.x + (dragon.radius - 2) * Math.cos(Math.PI * (dragon.direction - 90) / 180), dragon.header.y - (dragon.radius - 2) * Math.sin(Math.PI * (dragon.direction - 90) / 180), 1, 0, 2 * Math.PI);
        ctx.arc(dragon.header.x + (dragon.radius - 2) * Math.cos(Math.PI * (dragon.direction + 90) / 180), dragon.header.y - (dragon.radius - 2) * Math.sin(Math.PI * (dragon.direction + 90) / 180), 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        // mouse
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(dragon.header.x + (dragon.radius - 2) * Math.cos(Math.PI * (dragon.direction) / 180), dragon.header.y - (dragon.radius - 2) * Math.sin(Math.PI * (dragon.direction) / 180), 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        // invincible
        if (dragon.invincible && !dragon.bornInvincibleTimer) {
            dragon.bornInvincibleTimer = setTimeout(function () {
                dragon.invincible = false;
            }, dragon.bornInvincibleTime * 1000);
        }
        if (dragon.invincible) {
            ctx.beginPath();
            var maxD = 0;
            for (var i = 0; i < dragon.body.length; i++) {
                var dx = dragon.body[i].x - dragon.header.x;
                var dy = dragon.body[i].y - dragon.header.y;
                var d = Math.sqrt(dx * dx + dy * dy);
                if (d > maxD) {
                    maxD = d;
                }
            }
            ctx.arc(dragon.header.x, dragon.header.y, dragon.radius + maxD + 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(230, 230, 45, 0.1)';
            ctx.fill();
            ctx.closePath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(250, 250, 50, 0.5)';
            ctx.stroke();
        }
    };
    AppComponent.prototype.update = function (space) {
        if (space >= 30) {
            space = 30;
        }
        this.dragon.move(this.joystick.joystick.angle, this.speedUp.speedUp.touching ? space * this.speedUpCoefficient : space);
        for (var i in this.bot) {
            if (this.bot[i]) {
                this.bot[i].move(this.randomDirection(this.bot[i]), space);
            }
        }
    };
    /**
     * bot 随机方向
     * @param d
     */
    AppComponent.prototype.randomDirection = function (d) {
        var estimates = 70;
        var now = Date.now();
        if (now - d.lastRandomDirc <= 300) {
            return d.direction;
        }
        if (Math.abs((d.header.x - this.width / 2)) + estimates >= this.width / 2 - d.radius) {
            var t = Math.random() > 0.5 ? d.direction + 150 : d.direction - 150;
            t = t > 0 ? t % 360 : 360 + t;
            d.lastRandomDirc = now;
            d.direction = t;
        }
        if (Math.abs((d.header.y - this.height / 2)) + estimates >= this.height / 2 - d.radius) {
            var t = Math.random() > 0.5 ? d.direction + 150 : d.direction - 150;
            t = t > 0 ? t % 360 : 360 + t;
            d.lastRandomDirc = now;
            d.direction = t;
        }
        if (Math.random() >= 0.99) {
            d.lastRandomDirc = now;
            d.direction = Math.random() * 360;
        }
        return d.direction;
    };
    /**
     * @desc 碰撞检测
     */
    AppComponent.prototype.collisionDetection = function () {
        // 人撞墙
        if (this.wallCollisionJudge(this.dragon)) {
            this.dragonDie(this.dragon);
            return true;
        }
        // 人吃食物
        for (var i = 0; i < this.foods.length; i++) {
            if (this.eatJudge(this.dragon, this.foods[i])) {
                this.eat(this.dragon, this.foods[i]);
                i--;
            }
        }
        for (var i = 0; i < this.bot.length; i++) {
            // 机器人 eat food
            for (var j = 0; j < this.foods.length; j++) {
                if (this.eatJudge(this.bot[i], this.foods[j])) {
                    this.eat(this.bot[i], this.foods[j]);
                    j--;
                }
            }
            // 机器人撞墙
            if (this.wallCollisionJudge(this.bot[i])) {
                this.dragonDie(this.bot[i]);
                this.bot.splice(i, 1);
                i--;
                break;
            }
            // 机器人撞人
            if (this.dragonCollisionJudge(this.bot[i], this.dragon)) {
                this.dragonDie(this.bot[i]);
                this.bot.splice(i, 1);
                i--;
                break;
            }
            // 人撞机器人
            if (this.dragonCollisionJudge(this.dragon, this.bot[i])) {
                return true;
            }
            // 机器人撞机器人
            for (var j = 0; j < this.bot.length; j++) {
                if (i !== j && this.dragonCollisionJudge(this.bot[i], this.bot[j])) {
                    this.dragonDie(this.bot[i]);
                    this.bot.splice(i, 1);
                    i--;
                    break;
                }
            }
        }
        return false;
    };
    /**
     * @desc 撞墙检测
     * @param dragon: Dragon
     */
    AppComponent.prototype.wallCollisionJudge = function (dragon) {
        if (Math.abs((dragon.header.x - this.width / 2)) >= this.width / 2 - dragon.radius) {
            return true;
        }
        if (Math.abs((dragon.header.y - this.height / 2)) >= this.height / 2 - dragon.radius) {
            return true;
        }
        return false;
    };
    /**
     * @desc 龙龙碰撞检测
     * @param s: Dragon
     * @param t: Dragon
     */
    AppComponent.prototype.dragonCollisionJudge = function (s, t) {
        if (s.invincible || t.invincible) {
            return false;
        }
        var minD = s.radius + t.radius;
        var hdx = t.header.x - s.header.x;
        var hdy = t.header.y - s.header.y;
        var hd = Math.sqrt(hdx * hdx + hdy * hdy);
        if (hd <= minD && s.body.length < t.body.length) {
            return true;
        }
        for (var i = 0; i < t.body.length; i++) {
            var dx = t.body[i].x - s.header.x;
            var dy = t.body[i].y - s.header.y;
            var d = Math.sqrt(dx * dx + dy * dy);
            if (d <= minD) {
                return true;
            }
        }
        return false;
    };
    AppComponent.prototype.startSingleGame = function () {
        this.start = true;
        this.menuVisibility = false;
        this.initGame();
    };
    AppComponent.prototype.startOnlineGame = function () {
        this.start = true;
        this.menuVisibility = false;
        this.mode = 1;
        // this.wsService.joinGame().subscribe(()=>{
        this.initOnlineGame();
        // });
    };
    AppComponent.prototype.gameOver = function () {
        this.bgm.nativeElement.pause();
        this.start = false;
        this.gameoverVisibility = true;
        this.menuVisibility = true;
        clearInterval(this.botTimer);
        this.totalTime = this.rank.time;
        this.rank.resetTime();
    };
    AppComponent.prototype.generatorBot = function () {
        var header = {
            x: Math.floor(Math.random() * (this.width - 100)) + 50,
            y: Math.floor(Math.random() * (this.height - 100)) + 50,
        };
        var body = [];
        for (var i = 1; i < 20; i++) {
            body.push({
                x: header.x - i,
                y: header.y
            });
        }
        this.bot.push(new __WEBPACK_IMPORTED_MODULE_1__factory_dragon__["a" /* Dragon */]('bot', header, Math.floor(Math.random() * 360), 150, body, 0, '#' + Math.floor(Math.random() * 0xffffff).toString(16)));
    };
    AppComponent.prototype.generatorFood = function (p, energy) {
        if (!p) {
            p = {
                x: Math.floor(Math.random() * this.width - 10) + 5,
                y: Math.floor(Math.random() * this.height - 10) + 5
            };
        }
        if (!energy) {
            energy = Math.ceil(Math.random() * 5);
        }
        this.foods.push(new __WEBPACK_IMPORTED_MODULE_2__factory_food__["a" /* Food */](p, energy));
    };
    AppComponent.prototype.addFoods = function (f) {
        var _this = this;
        f.forEach(function (fd) {
            _this.foods.push(fd);
        });
    };
    AppComponent.prototype.eatJudge = function (dragon, food) {
        var eatRadius = 10;
        if (!food.alive) {
            return false;
        }
        var dx = dragon.header.x - food.position.x;
        var dy = dragon.header.y - food.position.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d <= dragon.radius + food.radius + eatRadius) {
            return true;
        }
        return false;
    };
    AppComponent.prototype.eat = function (dragon, food) {
        var _this = this;
        var energy = food.energy;
        food.die();
        var t = 0;
        var timer = setInterval(function () {
            var dx = dragon.header.x - food.position.x;
            var dy = dragon.header.y - food.position.y;
            food.position.x += dx * t / 5;
            food.position.y += dy * t / 5;
            t++;
            if (t === 5) {
                clearInterval(timer);
                _this.foods.splice(_this.foods.indexOf(food), 1);
                dragon.grow(dragon.body[dragon.body.length - 1], energy);
            }
        }, 40);
    };
    AppComponent.prototype.dragonDie = function (dragon) {
        var _this = this;
        var positons = dragon.die();
        var energy = Math.ceil(positons.length / 25);
        positons = positons.filter(function (v, i) {
            return i % (energy * 5) === 0;
        });
        positons.forEach(function (p) {
            _this.generatorFood(p, energy);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* ViewChild */])('canvas'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* ElementRef */])
    ], AppComponent.prototype, "groud", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* ViewChild */])('container'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* ElementRef */])
    ], AppComponent.prototype, "container", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* ViewChild */])('joystick'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__joystick_joystick_component__["a" /* JoystickComponent */])
    ], AppComponent.prototype, "joystick", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* ViewChild */])('speedUp'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__speed_up_speed_up_component__["a" /* SpeedUpComponent */])
    ], AppComponent.prototype, "speedUp", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* ViewChild */])('rank'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6__rank_rank_component__["a" /* RankComponent */])
    ], AppComponent.prototype, "rank", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* ViewChild */])('bgm'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* ElementRef */])
    ], AppComponent.prototype, "bgm", void 0);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ws_ws_service__["a" /* WsService */]])
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__joystick_joystick_component__ = __webpack_require__("../../../../../src/app/joystick/joystick.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_menu_component__ = __webpack_require__("../../../../../src/app/menu/menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__rank_rank_component__ = __webpack_require__("../../../../../src/app/rank/rank.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__speed_up_speed_up_component__ = __webpack_require__("../../../../../src/app/speed-up/speed-up.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ws_ws_service__ = __webpack_require__("../../../../../src/app/ws/ws.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__room_room_component__ = __webpack_require__("../../../../../src/app/room/room.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__gameover_gameover_component__ = __webpack_require__("../../../../../src/app/gameover/gameover.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_3__joystick_joystick_component__["a" /* JoystickComponent */],
                __WEBPACK_IMPORTED_MODULE_4__menu_menu_component__["a" /* MenuComponent */],
                __WEBPACK_IMPORTED_MODULE_5__rank_rank_component__["a" /* RankComponent */],
                __WEBPACK_IMPORTED_MODULE_6__speed_up_speed_up_component__["a" /* SpeedUpComponent */],
                __WEBPACK_IMPORTED_MODULE_8__room_room_component__["a" /* RoomComponent */],
                __WEBPACK_IMPORTED_MODULE_9__gameover_gameover_component__["a" /* GameoverComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_7__ws_ws_service__["a" /* WsService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/factory/dragon.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dragon; });
/**
 * @desc 求两点间距离
 * @param a: Position
 * @param b: Position
 */
function len(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
/**
 * @desc 求三角形外接圆
 * @param a
 * @param b
 * @param c
 */
function circleOfTriangle(a, b, c) {
    var a1 = 2 * (b.x - a.x), b1 = 2 * (b.y - a.y), c1 = b.x * b.x + b.y * b.y - a.x * a.x - a.y * a.y, a2 = 2 * (c.x - b.x), b2 = 2 * (c.y - b.y), c2 = c.x * c.x + c.y * c.y - b.x * b.x - b.y * b.y;
    var center = {
        x: (c1 * b2 - c2 * b1) / (a1 * b2 - a2 * b1),
        y: (a1 * c2 - a2 * c1) / (a1 * b2 - a2 * b1)
    };
    var circle = {
        center: center,
        radius: len(a, center)
    };
    return circle;
}
/**
 * @desc 最小覆盖圆
 */
function minCircle(pArr) {
    var tempCircle = {
        center: pArr[0],
        radius: 0
    };
    for (var i = 0; i < pArr.length; i++) {
        if (len(pArr[i], tempCircle.center) > tempCircle.radius) {
            tempCircle.center = pArr[i];
            tempCircle.radius = 0;
            for (var j = 0; j < i; j++) {
                if (len(pArr[j], tempCircle.center) > tempCircle.radius) {
                    tempCircle.center = {
                        x: (pArr[i].x + pArr[j].x) / 2,
                        y: (pArr[i].y + pArr[j].y) / 2
                    };
                    tempCircle.radius = len(pArr[i], pArr[j]) / 2;
                    for (var k = 0; k < j; k++) {
                        if (len(pArr[k], tempCircle.center) > tempCircle.radius) {
                            tempCircle = circleOfTriangle(pArr[i], pArr[j], pArr[k]);
                        }
                    }
                }
            }
        }
    }
    return tempCircle;
}
var Dragon = (function () {
    function Dragon(name, header, direction, speed, body, score, color, headerColor) {
        if (name === void 0) { name = 'unknown'; }
        if (headerColor === void 0) { headerColor = 'red'; }
        this.alive = true;
        // 转向速度 angle/ms
        this.turnSpeed = 0.5;
        this.lastRandomDirc = 0;
        this.moveDistance = 0;
        // 无敌
        this.invincible = true;
        this.bornInvincibleTime = 2;
        this.name = name;
        this.header = header;
        this.direction = direction;
        this.speed = speed;
        this.body = body;
        this.score = score;
        this.color = color;
        this.headerColor = headerColor;
    }
    Dragon.prototype.render = function (ctx) {
        var _this = this;
        if (!this.alive) {
            return;
        }
        // draw body
        ctx.beginPath();
        ctx.moveTo(this.header.x, this.header.y);
        this.body.forEach(function (position, index) {
            ctx.lineTo(position.x, position.y);
        });
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = this.radius * 2;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
        // draw header
        ctx.beginPath();
        ctx.fillStyle = this.headerColor;
        ctx.arc(this.header.x, this.header.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        // eyes
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(this.header.x + (this.radius - 4) * Math.cos(Math.PI * (this.direction - 90) / 180), this.header.y - (this.radius - 4) * Math.sin(Math.PI * (this.direction - 90) / 180), 4, 0, 2 * Math.PI);
        ctx.arc(this.header.x + (this.radius - 4) * Math.cos(Math.PI * (this.direction + 90) / 180), this.header.y - (this.radius - 4) * Math.sin(Math.PI * (this.direction + 90) / 180), 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(this.header.x + (this.radius - 4) * Math.cos(Math.PI * (this.direction - 90) / 180), this.header.y - (this.radius - 4) * Math.sin(Math.PI * (this.direction - 90) / 180), 2, 0, 2 * Math.PI);
        ctx.arc(this.header.x + (this.radius - 4) * Math.cos(Math.PI * (this.direction + 90) / 180), this.header.y - (this.radius - 4) * Math.sin(Math.PI * (this.direction + 90) / 180), 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        // mouse
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(this.header.x + (this.radius - this.radius / 6) * Math.cos(Math.PI * (this.direction) / 180), this.header.y - (this.radius - this.radius / 6) * Math.sin(Math.PI * (this.direction) / 180), this.radius / 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        // invincible
        if (this.invincible && !this.bornInvincibleTimer) {
            this.bornInvincibleTimer = setTimeout(function () {
                _this.invincible = false;
            }, this.bornInvincibleTime * 1000);
        }
        if (this.invincible) {
            var circle = minCircle(this.body);
            ctx.beginPath();
            // let maxD = 0;
            // for (let i = 0; i < this.body.length; i++) {
            //     const dx = this.body[i].x - this.header.x;
            //     const dy = this.body[i].y - this.header.y;
            //     const d = Math.sqrt(dx * dx + dy * dy);
            //     if (d > maxD) {
            //         maxD = d;
            //     }
            // }
            ctx.arc(circle.center.x, circle.center.y, circle.radius + this.radius + 4, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(230, 230, 45, 0.1)';
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(250, 250, 50, 0.5)';
            ctx.stroke();
            ctx.closePath();
        }
    };
    Dragon.prototype.move = function (angle, space) {
        var tempRadius = Math.floor(12 + this.body.length / 100);
        this.radius = tempRadius > 20 ? 20 : tempRadius;
        this.speed = 105 + 400 / this.radius;
        // 转向速度 angle/ms
        var turnSpeed = this.turnSpeed;
        if (Math.abs(angle - this.direction) < 180) {
            if (angle - this.direction > 0) {
                if (turnSpeed * space > angle - this.direction) {
                    this.direction = angle;
                }
                else {
                    this.direction += turnSpeed * space;
                }
            }
            else if (angle - this.direction < 0) {
                if (turnSpeed * space > this.direction - angle) {
                    this.direction = angle;
                }
                else {
                    this.direction -= turnSpeed * space;
                }
            }
        }
        if (Math.abs(angle - this.direction) > 180) {
            if (angle - this.direction > 0) {
                this.direction -= turnSpeed * space;
                if (this.direction < 0) {
                    this.direction += 360;
                    if (this.direction < angle) {
                        this.direction = angle;
                    }
                }
            }
            else if (angle - this.direction < 0) {
                this.direction += turnSpeed * space;
                if (this.direction > 360) {
                    this.direction -= 360;
                    if (this.direction > angle) {
                        this.direction = angle;
                    }
                }
            }
        }
        // if (this.direction > 360) {
        //     this.direction -= 360;
        // }
        // if (this.direction < 0) {
        //     this.direction += 360;
        // }
        // 立即转向
        // this.direction = angle;
        var moveX = parseFloat((this.speed * space / 1000 * Math.cos(Math.PI * this.direction / 180)).toFixed(2));
        var moveY = parseFloat((this.speed * space / 1000 * Math.sin(Math.PI * this.direction / 180)).toFixed(2));
        var moveDistance = parseFloat((this.speed * space / 1000).toFixed(2));
        this.moveDistance += moveDistance;
        this.bodyMove({ x: this.header.x + moveX, y: parseFloat((this.header.y - moveY).toFixed(2)) });
        this.header.x += moveX;
        this.header.y -= moveY;
    };
    Dragon.prototype.bodyMove = function (newHeader) {
        if (this.moveDistance >= 1 && this.moveDistance < 2) {
            this.moveDistance = 0;
            this.body.unshift({ x: this.header.x, y: this.header.y });
            this.body.pop();
        }
        if (this.moveDistance >= 2) {
            this.moveDistance = 0;
            var bodyLen = this.body.length;
            var dx = newHeader.x - this.header.x;
            var dy = newHeader.y - this.header.y;
            var tempBody = [];
            this.body.unshift({ x: this.header.x, y: this.header.y });
            if (Math.round(dx) === 0) {
                if (dy > 0) {
                    for (var y = newHeader.y - 1; Math.round(y) > Math.round(this.header.y) && tempBody.length < bodyLen; y--) {
                        tempBody.unshift({ x: newHeader.x, y: y });
                    }
                    for (var i = 0; i < tempBody.length; i++) {
                        this.body.unshift(tempBody[i]);
                    }
                }
                if (dy < 0) {
                    for (var y = newHeader.y + 1; Math.round(y) < Math.round(this.header.y) && tempBody.length < bodyLen; y++) {
                        tempBody.unshift({ x: newHeader.x, y: y });
                    }
                    for (var i = 0; i < tempBody.length; i++) {
                        this.body.unshift(tempBody[i]);
                    }
                }
                this.body.splice(bodyLen);
            }
            if (Math.round(dy) === 0) {
                if (dx > 0) {
                    for (var x = newHeader.x - 1; Math.round(x) > Math.round(this.header.x) && tempBody.length < bodyLen; x--) {
                        tempBody.unshift({ x: x, y: newHeader.y });
                    }
                    for (var i = 0; i < tempBody.length; i++) {
                        this.body.unshift(tempBody[i]);
                    }
                }
                if (dx < 0) {
                    for (var x = newHeader.x + 1; Math.round(x) < Math.round(this.header.x) && tempBody.length < bodyLen; x++) {
                        tempBody.unshift({ x: x, y: newHeader.y });
                    }
                    for (var i = 0; i < tempBody.length; i++) {
                        this.body.unshift(tempBody[i]);
                    }
                }
                this.body.splice(bodyLen);
            }
            if (Math.abs(Math.round(dy)) > 0 && Math.abs(Math.round(dx)) > 0) {
                // y = ax + b; x = (y - b) / a
                var a = this.parseNum(dy / dx, 2);
                var b = this.parseNum(newHeader.y - a * newHeader.x, 2);
                if (Math.abs(a) <= 1 && dx > 0) {
                    for (var x = Math.round(newHeader.x) - 1; Math.round(x) > Math.round(this.header.x) && tempBody.length < bodyLen; x--) {
                        tempBody.unshift({ x: x, y: Math.round(a * x + b) });
                    }
                    for (var i = 0; i < tempBody.length; i++) {
                        this.body.unshift(tempBody[i]);
                    }
                }
                if (Math.abs(a) <= 1 && dx < 0) {
                    for (var x = Math.round(newHeader.x) + 1; Math.round(x) < Math.round(this.header.x) && tempBody.length < bodyLen; x++) {
                        tempBody.unshift({ x: x, y: Math.round(a * x + b) });
                    }
                    for (var i = 0; i < tempBody.length; i++) {
                        this.body.unshift(tempBody[i]);
                    }
                }
                if (Math.abs(a) > 1 && dy > 0) {
                    for (var y = Math.round(newHeader.y) - 1; Math.round(y) > Math.round(this.header.y) && tempBody.length < bodyLen; y--) {
                        tempBody.unshift({ x: Math.round((y - b) / a), y: y });
                    }
                    for (var i = 0; i < tempBody.length; i++) {
                        this.body.unshift(tempBody[i]);
                    }
                }
                if (Math.abs(a) > 1 && dy < 0) {
                    for (var y = Math.round(newHeader.y) + 1; Math.round(y) < Math.round(this.header.y) && tempBody.length < bodyLen; y++) {
                        tempBody.unshift({ x: Math.round((y - b) / a), y: y });
                    }
                    for (var i = 0; i < tempBody.length; i++) {
                        this.body.unshift(tempBody[i]);
                    }
                }
                this.body.splice(bodyLen);
            }
        }
    };
    Dragon.prototype.parseNum = function (num, n) {
        return parseFloat(num.toFixed(n));
    };
    Dragon.prototype.grow = function (p, energy) {
        if (energy === void 0) { energy = 1; }
        this.score += energy;
        if (this.body.length >= 300) {
            return;
        }
        for (var i = 0; i < energy; i++) {
            this.body.push(p);
        }
    };
    Dragon.prototype.die = function () {
        this.alive = false;
        return [].concat(this.header, this.body);
    };
    return Dragon;
}());



/***/ }),

/***/ "../../../../../src/app/factory/food.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Food; });
var Food = (function () {
    function Food(position, energy) {
        if (energy === void 0) { energy = 1; }
        this.radius = 5;
        this.color = '#CAE1E1';
        this.energy = 1;
        this.alive = true;
        this.position = position;
        this.energy = energy;
        this.radius = Math.floor(5 + energy * 0.3);
        if (this.radius >= 9) {
            this.radius = 9;
        }
        this.color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
    }
    Food.prototype.render = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    };
    Food.prototype.die = function () {
        this.alive = false;
    };
    return Food;
}());



/***/ }),

/***/ "../../../../../src/app/factory/joystick.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Joystick; });
var Joystick = (function () {
    function Joystick(position, renderArea, rocker) {
        if (position === void 0) { position = { x: 50, y: 50 }; }
        if (renderArea === void 0) { renderArea = {
            color: '#e5e5e5',
            radius: 50
        }; }
        if (rocker === void 0) { rocker = {
            position: {
                x: 0,
                y: 0
            },
            color: '#aaa',
            radius: 16
        }; }
        this.touching = false;
        this.position = position;
        this.renderArea = renderArea;
        this.rocker = rocker;
    }
    Joystick.prototype.init = function () {
        this.angle = 0;
    };
    Joystick.prototype.moveRocker = function (x, y) {
        if (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) <= this.renderArea.radius - this.rocker.radius) {
            this.rocker.position = {
                x: x,
                y: y
            };
            this.speedCoefficient = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / (this.renderArea.radius - this.rocker.radius);
        }
        else {
            this.rocker.position = {
                x: (this.renderArea.radius - this.rocker.radius) * x / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
                y: (this.renderArea.radius - this.rocker.radius) * y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
            };
            this.speedCoefficient = 1;
        }
    };
    Joystick.prototype.handleTouchstart = function (event) {
        if (event.targetTouches.length !== 1) {
            return;
        }
        this.touching = true;
        this.startX = event.touches[0].clientX;
        this.startY = event.touches[0].clientY;
    };
    Joystick.prototype.handleTouchmove = function (event) {
        if (event.targetTouches.length !== 1) {
            return;
        }
        event.preventDefault();
        var x = event.touches[0].clientX - this.startX;
        var y = event.touches[0].clientY - this.startY;
        this.moveRocker(x, y);
        this.getAngle();
    };
    Joystick.prototype.handleTouchend = function (event) {
        this.touching = false;
        this.moveRocker(0, 0);
    };
    Joystick.prototype.getAngle = function () {
        if (this.rocker.position.x >= 0 && this.rocker.position.y < 0) {
            this.angle = Math.floor((Math.atan((-this.rocker.position.y) / (this.rocker.position.x)) * 180 / Math.PI));
        }
        if (this.rocker.position.x < 0 && this.rocker.position.y < 0) {
            this.angle = Math.floor((Math.atan((this.rocker.position.x) / (this.rocker.position.y)) * 180 / Math.PI)) + 90;
        }
        if (this.rocker.position.x < 0 && this.rocker.position.y >= 0) {
            this.angle = Math.floor((Math.atan((this.rocker.position.x) / (this.rocker.position.y)) * 180 / Math.PI)) + 270;
        }
        if (this.rocker.position.x > 0 && this.rocker.position.y > 0) {
            this.angle = Math.floor((Math.atan((this.rocker.position.x) / (this.rocker.position.y)) * 180 / Math.PI)) + 270;
        }
        return this.angle;
    };
    Joystick.prototype.render = function (ctx) {
        // 区域
        ctx.beginPath();
        ctx.fillStyle = this.renderArea.color;
        ctx.arc(this.position.x, this.position.y, this.renderArea.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        // 摇杆
        ctx.beginPath();
        ctx.fillStyle = this.rocker.color;
        ctx.arc(this.position.x + this.rocker.position.x, this.position.y + this.rocker.position.y, this.rocker.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    };
    return Joystick;
}());



/***/ }),

/***/ "../../../../../src/app/factory/speedUp.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpeedUp; });
var SpeedUp = (function () {
    function SpeedUp(position, renderArea) {
        if (position === void 0) { position = { x: 50, y: 50 }; }
        if (renderArea === void 0) { renderArea = {
            color: '#e5e5e5',
            speedUpColor: '#ccc',
            radius: 50
        }; }
        this.touching = false;
        this.position = position;
        this.renderArea = renderArea;
    }
    SpeedUp.prototype.init = function () {
        this.touching = false;
    };
    SpeedUp.prototype.handleTouchstart = function (event) {
        if (event.targetTouches.length !== 1) {
            return;
        }
        this.touching = true;
    };
    SpeedUp.prototype.handleTouchend = function (event) {
        this.touching = false;
    };
    SpeedUp.prototype.render = function (ctx) {
        // 区域
        ctx.beginPath();
        ctx.fillStyle = this.touching ? this.renderArea.speedUpColor : this.renderArea.color;
        ctx.arc(this.position.x, this.position.y, this.renderArea.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    };
    return SpeedUp;
}());



/***/ }),

/***/ "../../../../../src/app/gameover/gameover.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" *ngIf=\"visibility\">\n  <h1 class=\"title\">GAMEOVER</h1>\n  <div class=\"result\">\n    最终得分： {{score}} 分\n  </div>\n  <div class=\"result\">\n    坚持了: {{time}} 秒\n  </div>\n  <button class=\"closeBtn\" (click)=\"close()\">关闭</button>\n</div>"

/***/ }),

/***/ "../../../../../src/app/gameover/gameover.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100vh;\n  width: 100vw;\n  z-index: 10;\n  background-color: rgba(0, 0, 0, 0.95);\n  text-align: center;\n  padding: 10vh 0;\n  box-sizing: border-box;\n  color: white; }\n\n.title {\n  height: 20vh;\n  line-height: 20vh;\n  font-size: 50px;\n  margin: 5vh 0; }\n\n.result {\n  height: 15vh;\n  line-height: 15vh;\n  font-size: 22px;\n  font-weight: 600; }\n\n.closeBtn {\n  margin-top: 5vh;\n  color: white;\n  height: 30px;\n  line-height: 30px;\n  font-size: 18px;\n  border: none;\n  background: none; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/gameover/gameover.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameoverComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GameoverComponent = (function () {
    function GameoverComponent() {
        this.score = 0;
        this.visibilityChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
    }
    GameoverComponent.prototype.ngOnInit = function () {
    };
    GameoverComponent.prototype.close = function () {
        this.visibilityChange.emit(false);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], GameoverComponent.prototype, "score", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], GameoverComponent.prototype, "time", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Boolean)
    ], GameoverComponent.prototype, "visibility", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", Object)
    ], GameoverComponent.prototype, "visibilityChange", void 0);
    GameoverComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-gameover',
            template: __webpack_require__("../../../../../src/app/gameover/gameover.component.html"),
            styles: [__webpack_require__("../../../../../src/app/gameover/gameover.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], GameoverComponent);
    return GameoverComponent;
}());



/***/ }),

/***/ "../../../../../src/app/joystick/joystick.component.html":
/***/ (function(module, exports) {

module.exports = "<canvas id=\"joystick\" #joystick [height]=\"size\" [width]=\"size\"\n        (touchstart)=\"handleTouch($event)\"\n        (touchmove)=\"handleTouch($event)\"\n        (touchend)=\"handleTouch($event)\">\n\n</canvas>"

/***/ }),

/***/ "../../../../../src/app/joystick/joystick.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#joystick {\n  position: fixed;\n  left: 40px;\n  bottom: 40px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/joystick/joystick.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JoystickComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__factory_joystick__ = __webpack_require__("../../../../../src/app/factory/joystick.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ws_ws_service__ = __webpack_require__("../../../../../src/app/ws/ws.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var JoystickComponent = (function () {
    function JoystickComponent(wsService) {
        this.wsService = wsService;
        this.mode = 0;
        this.joystick = new __WEBPACK_IMPORTED_MODULE_1__factory_joystick__["a" /* Joystick */]();
    }
    JoystickComponent.prototype.ngOnInit = function () {
        this.initSize();
        this.ctx = this.canvas.nativeElement.getContext('2d');
        this.render();
    };
    JoystickComponent.prototype.handleTouch = function (event) {
        switch (event.type) {
            case 'touchstart':
                this.joystick.handleTouchstart(event);
                break;
            case 'touchmove':
                this.joystick.handleTouchmove(event);
                if (this.mode === 1) {
                    this.wsService.changeDirc(this.joystick.angle);
                }
                break;
            case 'touchend':
                this.joystick.handleTouchend(event);
                break;
            default: break;
        }
    };
    JoystickComponent.prototype.render = function () {
        if (this.clientWidth !== document.body.clientWidth) {
            this.initSize();
        }
        this.joystick.render(this.ctx);
        requestAnimationFrame(this.render.bind(this));
    };
    JoystickComponent.prototype.initSize = function () {
        this.clientWidth = document.body.clientWidth;
        this.size = this.clientWidth / 5 > 100 ? 100 : this.clientWidth / 5;
        this.joystick = new __WEBPACK_IMPORTED_MODULE_1__factory_joystick__["a" /* Joystick */]({ x: this.size / 2, y: this.size / 2 }, {
            color: '#e5e5e5',
            radius: this.size / 2
        }, {
            position: {
                x: 0,
                y: 0
            },
            color: '#aaa',
            radius: this.size / 5
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* ViewChild */])('joystick'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* ElementRef */])
    ], JoystickComponent.prototype, "canvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], JoystickComponent.prototype, "mode", void 0);
    JoystickComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-joystick',
            template: __webpack_require__("../../../../../src/app/joystick/joystick.component.html"),
            styles: [__webpack_require__("../../../../../src/app/joystick/joystick.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ws_ws_service__["a" /* WsService */]])
    ], JoystickComponent);
    return JoystickComponent;
}());



/***/ }),

/***/ "../../../../../src/app/menu/menu.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"menu\" *ngIf=\"visibility\">\n  <ul class=\"menu-list\">\n    <h2 class=\"title\">贪吃蛇</h2>\n    <li class=\"menu-item\" >\n      <button (click)=\"singleGame()\"> 开始游戏 </button>\n    </li>\n   </ul>\n  <app-room *ngIf=\"wsService.roomID\" (oStart)=\"startOnlineGame.emit()\"></app-room>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/menu/menu.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".menu {\n  height: 100%;\n  width: 100%;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  background-color: #fff;\n  color: #000;\n  text-align: center; }\n  .menu .menu-list {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    list-style: none; }\n    .menu .menu-list .menu-item {\n      line-height: 50px;\n      height: 50px;\n      font-size: 20px; }\n      .menu .menu-list .menu-item:hover {\n        background-color: #eee; }\n      .menu .menu-list .menu-item button {\n        height: 100%;\n        width: 100%;\n        font-size: 18px;\n        border: none;\n        background: none; }\n  .menu .title {\n    font-size: 40px;\n    line-height: 50px;\n    height: 50px;\n    margin: 30px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/menu/menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ws_ws_service__ = __webpack_require__("../../../../../src/app/ws/ws.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MenuComponent = (function () {
    function MenuComponent(wsService) {
        this.wsService = wsService;
        this.visibilityChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.startSingleGame = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.startOnlineGame = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
    }
    MenuComponent.prototype.ngOnInit = function () {
        // this.wsService.connect().subscribe((data) => {
        // });
    };
    MenuComponent.prototype.hideMenu = function () {
        this.visibilityChange.emit(false);
    };
    MenuComponent.prototype.showMenu = function () {
        this.visibilityChange.emit(true);
    };
    MenuComponent.prototype.createRoom = function () {
        this.wsService.createRoom().subscribe(function (roomID) {
        });
    };
    MenuComponent.prototype.singleGame = function () {
        this.hideMenu();
        this.startSingleGame.emit();
    };
    MenuComponent.prototype.joinRoom = function () {
        var _this = this;
        this.wsService.joinRoom(this.inputRoom).subscribe(function () {
            _this.wsService.roomID = _this.inputRoom;
            _this.waitGameStart();
        }, function (err) {
            alert(err);
        });
    };
    MenuComponent.prototype.waitGameStart = function () {
        var _this = this;
        this.wsService.waitGamestart().subscribe(function () {
            _this.startOnlineGame.emit();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Boolean)
    ], MenuComponent.prototype, "visibility", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", Object)
    ], MenuComponent.prototype, "visibilityChange", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", Object)
    ], MenuComponent.prototype, "startSingleGame", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", Object)
    ], MenuComponent.prototype, "startOnlineGame", void 0);
    MenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-menu',
            template: __webpack_require__("../../../../../src/app/menu/menu.component.html"),
            styles: [__webpack_require__("../../../../../src/app/menu/menu.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ws_ws_service__["a" /* WsService */]])
    ], MenuComponent);
    return MenuComponent;
}());



/***/ }),

/***/ "../../../../../src/app/rank/rank.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"rank\">\n  <div class=\"score\">\n    得分  {{score}}\n  </div>\n  <div class=\"time\">\n    时间  {{time}}\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/rank/rank.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".rank {\n  position: fixed;\n  top: 10px;\n  right: 10px;\n  width: 80px;\n  min-height: 50px;\n  border-radius: 10px;\n  background-color: rgba(43, 78, 233, 0.1);\n  text-align: center; }\n\n.score {\n  font-size: 14px;\n  font-weight: 500;\n  height: 40px;\n  line-height: 40px; }\n\n.time {\n  font-size: 14px;\n  font-weight: 500;\n  height: 40px;\n  line-height: 40px;\n  width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/rank/rank.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RankComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RankComponent = (function () {
    function RankComponent() {
        this.score = 0;
        this.time = 0;
    }
    RankComponent.prototype.ngOnInit = function () {
    };
    RankComponent.prototype.start = function () {
        var _this = this;
        this.timer = setInterval(function () {
            _this.time += 1;
        }, 1000);
    };
    RankComponent.prototype.resetTime = function () {
        this.time = 0;
        try {
            clearInterval(this.timer);
        }
        catch (err) {
            console.log(err);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], RankComponent.prototype, "score", void 0);
    RankComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-rank',
            template: __webpack_require__("../../../../../src/app/rank/rank.component.html"),
            styles: [__webpack_require__("../../../../../src/app/rank/rank.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], RankComponent);
    return RankComponent;
}());



/***/ }),

/***/ "../../../../../src/app/room/room.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"room\">\n  <h1>房间号：{{wsService.roomID}} </h1>\n  <ul class=\"userList\">\n    <li *ngFor=\"let user of userList;let i = index\" class=\"userItem\">\n      {{i + 1}} {{user.userName}}\n    </li>\n  </ul>\n  <div *ngIf=\"wsService.roomMaster\" (click)=\"startGame()\" class=\"startBtn\"> start </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/room/room.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".room {\n  padding-top: 10px;\n  height: 100%;\n  width: 100%;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2;\n  background-color: #fff;\n  color: #000;\n  text-align: center; }\n  .room .userList {\n    margin-top: 10px; }\n  .room .userItem {\n    line-height: 30px;\n    height: 30px;\n    font-size: 18px; }\n  .room .startBtn {\n    height: 30px;\n    width: 50px;\n    background-color: #eee;\n    margin: 0 auto; }\n    .room .startBtn:active {\n      background-color: #aaa; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/room/room.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ws_ws_service__ = __webpack_require__("../../../../../src/app/ws/ws.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RoomComponent = (function () {
    function RoomComponent(wsService) {
        this.wsService = wsService;
        this.oStart = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.userList = [];
    }
    RoomComponent.prototype.ngOnInit = function () {
        this.updateUserList();
    };
    RoomComponent.prototype.updateUserList = function () {
        var _this = this;
        this.wsService.socket.on('userList', function (data) {
            _this.userList = data;
        });
    };
    RoomComponent.prototype.startGame = function () {
        var _this = this;
        this.wsService.startGame().subscribe(function () {
            _this.oStart.emit();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", Object)
    ], RoomComponent.prototype, "oStart", void 0);
    RoomComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-room',
            template: __webpack_require__("../../../../../src/app/room/room.component.html"),
            styles: [__webpack_require__("../../../../../src/app/room/room.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ws_ws_service__["a" /* WsService */]])
    ], RoomComponent);
    return RoomComponent;
}());



/***/ }),

/***/ "../../../../../src/app/speed-up/speed-up.component.html":
/***/ (function(module, exports) {

module.exports = "<canvas id=\"speedUp\" #speedUp [height]=\"size\" [width]=\"size\"\n        (touchstart)=\"handleTouch($event)\"\n        (touchend)=\"handleTouch($event)\">\n\n</canvas>"

/***/ }),

/***/ "../../../../../src/app/speed-up/speed-up.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#speedUp {\n  position: fixed;\n  right: 40px;\n  bottom: 40px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/speed-up/speed-up.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpeedUpComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__factory_speedUp__ = __webpack_require__("../../../../../src/app/factory/speedUp.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SpeedUpComponent = (function () {
    function SpeedUpComponent() {
        this.initSize();
    }
    SpeedUpComponent.prototype.ngOnInit = function () {
        this.ctx = this.canvas.nativeElement.getContext('2d');
        this.render();
    };
    SpeedUpComponent.prototype.render = function () {
        if (this.clientWidth !== document.body.clientWidth) {
            this.initSize();
        }
        this.speedUp.render(this.ctx);
        requestAnimationFrame(this.render.bind(this));
    };
    SpeedUpComponent.prototype.handleTouch = function (event) {
        switch (event.type) {
            case 'touchstart':
                this.speedUp.handleTouchstart(event);
                break;
            case 'touchend':
                this.speedUp.handleTouchend(event);
                break;
            default: break;
        }
    };
    SpeedUpComponent.prototype.initSize = function () {
        this.clientWidth = document.body.clientWidth;
        this.size = this.clientWidth / 5 > 100 ? 100 : this.clientWidth / 5;
        this.speedUp = new __WEBPACK_IMPORTED_MODULE_1__factory_speedUp__["a" /* SpeedUp */]({ x: this.size / 2, y: this.size / 2 }, {
            color: '#e5e5e5',
            speedUpColor: '#ccc',
            radius: this.size / 2
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* ViewChild */])('speedUp'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* ElementRef */])
    ], SpeedUpComponent.prototype, "canvas", void 0);
    SpeedUpComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-speed-up',
            template: __webpack_require__("../../../../../src/app/speed-up/speed-up.component.html"),
            styles: [__webpack_require__("../../../../../src/app/speed-up/speed-up.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SpeedUpComponent);
    return SpeedUpComponent;
}());



/***/ }),

/***/ "../../../../../src/app/ws/ws.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io_client__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WsService = (function () {
    function WsService() {
        this.host = '192.168.43.82:9091';
    }
    WsService.prototype.connect = function () {
        var _this = this;
        this.socket = __WEBPACK_IMPORTED_MODULE_2_socket_io_client__(this.host);
        var observable = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.socket.on('connect', function () {
                observer.next('连接成功');
            });
        });
        this.socket.on('userID', function (data) {
            _this.id = data.id;
        });
        return observable;
    };
    WsService.prototype.changeDirc = function (angle) {
        this.socket.emit('changeDirc', { angle: angle });
    };
    WsService.prototype.joinRoom = function (roomID) {
        var _this = this;
        this.socket.emit('joinRoom', { roomID: roomID });
        this.socket.on('userList', function (data) {
            _this.roomUserList = data.userList;
        });
        var observable = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.socket.on('joinState', function (data) {
                if (data.returnCode === 0) {
                    _this.roomID = data.roomID;
                    observer.next(data.roomID);
                }
                else {
                    observer.error(data.returnCodeMessage);
                }
            });
        });
        return observable;
    };
    WsService.prototype.leaveRoom = function () {
        this.socket.emit('leaveRoom');
    };
    WsService.prototype.createRoom = function () {
        var _this = this;
        this.socket.emit('createRoom');
        var observable = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.socket.on('roomID', function (data) {
                _this.roomID = data.roomID;
                _this.roomMaster = true;
                observer.next(data.roomID);
            });
        });
        return observable;
    };
    WsService.prototype.startGame = function () {
        var _this = this;
        this.socket.emit('startGame');
        var observable = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.socket.on('start', function () {
                observer.next();
            });
        });
        this.socket.on('dragons', function (data) {
            _this.dragons = data.dragons;
        });
        this.socket.on('die', function (score) {
            alert('you die! score:' + score);
        });
        this.socket.on('win', function (score) {
            alert('you win! score:' + score);
        });
        return observable;
    };
    WsService.prototype.waitGamestart = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */](function (observer) {
            _this.socket.on('start', function () {
                observer.next();
            });
            _this.socket.on('dragons', function (data) {
                _this.dragons = data.dragons;
            });
        });
        return observable;
    };
    WsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], WsService);
    return WsService;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map