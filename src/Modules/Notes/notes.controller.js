import {
  createNoteService,
  updateNoteService,
  replaceNoteService,
  updateAllTitlesService,
  deleteNoteService,
  getPaginatedNotesService,
  getnotebyidservice,
  getNoteByContentService,
  getNotesWithUserService,
  getNotesAggregateService,
  deleteAllNotesService
} from "./notes.service.js";

export const createNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, content } = req.body;
    const result = await createNoteService({ userId, title, content });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { noteId } = req.params;
    const { title, content } = req.body;
    const result = await updateNoteService({ noteId, userId, title, content });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const replaceNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { noteId } = req.params;
    const { title, content } = req.body;
    const result = await replaceNoteService({ noteId, userId, title, content });
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "Note not found") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "You are not authorized to update this note") {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateAllTitles = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;
    const result = await updateAllTitlesService({ userId, title });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { noteId } = req.params;

    const result = await deleteNoteService({ noteId, userId });
    res.status(200).json(result);
  } catch (error) {
    if (
      error.message === "Note not found or you are not authorized to delete it"
    ) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const GetPaginatedNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 10 } = req.query;
    const result = await getPaginatedNotesService({ userId, page, limit });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const GetNoteById = async (req, res) => {
  try {
    const userId = req.userId;
    const { noteId } = req.params;

    const result = await getnotebyidservice({ noteId, userId });
    res.status(200).json(result);
  } catch (error) {
    if (
      error.message === "Note not found or you are not authorized to view it"
    ) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const GetNoteByContent = async (req, res) => {
  try {
    const userId = req.userId;
    const { content } = req.query; // Assuming you are searching by content

    const result = await getNoteByContentService({ userId, content });
    res.status(200).json(result);
  } catch (error) {
    if (
      error.message === "Note not found or you are not authorized to view it"
    ) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getNotesWithUser = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await getNotesWithUserService({ userId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getNotesAggregate = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.query;
    const result = await getNotesAggregateService({ userId, title });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




export const deleteAllNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await deleteAllNotesService({ userId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};