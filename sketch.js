// GAME basado en el siguiente tutorial:
// "https://www.kadenze.com/courses/introduction-to-programming-for-the-visual-arts-with-p5-js-vi/sessions/synthesis-b-game");


//======= inicializas el array ========//

var balls = [];
var total = 20;
var score = 0;
var lives = 3;
var paddle;

/* NON LINEAR NARRATIVES : states of the game 012
  0 = intro
  1 = play
  2 = end
*/

var state = 0;

// 017 poder acceder a las variables de modo global
var startCenterX;
var startCenterY;
var startButtonSize = 130;

// ======== 001: SETUP ========= // elementos del inicio

function setup() {

	createCanvas(1000,600);

  startCenterX = width/2 -10 ;
  startCenterY = 472;
  textFont("Helvetica");
  textSize(50);
  textAlign(CENTER, CENTER);
}

// ======== 002: DRAW ========= // los elementos que van a aparecer y su interacción

function draw() {

  background(0);
  if (state === 0){
    drawIntro();
  } else if (state === 1){
    drawPlaying();
  } else if (state === 2){
    drawEnd();
  }
}

// ======== 013a: DRAW INTRO ========= // non-linear narrative


function drawIntro() {

  // 015 creamos el botón exactamente donde se sitúa el texto y lo ponemos más arriba (se sitúa debajo del punto 014)
  fill(255, 0, 0);
  ellipse(startCenterX, startCenterY, startButtonSize, startButtonSize);
  // 014 especificaciones de la pantalla intro
  fill(255);
  noStroke();
  text("Would you like to \nplay a game ?", 0, 0, width, height -100);
  text("YES", 0, 450, width, 50);

  // 016 escribir el código parael botón

  //var d = dist(mouse);
}

// ======== 013b: DRAW PLAYING ========= // non-linear narrative

function drawPlaying() {

  for (var i=0; i<balls.length; i++){
    balls[i].update();
    balls[i].render();
  }
  paddle.update();
  paddle.render();

  if (lives === 0){
    gameOver();
  }
  textSize(20);
  textAlign(LEFT);
  text("Score: " + score, 10, 10);
  text("Lives: " + lives, 10, 40);
}

// ======== 013c: DRAW END creación========= // non-linear narrative
// 020: DRAW EN WRITE FUNCTION

function drawEnd() {
  textSize(50);
  textAlign(CENTER, CENTER);
  fill(255, 0, 0);
  ellipse(startCenterX, startCenterY, startButtonSize, startButtonSize);

  fill(255);
  noStroke();
  text(score, 0, 300, width, 55);
  text("Would you like to play again?", 0, 50, width, 100);
  text("YES",0,450, width, 50);

}

// ======== 018: START THE GAME ========= // to set-up some defaults

function startGame() {
  console.log("startGame");
  score = 0;
  lives = 3;

    // function with an array
  for (var i=0; i<total; i++) {
    // every time value ball --> we add a new instance of the object
    balls[i] = new Ball(paddle);
  }

  // capital P to denote the name of the class
  // lowercase P to denote the instance of the class
  paddle = new Paddle();

  state = 1;
}

// ======== 019: funcion Game Over ========= //

function gameOver(){
  state = 2;
}


// ======== 017: MOUSE ========= //

function mousePressed() {
  if (state === 0 || state === 2){
    // if the distance bw the mouse and the center is less than half the size of the button: the user click inside of button

    var d = dist(mouseX, mouseY, startCenterX, startCenterY);
    console.log(d);

    if (d < startButtonSize/2){
      startGame();
    }
  }
}


// ======== 005: KEYS ========= //

function keyPressed() {
  if (keyCode === LEFT_ARROW){
    paddle.moveLeft();
  } else if (keyCode === RIGHT_ARROW){
    paddle.moveRight();
  }
}

// ======== 003: OBJECTS ========= // objeto inicial con variables, por si las quieres cambiar luego


// ======== 004: OBJECT PADDLE ========= //
// 006 paddle introducido como argumento --> collision detection

function Paddle() {
  this.width = 50;
  this.height = 20;
  this.speed = 80;
  this.x = width/2 - this.width/2;
  this.y = height - 30;
  this.color = color(255,0,0);

  this.update = function(){
  }

  // 009 MÉTODO : SCORE
  this.score = function() {
    // hacemos referencia directamente a la instancia, no al constructor
    paddle.color = color(0,255,0);
    score++;
    console.log(score);
    paddle.width += 1;
  }

  // 010 MÉTODO : HIT
  this.hit = function() {
    paddle.color = color(255, 255, 0);
    lives--;
    console.log("LIVE SCORE:" + lives);
    paddle.width -= 10;
  }

  // MÉTODO: lo que se dibuja
  this.render = function(){
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    this.color = color(255,0,0);
  }

  // MÉTODO QUE LLAMAMOS CON KEYS
  this.moveRight = function(){
    this.x += this.speed;
    if (this.x + this.width > width){
      this.x = width - this.width;
    }
  }

  this.moveLeft = function(){
    this.x -= this.speed;
    if (this.x < 0){
      this.x = 0;
    }
  }
}

// ======== 003: OBJECT BALL ========= //

function Ball(paddle) {
  // en el caso que haya varios paddles this.paddle --> decouple ball from paddle
  this.paddle = new Paddle;
  this.size = 20;
  this.speed = 10;
  // 011 poison balls, less than 10 in 100 numbers
  this.bad = (random(0, 100) < 10);

  // método que inicializa la ball con RANDOM
  this.init = function() {
    this.y = random(-height,-20);
    this.x = random(20, width-20);
  }

  // método para que aparezca la ball
  this.render = function() {
    if (this.bad){
      fill(255, 0, 0);
    } else {
      fill(0,0,255);
    }

  // hacerlo totalmente relativo
    ellipse(this.x, this.y, this.size, this.size);
    noStroke();
  }

  // método update nos dice que cuando la ball llega llegue más bajo que la altura de la pantalla: generar una nueva ball
  this.update = function() {
    this.y += this.speed;

    // 007
    // function to test the paddle collision
    this.testPaddle();

    if (this.y - this.size > height){
      this.init();
    }
  }

  //008 implementamos el testPaddle fuera para mantener el this.update más concentrado
  this.testPaddle = function() {

    // inicial code
    //  if (this.y + this.size/2 > this.paddle.y && this.y - this.size/2 < this.paddle.y + this.paddle.height)

    // this.y + this.size/2 > this.paddle.y
    // y position of ball + half size is greater than paddle y value (= top of paddle)
    // that means that the ball is in the range to strike the top of the paddle

    // this.y - this.size/2 < this.paddle.y + this.paddle.height
    // y position - size/2 = top of the ball is less than the bottom of the paddle

   // console.log(this.paddle);

    var top = (this.y + this.size/2 > this.paddle.y);
    var bottom = (this.y - this.size/2 < this.paddle.y + this.paddle.height);
    var left = (this.x + this.size/2 > this.paddle.x);
    var right = (this.x - this.size/2 < this.paddle.x + this.paddle.width);

    if (top && bottom && left && right){

      if(this.bad){
        this.paddle.hit();
      } else {
        this.paddle.score();
      }

      this.init();
      //this.speed = 0;
    }
  }

// METHOD AT THE END: so that it gets defined before it is called
  this.init();
}

