const socket = io("");


let points = 0;
let numberOfDucks = 8;
let ducks = [];
let duckSprite1, duckSprite2, duckHuntBG, crosshair, shoot, duckFall
let ardMouseX = 1600/2;
let ardMouseY = 1200/2;

function preload() {
  duckSprite1 = loadImage('./assets/duck1.png');
  duckSprite2 = loadImage('./assets/duck2.png');
  duckHuntBG = loadImage('./assets/duckHuntBG.jpg');
  crosshair = loadImage('./assets/PanzerCrosshair.png');
  shoot = loadSound('./assets/shot.mp3');
  duckFall = loadSound('./assets/duckFall.mp3')
}


function setup() {
  createCanvas(1600, 1200);
  x = 0;
  y = 300;

  for (let i = 0; i < numberOfDucks; i++) {
    let xPos = 200 * i;
    let yPos = getRand()
    ducks.push(new duck1(xPos, yPos, 100));
    xPos = 300 * i
    yPos = getRand()
    ducks.push(new duck2(xPos, yPos, 100));
  }
  button = createButton('Moar Ducks!')
  button.mousePressed(restart);
}

socket.on('mensaje',(element)=>{
  // Dibujar el elemento recibido en el otro cliente.
  //console.log ("ardInput:", element)  

  ardMouseX = 1.56403 * parseInt(element.x)
  ardMouseY = 1.17302 * parseInt(element.y)

  if (parseInt(element.f) == 1) {
    mousePressed()
  }
});


function draw() {
  //Backgroun
  background(duckHuntBG);
  noStroke();

  //Points
  textSize(32);
  fill(255);
  text("Points: " + points, 25,50);

  for (let i = 0; i < ducks.length; i++) {
    ducks[i].move();
    ducks[i].display();
    ducks[i].checkEdges();
  }

  let crossSize = 100;
  image(crosshair, ardMouseX - crossSize/2, ardMouseY - crossSize/2, crossSize, crossSize)
}

function mousePressed() {
  shoot.play();
  for (let i = 0; i < ducks.length; i++) {
    if (ducks[i].clickMe()) {
      if (ducks[i].type == "duck1") {
        points = points + 5;
      } else if (ducks[i].type == "duck2") {
        points = points + 10;
      }
      duckFall.play();
      ducks.splice(i, 1);
      break;
    }
  }
}

function restart() {
  for (let i = 0; i < numberOfDucks; i++) {
    let xPos = 200 * i;
    let yPos = getRand()
    ducks.push(new duck1(xPos, yPos, 100));
    xPos = 300 * i
    yPos = getRand()
    ducks.push(new duck2(xPos, yPos, 100));
  }
}

function getRand() {
  return random(100, height - 200);
}

class duck1 {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.type = "duck1";
  }

  clickMe() {
    return (dist(ardMouseX, ardMouseY, this.x, this.y) < (this.w / 2));
  }

  move() {
    this.x = this.x + 4;
  }

  checkEdges() {
    if (this.x > width || this.x < 0) {
      this.x = 0;
      let yPos = getRand()
      this.y = yPos;
    }
  }

  display() {
    noStroke();
    fill(255, 0, 0)
    image(duckSprite1, this.x - 50, this.y - 50, this.w, this.w);
  }
}

class duck2 {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.type = "duck2";
  }

  clickMe() {
    return (dist(ardMouseX, ardMouseY, this.x, this.y) < (this.w / 2));
  }

  move() {
    this.x = this.x + 8;
  }

  checkEdges() {
    if (this.x > width || this.x < 0) {
      this.x = 0;
      let yPos = getRand()
      this.y = yPos;
    }
  }

  display() {
    noStroke();
    fill(255, 0, 0)
    image(duckSprite2, this.x - 50, this.y - 50, this.w, this.w);
  }
}