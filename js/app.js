/**
 * Superclass for all entities (Enemy, Player) in the game.
 * @constructor
 */
var Entity = function() {
    this.x = 1;
    this.y = 1;

    this.X_GRID_START = 0;
    this.X_GRID_STEP = 101;
    this.Y_GRID_START = 60;
    this.Y_GRID_STEP = 83;

    this.showBoundBox = false;
};

/**
 * Returns the bounding box for the entity.
 * Requires that subclasses have attribute 'boundingBox'.
 * @method
 * @return {x, y, width, height}
 */
Entity.prototype.getBoundBox = function() {
    return {x: this.x + this.boundingBox.xOffset,
            y: this.y + this.boundingBox.yOffset,
            width: this.boundingBox.width,
            height: this.boundingBox.height};
};

/**
 * Draws the entity on the screen, required method for game
 * @method
 */
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

/**
 * Enemies our player must avoid. Subclass of Entity.
 * @constructor
 */
var Enemy = function() {
    Entity.call(this);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.boundingBox = {xOffset: 1, yOffset: 75, width: 98, height: 80};

    // Indicates the enemy is off the screen.
    this.xMax = this.X_GRID_START + 5 * this.X_GRID_STEP;
    this.xMin = 0 - this.X_GRID_STEP;

    this.init();
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * Initializes enemy to starting state.
 * @method
 */
Enemy.prototype.init = function() {
    this.randomize();
};

/**
 * Update the enemy's position, required method for game
 * @method
 * @param {float} dt - a time delta between ticks (unit: second)
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x > this.xMax) {
        this.init();
    }
};

/**
 * Randomizes starting row and speed of the enemy.
 * Also resets enemy when it has completed its journey.
 * @method
 */
Enemy.prototype.randomize = function() {
    this.speed = getRandomIntInclusive(100, 300); // Pixels per second.
    this.row = getRandomIntInclusive(0, 2);

    this.y = this.Y_GRID_START + this.Y_GRID_STEP * this.row;
    this.x = this.xMin;
};

/**
 * Our player entity. Subclass of Entity.
 * @constructor
 */
var Player = function() {
    Entity.call(this);
    this.init();

    this.xMax = this.X_GRID_START + 4 * this.X_GRID_STEP;
    this.yMax = this.Y_GRID_START + 4 * this.Y_GRID_STEP;

    this.sprite = 'images/char-boy.png';

    this.boundingBox = {xOffset: 18, yOffset: 75, width: 66, height: 80};
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

/**
 * Initializes player to starting state.
 */
Player.prototype.init = function() {
    this.x = this.X_GRID_START + this.X_GRID_STEP * 2;
    this.y = this.Y_GRID_START + this.Y_GRID_STEP * 4;

    this.won = false;
};

Player.prototype.update = function() { };

/**
 * Handles input from player.
 * @method
 * @param {string} key - 'left', 'right', 'up' or 'down'
 */
Player.prototype.handleInput = function(key) {
    switch (key) {
    case 'left':
        this.x -= this.X_GRID_STEP;
        if (this.x < this.X_GRID_START) this.x = this.X_GRID_START;
        break;
    case 'right':
        this.x += this.X_GRID_STEP;
        if (this.x > this.xMax) this.x = this.xMax;
        break;
    case 'up':
        this.y -= this.Y_GRID_STEP;
        if (this.y < this.Y_GRID_START) {
            // Game is won!
            this.won = true;
        }
        break;
    case 'down':
        this.y += this.Y_GRID_STEP;
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

/**
 * Returns an integer between min and max, inclusive.
 * @method
 * @param {integer} min - minimum integer in random range.
 * @param {integer} max - maximum integer in random range.
 */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
