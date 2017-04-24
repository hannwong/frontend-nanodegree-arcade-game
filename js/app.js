var Entity = function() {
    // TODO: Randomize starting location.
    this.x = 1;
    this.y = 1;

    this.xGridStart = 0;
    this.xGridStep = 101;
    this.yGridStart = 60;
    this.yGridStep = 83;
};

// Draw the entity on the screen, required method for game
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function() {
    Entity.call(this);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    Entity.call(this);
    this.x = this.xGridStart + this.xGridStep * x;
    this.y = this.yGridStart + this.yGridStep * y;

    this.xMax = this.xGridStart + 4 * this.xGridStep;
    this.yMax = this.yGridStart + 4 * this.yGridStep;

    this.sprite = 'images/char-boy.png';
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

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
        if (this.y < this.yGridStart) this.y = this.yGridStart;
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
var allEnemies = [];
var player = new Player(2, 4);

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
