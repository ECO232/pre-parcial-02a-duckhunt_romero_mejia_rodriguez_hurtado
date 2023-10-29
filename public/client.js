//const socket = io()

var x,y;

const v1=1;
const v2=5;
let points = 0;

var ducka;
var ducko;

let elements = [];
let cursors = []

function setup() {
  createCanvas(600, 600);
  x=0;
  y=300;
  color = createColorPicker("green");
  slider = createSlider(0, 40, 20);
  id = int(random() * 1000)
  

  //console.log("id: ", id)
}

function preload(){
    ducka = loadImage('../assets/duck1.png');
    ducko = loadImage('../assets/duck2.png');
}

function draw() {
  background(220);
  noStroke();

  ducks1=new duck1(300,300,80)

  ducks1.display()
  ducks1.move()
  }

  function mousePressed(){
    if(ducks1.clickMe()){
      console.log('muelto')
    }
  }

class duck1 {
  constructor(x,y,w){
      this.x=x;
      this.y=y;
      this.w=w
  }
  
  display(){
      noStroke();
      fill(100, 200, 100)
      image(ducka,this.x-50,this.y-50,this.w,this.w);
  }

  clickMe(){
  	return (dist(mouseX, mouseY, this.x-20, this.y-20)<(this.w/2));   
  }

  move(){
    this.x = this.x + 10;
  }
}