const { Router } = require("express");
const router = Router();

const NoteController = require('../controllers/note')

router.get("/", NoteController.notes_get_all);

router.post("/", NoteController.notes_create_note);

router.delete("/", NoteController.notes_delete_all);

router.get("/:noteId", NoteController.notes_get_note);

router.patch("/:noteId", NoteController.notes_edit_note);

router.delete("/:noteId", NoteController.notes_delete_note);

module.exports = router;
