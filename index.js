import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import http from "http";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 3000;

let server;

connectDB()
    .then(() => {
        server = http.createServer(app);

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("DB connection failed", err);
        process.exit(1);
    });


const shutdown = (signal) => {
    console.log(`Received ${signal}. Closing server...`);

    server.close(() => {
        console.log("HTTP server shut down.");
        process.exit(0);
    });

    setTimeout(() => {
        console.error("Force exit.");
        process.exit(1);
    }, 10000);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));


process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    shutdown("uncaughtException");
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    shutdown("unhandledRejection");
});
