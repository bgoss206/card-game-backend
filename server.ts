import express, { Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

io.on("connection", (socket: Socket) => {
  console.log("A user connected");

  // Handle socket events
  socket.on("chatMessage", (message: string) => {
    // Process and broadcast the message
    io.emit("chatMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const port = 3000; // Choose your desired port number

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
