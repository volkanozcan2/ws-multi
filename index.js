const express = require('express');
const app = express();
const server = app.listen(process.env.PORT || 3000, listen);
const { log } = console;
const users = {};
function listen() {
    const host = server.address().address;
    const port = server.address().port;
    console.log(' http://' + host + ':' + port + "da  çalışıyor.");
}

app.use(express.static('public'));

const io = require('socket.io')(server);

io.sockets.on('connection',
    function (socket) {
        const name = Math.random().toString(36).substring(7);
        log(name + " geldi")
        const { id } = socket;
        users[id] = name;

        socket.on("move", (e) => {
            socket.broadcast.emit("pos", { id, ...e });
        })
        socket.on("disconnect", (e) => {
            log(users[id], " gitti");
            socket.broadcast.emit("del", { id });
            delete users[id];
        })
    }
);


