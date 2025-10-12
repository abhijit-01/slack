import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { functions, inngest } from "./config/inngest.js";

const app = express();

// ✅ Clerk middleware for auth
app.use(clerkMiddleware());

// ✅ Express JSON parser
app.use(express.json());

// ✅ Inngest endpoint for serverless functions
app.use("/api/inngest", serve({ client: inngest, functions }));

// ✅ Base route
app.get("/", (req, res) => {
  res.send("Hello world project env created");
});

// ✅ Server startup logic
const startServer = async () => {
  try {
    await connectDB();

    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log(`Server started on port: ${ENV.PORT}`);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
