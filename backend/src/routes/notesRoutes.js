import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", getNoteById);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;

// app.get("/api/notes", (req, res) => {
//   res.status(200).send("This is the notes page.");
// });

// app.post("/api/notes", (res, req) => {
//   res.status(201).json({ message: "note created successfully" });
// });

// app.put("/api/notes/:id", (req, res) => {
//   res.status(200).json({ message: "note updated successfully" });
// });

// app.delete("/api/notes/:id", (req, res) => {
//   res.status(200).json({ message: "note deleted successfully" });
// });
