var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
const SaveMessageToDb = require("./libs/save-message-db");
var session = require("express-session");
const { SESSION_SECRET } = process.env;
var app = express();
var debug = require('debug')('express-server:server');
const http = require("http").createServer(app);
const socketIo = require('socket.io');
const messagesSeenByReceiver = require("./libs/messages-seen-by-receiver");


app.use(cors({
  origin: process.env.APP_URL,
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Socket
const io = socketIo(http, {
  cors: {
    origin: process.env.APP_URL, // Allow this origin
    methods: ['GET', 'POST'], // Allow these methods
  }
});


// Outside of any function/component
io.on("connection", (socket) => {

  let room = "";

  // Event handler for joining a room
  socket.on("join", (data) => {
    console.log("Joined Room:", data);
    room = data;
    socket.join(data);
    socket.to(data).emit("joined", { message: "User Joined Room" });
  });

  // Event handler for receiving new messages
  const handleMessage = async (data) => {
    // Save messages here if needed
    const message = await SaveMessageToDb.saveMessage(data);

    socket.to(room).emit("message", {
      ...data,
      message_id: message.message_id,
    });
  };

  // Event handler for marking messages as seen
  const handleSeen = async (data) => {
    const lastMessageSeen = await messagesSeenByReceiver(data);
    if (lastMessageSeen.success) {
      console.log("Message seen updated", lastMessageSeen)
      socket.to(room).emit("message-seen-updated", { messageId: lastMessageSeen.data.message_id, seen: true });
    }
  };

  // Event handler for typing indication
  const handleTyping = (data) => {
    socket.to(room).emit("typing", { typing: data.typing });
  };

  // Listen for new messages
  socket.on("new-message", handleMessage);

  // Listen for messages seen
  socket.on("message-seen", handleSeen);

  // Listen for typing indication
  socket.on("typing", handleTyping);

  // Event handler for user disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

//Routes
app.use("/", indexRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


http.listen(process.env.PORT, () => {
  console.log(`Server running on port process.env.${process.env.PORT}`);
})

http.on('error', onError);
http.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = http.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


// module.exports = app;
