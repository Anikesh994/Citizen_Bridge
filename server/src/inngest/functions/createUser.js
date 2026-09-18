import User from "../../models/user.model.js";
import { inngest } from "../client.js";
import { connectDB } from "../../lib/db.js";

export const createUser = inngest.createFunction(
  { id: "create-user-from-clerk", triggers: [{ event: "clerk/user.created" }] },
  async ({ event }) => {
    await connectDB();
    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    const email = email_addresses[0]?.email_address;

    const existingUser = await User.findOne({ clerkId: id });

    if (existingUser) {
      return { message: "User already exists" };
    }

    const user = await User.create({
      clerkId: id,
      email,
      firstName: first_name,
      lastName: last_name,
      imageUrl: image_url,
    });

    return { success: true, user };
  }
);