// import express from "express";
// import userRoutes from "../Src/Routes/UserRoute";

// const app = express();
// app.use(express.json());
// app.use("/api", userRoutes);

// app.listen(4000, () => {
//   console.log("Server running at http://localhost:4000");
// });
import "dotenv/config"; // Load environment variables first
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

// Routers
import userRoutes from "../Src/Routes/UserRoute";

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api", userRoutes);

// Static file serving (optional)
app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res) => {
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }
);

// Port config
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});
