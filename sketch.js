let angle;
let w, h;
let scale;
let rows, cols;
let terrain;
let xOff, yOff, flying;
let noiseLevel;
let noiseAmplitude;

function setup() {
    createCanvas(800, 800, WEBGL);
    angle = PI/3;
    w = 1200;
    h = 1200;
    scale = 20;
    noiseLevel = 0.2
    noiseAmplitude = 120;

    rows = parseInt(h/scale);
    cols = parseInt(w/scale);
    terrain = new Array(rows);
    for(let i = 0; i < rows; i++) {
        terrain[i] = new Array(cols);
    }

    flying = 0;

}

function draw() {
    background(0);
    fill(0);
    stroke(255);

    yOff = flying;
    for(let y = 0; y < rows - 1; y++) {
        xOff = 0;
        for(let x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xOff, yOff), 0, 1, -noiseAmplitude, noiseAmplitude);
            xOff += noiseLevel
        }
        yOff += noiseLevel
    }

    rotateX(angle);
    translate(-w/2, -h/2);
    for(let y = 0; y < rows - 1; y++) {
        beginShape(TRIANGLE_STRIP);
        for(let x = 0; x < cols; x++) {
            vertex(x * scale, y * scale, terrain[x][y])
            vertex(x * scale, (y + 1) * scale, terrain[x][y + 1])
        }
        endShape();
    }

    flying -= 0.017;
}
