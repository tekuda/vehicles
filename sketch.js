
var joe;
var vehicles;
function setup() {
    createCanvas(750, 500);
    resetEverything();
}

function mousePressed() {
    vehicles.setTarget(createVector(mouseX,mouseY));
}

function draw() {
    background(240);
    vehicles.update();
}
function resetEverything(){
    vehicles=new Vehicles(width,height,800);
    fill(127);
}
