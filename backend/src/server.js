import express from "express";
import cors from "cors";
import path from "path";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
// To use dotenv, import and then call config method
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json()); // This middleware parse JSON bodies: req.body
app.use(rateLimiter);

//working of middleware: Simple Custom
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & URL is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
// What is an Engpoint?
// An Endpoint is a combination of a url + HTTP method that
// lets the client interact with a specific resource.

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
});
