const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const engine = require('ejs-mate');
const multer = require('multer');
const app = express();
const path = require('path');
let server = http.createServer(app);

// OPTIONS
// set view engine
app.set('views', path.join(__dirname, '../views/'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
// set public folder(static)
app.use(express.static(path.join(__dirname, '../public/')));

// MIDDLEWARE
// to recive json from frontend
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// SOCKET CONFIG
module.exports.io = socketIO(server);
require('./socketio/socketBackEnd');

// MULTER CONFIG
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img/games'),
    filename: (req, file, fnCallback) => {
        fnCallback(null, `${new Date().getTime() + path.extname(file.originalname)}`);
    }
});
app.use(multer({
    storage
}).single('image'));

// ROUTES
app.use(require('./routes/index'));

// DB INIZILATION
require('./dbConfig');

server.listen(process.env.PORT || 3000, err => {
    if (err) console.log(err);
    console.log('Server online');
});