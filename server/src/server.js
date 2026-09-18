import express from "express"
import cors from "cors"
import "dotenv/config"
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngestHandler } from "./inngest/index.js";
import { clerkMiddleware } from "./lib/auth.js";
import webhookRoutes from "./routes/webhook.js";
import documentRoutes from "./routes/document.js";
import chatRoutes from "./routes/chat.js";
import flowRoutes from "./routes/flow.js";

const app = express();


app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true }));


app.use("/api/webhooks/clerk", express.raw({ type: "application/json" }));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


app.use(clerkMiddleware());

connectDB();

app.use("/api/webhooks", webhookRoutes);

app.use("/api/inngest", inngestHandler);
app.use("/api/documents", documentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/flow", flowRoutes);

app.get("/", (_req, res) => {
    res.send("app is up and running")
})

const activePort = ENV.port || 5000;
app.listen(activePort, () => {
    const env = ENV?.node_env || "development";
    console.log(`server is running at: http://localhost:${activePort} [${env}]`);
});

export default app;

