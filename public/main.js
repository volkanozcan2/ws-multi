const { log } = console;
const users = {};
let socket = io();
socket.on("connect", () => {
    log("bağlandım");
});
socket.on("pos", (e) => {
    const { id, x, y } = e
    users[id] = { x, y, id }
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
        const pos = users[i]
        ellipse(pos.x, pos.y, 30);
    }
}
function mouseMoved() {
    socket.emit("move", {
        x: mouseX, y: mouseY,
    });
}