const { nanoid } = require("nanoid");
const notes = require("./notes");

/* function to push (save) into empty array in notes.js.
Nanoid is library for generate random id */
const addNoteHandler = (request, handler) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = handler.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });

    response.code(201);
    return response;
  }
};

/* function to get all notes inside notes.js*/
const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

/* Function to get detail of note */
const getNoteByIdHandler = (request, handler) => {
  console.log("detail");
  const { id } = request.params;

  const note = notes.filter((note) => note.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const response = handler.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

/* Function to update note */
const editNoteByIdHandler = (request, handler) => {
  const { id } = request.params;
  console.log("edit");

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  /* if note not exist it will return -1. 
  Spread operator (...) had function to prevent change for index*/
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = { ...notes[index], title, tags, body, updatedAt };

    const response = handler.response({
      status: "success",
      message: "Catatan berhasil diperbaharui",
    });

    response.code(200);
    return response;
  }

  const response = handler.response({
    status: "fail",
    message: "Gagal, note tidak ditemukan",
  });

  response.code(404);
  return response;
};

/* Function to delete note */
const deleteNoteByIdHandler = (request, handler) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = handler.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });

    response.code(200);
    return response;
  }

  const response = handler.response({
    status: "fail",
    message: "Catatan gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
