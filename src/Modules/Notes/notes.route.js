import { Router } from "express";
import {
  createNote,
  updateNote,
  replaceNote,
  updateAllTitles,
  deleteNote,
  GetPaginatedNotes,
  GetNoteById,
  GetNoteByContent,
  getNotesWithUser,
  getNotesAggregate,
    deleteAllNotes
} from "./notes.controller.js";
import { authMiddleware } from "../../middleware/auth.middlewares.js";

const router = Router();

router.post("/", authMiddleware, createNote);
router.patch("/all", authMiddleware, updateAllTitles);
router.get("/paginate-sort", authMiddleware, GetPaginatedNotes);
router.get("/note-by-content", authMiddleware, GetNoteByContent);
router.get("/note-with-user", authMiddleware, getNotesWithUser);
router.get("/aggregate", authMiddleware, getNotesAggregate);
router.delete("/", authMiddleware, deleteAllNotes);
router.patch("/:noteId", authMiddleware, updateNote);
router.put("/:noteId", authMiddleware, replaceNote);
router.delete("/:noteId", authMiddleware, deleteNote);
router.get("/:noteId", authMiddleware, GetNoteById);
export { router as notesRouter };
