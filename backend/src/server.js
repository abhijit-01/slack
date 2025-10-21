import "../instrument.mjs"
import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { functions, inngest } from "./config/inngest.js";
import chatRoutes from "./routes/chat.route.js";
import * as Sentry from "@sentry/node";
import cors from "cors";

const app = express();

// ✅ Clerk middleware for auth
app.use(clerkMiddleware());

// ✅ Express JSON parser
app.use(express.json());
app.use(cors({origin: "http://localhost:5173",credentials:true}));

app.get("/debug-sentry",(req,res)=>{
  throw new Error("Sentry error");
})

// ✅ Base route
app.get("/", (req, res) => {
  res.send("Hello world project env created");
});

// ✅ Inngest endpoint for serverless functions
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
Sentry.setupExpressErrorHandler(app);



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
