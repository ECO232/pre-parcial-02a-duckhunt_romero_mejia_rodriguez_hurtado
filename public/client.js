//const socket = io()

var x,y;

const v1=1;
const v2=5;
let points = 0;

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

  duck1.display();

  if (dist(x, y, mouseX, mouseY) < 40) {
    if (mouseIsPressed) {
      console.log("muelto");
      return;
    }
}

  //draw from elements list
 /* elements.forEach((element) => {
    fill(element.col);
    ellipse(element.x, element.y, element.size, element.size);
  })

  //draw from cursors list
  cursors.forEach((element) => {
    fill(element.col),
      ellipse(element.x, element.y, element.size, element.size)
  })*/
}

class duck1 {
    constructor(img,x,y){
        img: img;
        x:x;
        y:y;
    }
    
    display() {
        noStroke();
        fill(100, 200, 100)
        image(img,x-50,y-50,100,100);
    }
}

/*function mousePressed() {
  const element = {
    x: mouseX,
    y: mouseY,
    col: color.value(),
    size: slider.value(),
  }

  socket.emit('send-element', element)
}

function mouseDragged() {
  const element = {
    x: mouseX,
    y: mouseY,
    col: color.value(),
    size: slider.value(),
    id: id
  }

  socket.emit('send-cursor', element)
}

socket.on('element-received', (element) => {
  //console.log("element-received: ",element)
  elements.push(element)
})

socket.on('cursor-received', (element) => {
  //console.log("element-received: ",element)
  let cursorIndex = cursors.findIndex((index) => element.id == getItem.id)
  if (cursorIndex != -1) {
    cursors[cursorIndex] = element
  } else {
    cursors.push(element)
  }
})*/