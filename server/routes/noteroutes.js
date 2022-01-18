const express = require("express");
const {
  postNotes,
  getNotes,
  deleteNotes,
  updateNotes,
} = require("../controllers/notescontoller");
const router = express.Router();

router.post("/", postNotes);
router.get("/", getNotes);
router.delete("/:id", deleteNotes);
router.put("/:id", updateNotes);

module.exports = router;
