const { log } = console;
const users = {};
let socket = io();
socket.on("connect", () => {
    log("bağlandım");
});
socket.on("pos", (e) => {
    const { id, x, y, c } = e
    users[id] = { x, y, id, c }
});
socket.on("del", (e) => {
    delete users[e.id];
})
function setup() {
    canvas = createCanvas(displayWidth, displayHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-2");
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    noStroke();
    textSize(15);
}
function draw() {
    background("grey");
    ellipse(mouseX, mouseY, 30);
    for (var i in users) {
        const obj = users[i];
        fill(obj.c);
        ellipse(obj.x, obj.y, 30);
    }
}
function mouseMoved() {
    socket.emit("move", {
        x: mouseX, y: mouseY,
    });
}