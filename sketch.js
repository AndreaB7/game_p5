// inicializas el array
var balls = [];
var total = 20;

// 001
function setup() {
  // elementos del inicio
	createCanvas(1000,600);
  // function with an array
  for (var i=0; i<total; i++) {
    // every time value ball --> we add a new instance of the object
    balls[i] = new Ball();
  }
}

// 002
// los elementos que van a aparecer y su interacción
function draw() {
  background(0);
  for (var i=0; i<balls.length; i++){
    balls[i].update();
    balls[i].render();
  }
}

// 005
function keyPressed() {
  if (keyCode === LEFT_ARROW){
    paddle.moveLeft();
  } else if (keyCode === RIGHT_ARROW){
    paddle.moveRight();
  }
}

// LOS OBJETOS DEL JUEGO
// 003
// objeto inicial con variables, por si las quieres cambiar luego
// 006 paddle introducido como argumento --> collision detection
function Ball(paddle) {
  // en el caso que haya varios paddles this.paddle --> decouple ball from paddle
  this.size = 20;
  this.speed = 10;

  // método que inicializa la ball con RANDOM
  this.init = function() {
    this.y = random(-height,-20);
    this.x = random(20, width-20);
  }

  // método para que aparezca la ball
  this.render = function() {
    fill(255);
    noStroke();
    // hacerlo totalmente relativo
    ellipse(this.x, this.y, this.size, this.size);
  }

  // método update nos dice que cuando la ball llega llegue más bajo que la altura de la pantalla: generar una nueva ball
  this.update = function() {
    this.y += this.speed;

    // 007
    // function to test the paddle collision

    if (this.y - this.size > height){
      this.init();
    }
  }

  //008 implementamos el testPaddle fuera para mantener el this.update más concentrado
  /*this.testPaddle = function() {


    // inicial code
    //  if (this.y + this.size/2 > this.paddle.y && this.y - this.size/2 < this.paddle.y + this.paddle.height)

    // this.y + this.size/2 > this.paddle.y
    // y position of ball + half size is greater than paddle y value (= top of paddle)
    // that means that the ball is in the range to strike the top of the paddle

    // this.y - this.size/2 < this.paddle.y + this.paddle.height
    // y position - size/2 = top of the ball is less than the bottom of the paddle
    console.log(this.paddle);
    var top = (this.y + this.size/2 > this.paddle.y);
    var bottom = (this.y - this.size/2 < this.paddle.y + this.paddle.height);
    var left = (this.x + this.size/2 > this.paddle.x);
    var right = (this.x - this.size/2 < this.paddle.x + this.paddle.width);

    if (top && bottom && left && right){
      //this.init();
      this.speed(0);
    }
  }
*/
// METHOD AT THE END: so that it gets defined before it is called
  this.init();
}

//004
function Paddle() {
  this.width = 50;
  this.x = width/2 - this.width/2;
  this.y = height - 30;

  this.update = function() {
  }

  this.render = function(){
    rect(this.x, this.y, this.width, this.height)
  }

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

//console.log("https://www.kadenze.com/courses/introduction-to-programming-for-the-visual-arts-with-p5-js-vi/sessions/synthesis-b-game");
