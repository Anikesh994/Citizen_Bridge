import express from "express";
import { Webhook } from "svix";
import { inngest } from "../inngest/client.js";
import { ENV } from "../lib/env.js";

const router = express.Router();

router.post("/clerk", async (req, res) => {
  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(ENV.webhook_url);

  let evt;

  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.error("[Webhook] Svix verification failed:", err.message);
    return res.status(400).send("Invalid webhook");
  }


  if (evt.type === "user.created") {
    await inngest.send({
      name: "clerk/user.created",
      data: evt.data,
    });
  }

  res.status(200).send("Webhook received");
});

export default router;