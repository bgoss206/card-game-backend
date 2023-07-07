import express, { Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware to authenticate requests
const authenticate = (req: Request, res: Response, next: () => void) => {
  // Implement your authentication logic here
  // For example, you can check if the request contains valid credentials or a valid session

  // If authentication succeeds, call the next middleware or route handler
  next();

  // If authentication fails, you can send an error response
  // For example:
  // res.status(401).send("Unauthorized");
};

app.use(express.static("public"));

// Apply the authentication middleware to specific routes
app.get("/", authenticate, (req: Request, res: Response) => {
  res.send("Hello, authenticated user!");
});

app.post("/", authenticate, (req, res) => {
  res.send("Authenticated user, received a POST request");
});

// Socket.IO authentication
io.use((socket: Socket, next: (err?: Error) => void) => {
  // Implement your socket authentication logic here
  // For example, you can check if the socket connection contains valid credentials or a valid session

  // If authentication succeeds, call the next middleware
  next();

  // If authentication fails, you can close the socket connection
  // For example:
  // next(new Error("Unauthorized"));
});

io.on("connection", (socket: Socket) => {
  console.log("A user connected");

  socket.on("chatMessage", (message: string) => {
    io.emit("chatMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
