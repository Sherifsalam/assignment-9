import { NoteModel } from "../../DB/models/notes.Model.js";
import mongoose from "mongoose";

export const createNoteService = async ({ userId, title, content }) => {
  const newNote = new NoteModel({ userId, title, content });
  await newNote.save();
  return { message: "Note created successfully", data: newNote };
};

export const updateNoteService = async ({ noteId, userId, title, content }) => {
  const updatedNote = await NoteModel.findOneAndUpdate(
    { _id: noteId, userId },
    { title, content },
    { new: true },
  );

  if (!updatedNote) {
    throw new Error("Note not found or you are not authorized to update it");
  }

  return { message: "Note updated successfully", data: updatedNote };
};

export const replaceNoteService = async ({
  noteId,
  userId,
  title,
  content,
}) => {
  const note = await NoteModel.findById(noteId);
  if (!note) throw new Error("Note not found");

  if (note.userId.toString() !== userId.toString()) {
    throw new Error("You are not authorized to update this note");
  }

  note.title = title;
  note.content = content;
  await note.save();

  return { message: "Note replaced successfully", data: note };
};

export const updateAllTitlesService = async ({ userId, title }) => {
  const result = await NoteModel.updateMany({ userId }, { $set: { title } });

  return { message: "All notes titles updated successfully", data: result };
};

export const deleteNoteService = async ({ noteId, userId }) => {
  const deletedNote = await NoteModel.findOneAndDelete({ _id: noteId, userId });
  if (!deletedNote) {
    throw new Error("Note not found or you are not authorized to delete it");
  }

  return { message: "Note deleted successfully", data: deletedNote };
};

export const getPaginatedNotesService = async ({ userId, page, limit }) => {
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const notes = await NoteModel.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNumber);

  const totalNotes = await NoteModel.countDocuments({ userId });

  return {
    message: "Notes retrieved successfully",
    data: notes,
    pagination: {
      currentPage: pageNumber,
      limit: limitNumber,
      totalNotes,
      totalPages: Math.ceil(totalNotes / limitNumber),
    },
  };
};

export const getnotebyidservice = async ({ noteId, userId }) => {
  const note = await NoteModel.findOne({ _id: noteId, userId });
  if (!note) {
    throw new Error("Note not found or you are not authorized to view it");
  }
  return { message: "Note retrieved successfully", data: note };
};

export const getNoteByContentService = async ({ userId, content }) => {
  const note = await NoteModel.findOne({
    userId,
    content: { $regex: content, $options: "i" }, // case-insensitive partial match
  });

  if (!note) {
    throw new Error("Note not found or you are not authorized to view it");
  }

  return { message: "Note retrieved successfully", data: note };
};

export const getNotesWithUserService = async ({ userId }) => {
  const notes = await NoteModel.find({ userId })
    .select("title userId createdAt")
    .populate("userId", "email");

  return { message: "Notes retrieved successfully", data: notes };
};

export const getNotesAggregateService = async ({ userId, title }) => {
  const matchStage = {
    userId: new mongoose.Types.ObjectId(userId),
  };

  if (title) {
    matchStage.title = { $regex: title, $options: "i" };
  }

  const notes = await NoteModel.aggregate([
    { $match: matchStage },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        title: 1,
        content: 1,
        createdAt: 1,
        "user.name": 1,
        "user.email": 1,
      },
    },
  ]);

  return { message: "Notes retrieved successfully", data: notes };
};

export const deleteAllNotesService = async ({ userId }) => {
  const result = await NoteModel.deleteMany({ userId });
  return { message: "All notes deleted successfully", data: result };
};