const Notes = require("../models/Notes");
const mongoose = require("mongoose");
const postNotes = async (req, res) => {
  const notes = req.body;
  try {
    const newNotes = await new Notes(notes);
    newNotes.save();
    // console.log(newNotes);
    res.status(201).json(newNotes);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getNotes = async (req, res) => {
  const notes = req.body;
  try {
    const readNotes = await Notes.find(notes);
    res.status(201).json(readNotes);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const deleteNotes = async (req, res) => {
  const { id } = req.params;
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      await Notes.findByIdAndDelete(id);
      res.status(201).json({ message: "Deleted Successfully" });
    } else {
      res.status(400).json({ message: "Could not delete" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const updateNotes = async (req, res) => {
  const { id } = req.params;
  const { title, description, image } = req.body;
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const updatedNotes = {
        title,
        description,
        image,
        _id: id,
      };
      await Notes.findByIdAndUpdate(id, updatedNotes, { new: true });
    } else {
      res.status(404).json({ msg: "No item with id " + id });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

module.exports = { postNotes, getNotes, deleteNotes, updateNotes };
