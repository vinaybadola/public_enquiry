import express from "express";
const app = express();
import routes from "./src/routes/index.js";

import securityMiddleware from "./middlewares/security.middleware.js";
import { environment } from "./config/env.config.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

securityMiddleware(app);

app.get("/health", (req, res) => {
    return res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/v1", routes);

console.log("env", environment);

app.use((err, req, res, next) => {
    console.error(`Error caught by middleware: ${err.message}`);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
});


export default app;