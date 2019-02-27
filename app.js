// Enemies our player must avoid
var Enemy = function (x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  this.x = x;
  this.y = y + 55;
  this.speed = speed;
  this.step = 101;
  this.edge = this.step * 5;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.resetPos = -this.step;


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  //if enemy not passed bounds 
  if (this.x < this.edge) {
    //move foward 
    //increment x by speed * dt 
    this.x += this.speed * dt;
  } else {
     //reset to  start 

     this.x = this.resetPos;
   }
 };

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Hero player class
class Hero {
  constructor() {
    this.sprite = 'images/char-cat-girl.png';
    // this.x = 0;
    // this.y = 0;
    this.step = 101;
    this.jump = 83;
        //set x and y to starting x and y

        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
      }
//draw hero sprite on current x and y coordinate position 
render() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

//handle keyboard input 
handleInput(input) {
  switch (input) {
    case 'up':
    if(this.y > this.jump){
      this.y -= this.jump;
    }
    break;
    case 'down':
    if(this.y < this.jump * 4){
      this.y += this.jump;
    }
    break;
    case 'left':
    if(this.x > 0){
      this.x -= this.step;
    }
    break;
    case 'right':
    if(this.x < this.step * 4){
      this.x += this.step;
    }
    break;
  }
}

//update players x and y accord to input 
update() {
    //check collision  
    for (let enemy of allEnemies) {
      //  if player location = enemy location reset

      if (this.y === enemy.y && (enemy.x + enemy.step / 3 > this.x && enemy.x < this.x + this.step / 3)) {
        console.log(this.y, enemy.y);
        this.reset();
      }
      
    }
    //condition for winning, player position = top row
    if (this.y === 55) {
      this.reset();
      this.victory = true;
      //show modal
      win();
    }
  
  }
  //reset hero
  reset() {
    this.x = this.startX;
    this.y = this.startY;
  }

}

//  instantiate  objects.
// Place the player object in a variable called player

const player = new Hero();

const enemy1 = new Enemy(-101, 0, 200);
const enemy2 = new Enemy(-101, 83, 300);
const enemy3 = new Enemy((-101 * 2.5), 83, 250);
const enemy5 = new Enemy((-101 * 3), 83, 320);
const enemy4 = new Enemy(-101, 166, 150);

// Place all enemy objects in an array called allEnemies
const allEnemies = [];
//for each enemy create and push new enemy object  into above array 
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

//  the modal
var modal = document.getElementById('theModal');

//  <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//when win display modal
function win() {
  modal.style.display = "block";
}

//  <span> (x), to close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// Click on window to close modal 
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
