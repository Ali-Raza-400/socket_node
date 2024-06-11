// const express = require("express");
// const http = require("http");
// const dotenv = require("dotenv");
// const { Server } = require("socket.io");
// const cors = require("cors");
// const { v4: uuidv4 } = require("uuid");

// // Initialize Express app and HTTP server
// const app = express();
// const server = http.createServer(app);

// // Load environment variables
// dotenv.config();

// // Setup Socket.io with CORS
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// // Define server port
// const PORT = process.env.PORT || 5030;

// // Use CORS middleware
// app.use(cors());

// // Define a basic route
// app.get("/", (_req, res) => {
//   res.send("Welcome to the server");
// });

// // Data structures to track active users and room participants
// const activeUsers = {};
// const roomUsers = {};

// // Socket.io connection event
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   // Event for user joining
//   socket.on("join", (data) => {
//     console.log(data, "send message");
//     const { toUserId } = data;
//     activeUsers[toUserId] = socket.id;
//   });

//   // Event for sending private messages
//   socket.on("sendMessage", (data) => {
//     console.log(data, "send message");
//     const { toUserId, ...rest } = data;

//     if (activeUsers[toUserId]) {
//       io.to(activeUsers[toUserId]).emit("message", rest);
//     } else {
//       console.error(`User ${toUserId} is not connected`);
//     }
//   });

//   // Event for joining a room
//   socket.on("join-room", (data) => {
//     console.log("data::", data);
//     const { room, name } = data;
//     console.log(data, "room joined");

//     if (!roomUsers[room] || !roomUsers[room].includes(socket.id)) {
//       if (!roomUsers[room]) {
//         roomUsers[room] = [];
//       }
//       roomUsers[room].push(socket.id);
//     }

//     socket.join(room);

//     // Event for sending messages in a room
//     socket.on("roomMessage", (data) => {
//       console.log("data:::", data);
//       socket.to(room).emit("roomMessage", data);
//     });

//     // Event for leaving a room
//     socket.on("leave-room", () => {
//       console.log(`User ${socket.id} requested to leave room ${room}`);
//       if (roomUsers[room] && roomUsers[room].includes(socket.id)) {
//         socket.leave(room);
//         roomUsers[room] = roomUsers[room].filter(
//           (userId) => userId !== socket.id
//         );

//         io.to(room).emit("roomMessage", `User ${name} left ${room}`);
//       } else {
//         console.log(`User ${socket.id} not in room`);
//       }
//     });
//   });

//   // Event for push notifications
//   socket.on("push-notification", (data) => {
//     socket.broadcast.emit("notification", data);
//   });

//   // Handle user disconnection
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//     const disconnectedUser = Object.keys(activeUsers).find(
//       (toUserId) => activeUsers[toUserId] === socket.id
//     );
//     if (disconnectedUser) {
//       delete activeUsers[disconnectedUser];
//     }
//   });
// });

// // Start the server and listen on the defined port
// server.listen(PORT, () => {
//   console.log(`Server started on: ${PORT}`);
// });

const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
    res.send("App is running..");
});

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);