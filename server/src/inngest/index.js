import { serve } from "inngest/express";
import { inngest } from "./client.js";
import { createUser } from "./functions/createUser.js";
import { processDocument } from "./functions/processDocument.js";

export const inngestHandler = serve({
  client: inngest,
  functions: [createUser, processDocument],
});