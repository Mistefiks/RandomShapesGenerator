var shapes = [];

var Manager = {
    n: 5,
    currentShape: 2,
    shapeCount: 2,
    shapes: [],

    // Draw shape
    // ShapeID:
    // - 1: Pentagram
    // - 2: Deathly Hallow
    drawShape: (shapeID, x, y, size = null, color = null, weight = null, add = false) => {

        // Default value - random
        if(size === null) {
            size = random(100, 300);
        }
        if(color === null) {
            color = {
                r: random(0, 255),
                g: random(0, 255),
                b: random(0, 255)
            };
        }
        if(weight === null) {
            weight = random(1, 3);
        }

        let shape;

        if(shapeID == 1) {

            shape = new Pentagram(x, y, size, color, weight);

        } else if(shapeID == 2) {

            shape = new DeathlyHallow(x, y, size, color, weight);

        }

        if(add)
            Manager.shapes.push(shape);
        else
            shape.draw();

    },

    // Current shape functions
    drawCurrentShape: (x, y, size = null, color = null, weight = null) => {

        Manager.drawShape(Manager.currentShape, x, y, size, color, weight, false);

    },

    addCurrentShape: (x, y, size = null, color = null, weight = null) => {

        Manager.drawShape(Manager.currentShape, x, y, size, color, weight, true);
        

    },
    
    // Reset parameters
    clearScreen: () => {

        Manager.shapes = [];
        Manager.n = 5;
        Manager.currentShape = 2;

    },
    
    nextShape: () => {

        Manager.currentShape++;

        if(Manager.currentShape > Manager.shapeCount)
            Manager.currentShape = 1;

    }
};


var setup = () => {

    createCanvas(windowWidth, windowHeight);
    frameRate(60);

    init();

}

var draw = () => {

    background(0);

    // Drawing menu: current shape
    stroke(255);
    strokeWeight(2);
    rect(0, 0, 100, 100);
    textSize(13);
    strokeWeight(1);
    textAlign(CENTER, CENTER);
    text("Current Shape", 50, 20);
    line(0, 30, 100, 30);
    Manager.drawCurrentShape(50, 65, 50, {r: 255, g: 255, b: 255}, 1);


    // Drawing menu: text
    strokeWeight(1);
    stroke(255);
    textSize(13);
    noFill();

    text("Click mouse to draw Shape", 200, 20);
    text("Click I to change Shape", 200, 40);
    text("Click C to clear screen", 200, 60);

    // Drawing all the shapes saved on screen
    for(let i in Manager.shapes) {
        Manager.shapes[i].draw();
    }

}

var init = () => {
    
    // Making first shape in the screen
    let id, x, y, size, weight;

    size   = random(100, 400);
    x      = random(size, windowWidth - size);
    y      = random(size, windowHeight - size);
    weight = random(3, 8);
    

    Manager.addCurrentShape( x, y, size, {r: 255, g: 255, b: 255}, weight );

}

// Full window
var windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
}

// Mouse click - add shape
var mousePressed = () => {
    Manager.drawCurrentShape( mouseX, mouseY );
    Manager.addCurrentShape( mouseX, mouseY )
}

var keyTyped = () => {

    console.log(keyCode);

    // - -> ilość boków
    if(keyCode == 45 || keyCode == 95) {
        Manager.n--;
    }
    // + -> ilość boków
    if(keyCode == 61 || keyCode == 43)
        Manager.n++;
    
    // i/I -> ilość boków
    if(keyCode == 105 || keyCode == 73)
        Manager.nextShape();
    

    // d -> deathly hallows
    if(keyCode == 100)
        shapes.push( new DeathlyHallow(mouseX, mouseY, random(100, 400), {r: 255, g: 255, b: 255}, random(3, 8)) );
    

    // c -> clear screen
    if(keyCode == 99) {

        Manager.clearScreen();
        init();
        console.log('Clear screen');

    }
    
    // e -> reverse rainbow pentagram
    if(keyCode == 101)
        Pentagram.drawReverseRainbow(mouseX, mouseY, 800);
    // r -> rainbow pentagram
    if(keyCode == 114)
        Pentagram.drawRainbow(mouseX, mouseY, 800);

}

var toRadians = (angle) => {
    return angle * (Math.PI / 180);
}