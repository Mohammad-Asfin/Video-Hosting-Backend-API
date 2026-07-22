import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { User } from "./models/user.model.js";

let io;
const userSocketMap = new Map(); // userId -> socketId

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.CORS_ORIGIN,
            credentials: true
        }
    });

    // Socket Authentication Middleware
    io.use(async (socket, next) => {
        try {
            // Depending on client implementation, token could be in handshake auth or cookies
            const token = socket.handshake.auth.token || (socket.handshake.headers.cookie && socket.handshake.headers.cookie.split('accessToken=')[1]?.split(';')[0]);
            
            if (!token) {
                return next(new Error("Authentication error"));
            }

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded._id).select("-password");

            if (!user) {
                return next(new Error("User not found"));
            }

            socket.user = user;
            next();
        } catch (error) {
            next(new Error("Authentication error"));
        }
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.user.username} (${socket.id})`);
        
        // Store user mapping
        userSocketMap.set(socket.user._id.toString(), socket.id);

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.user.username}`);
            userSocketMap.delete(socket.user._id.toString());
        });
    });
};

export const emitToUser = (userId, eventName, data) => {
    if (!io) return;
    const socketId = userSocketMap.get(userId.toString());
    if (socketId) {
        io.to(socketId).emit(eventName, data);
    }
};

export const getIO = () => io;
