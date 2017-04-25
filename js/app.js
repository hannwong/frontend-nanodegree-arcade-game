var Entity = function() {
    this.x = 1;
    this.y = 1;

    this.xGridStart = 0;
    this.xGridStep = 101;
    this.yGridStart = 60;
    this.yGridStep = 83;

    this.showBoundBox = false;
};

Entity.prototype.getBoundBox = function() {
    return {x: this.x + this.boundingBox.xOffset,
            y: this.y + this.boundingBox.yOffset,
            width: this.boundingBox.width,
            height: this.boundingBox.height};
};

// Draw the entity on the screen, required method for game
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    if (this.showBoundBox) {
        var boundBox = this.getBoundBox();
        ctx.beginPath();
        ctx.rect(boundBox.x, boundBox.y, boundBox.width, boundBox.height);
        ctx.stroke();
        ctx.closePath();
    }
};

// Enemies our player must avoid
var Enemy = function() {
    Entity.call(this);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.boundingBox = {xOffset: 1, yOffset: 75, width: 98, height: 80};

    // Indicates the enemy is off the screen.
    this.xMax = this.xGridStart + 5 * this.xGridStep;
    this.xMin = 0 - this.xGridStep;

    this.init();
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Initializes enemy to starting state.
Enemy.prototype.init = function() {
    this.randomize();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks (unit: second)
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x > this.xMax) {
        this.init();
    }
};

// Also resets enemy when it has completed its journey.
Enemy.prototype.randomize = function() {
    this.speed = getRandomIntInclusive(100, 300); // Pixels per second.
    this.row = getRandomIntInclusive(0, 2);

    this.y = this.yGridStart + this.yGridStep * this.row;
    this.x = this.xMin;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    Entity.call(this);
    this.init();

    this.xMax = this.xGridStart + 4 * this.xGridStep;
    this.yMax = this.yGridStart + 4 * this.yGridStep;

    this.sprite = 'images/char-boy.png';

    this.boundingBox = {xOffset: 18, yOffset: 75, width: 66, height: 80};
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

// Initializes player to starting state.
Player.prototype.init = function() {
    this.x = this.xGridStart + this.xGridStep * 2;
    this.y = this.yGridStart + this.yGridStep * 4;

    this.won = false;
};

Player.prototype.update = function() { };

Player.prototype.handleInput = function(key) {
    switch (key) {
    case 'left':
        this.x -= this.xGridStep;
        if (this.x < this.xGridStart) this.x = this.xGridStart;
        break;
    case 'right':
        this.x += this.xGridStep;
        if (this.x > this.xMax) this.x = this.xMax;
        break;
    case 'up':
        this.y -= this.yGridStep;
        if (this.y < this.yGridStart) {
            // Game is won!
            player.won = true;
        }
        break;
    case 'down':
        this.y += this.yGridStep;
        if (this.y > this.yMax) this.y = this.yMax;
        break;
    default:
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
