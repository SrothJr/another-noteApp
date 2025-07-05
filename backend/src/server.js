import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
// To use dotenv, import and then call config method
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json()); // This middleware parse JSON bodies: req.body
app.use(rateLimiter);

//working of middleware: Simple Custom
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & URL is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);
// What is an Engpoint?
// An Endpoint is a combination of a url + HTTP method that
// lets the client interact with a specific resource.

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
});
