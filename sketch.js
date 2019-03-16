
var joe;
var vehicles;
function setup() {
    createCanvas(screen.width, screen.height-170);
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
    vehicles=new Vehicles(width,height,1200);
    fill(127);
}
