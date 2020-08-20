const Note = require("../models/note");
const mongoose = require("mongoose");

exports.notes_get_all = async (req, res, next) => {
    try {
      const docs = await Note.find().select("_id title content").exec();
      const response = {
        count: docs.length,
        notes: docs.map((doc) => {
          return {
            _id: doc._id,
            title: doc.title,
            content: doc.content,
            request: {
              type: "GET",
              url: "http://localhost:3000/notes/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  }

exports.notes_create_note = async (req, res, next) => {
    try {
      const note = new Note({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
      });
  
      const result = await note.save();
  
      res.status(201).json({
        message: "Created note successfully",
        createdNote: {
          _id: result._id,
          title: result.title,
          content: result.content,
          request: {
            type: "GET",
            url: "http://localhost:3000/notes/" + result._id,
          },
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  }

exports.notes_delete_all = async (req, res, next) => {
    try {
      await Note.deleteMany({}).exec();
  
      res.status(200).json({
        message: "All notes deleted",
        request: {
          type: "GET",
          url: "http://localhost:3000/notes/",
          body: { title: "String", content: "Number" },
        },
      });
    } catch (error) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  }

exports.notes_get_note = async (req, res, next) => {
    try {
      const id = req.params.noteId;
      const doc = await Note.findById(id).select("_id title content").exec();
  
      if (doc) {
        res.status(200).json({
          note: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/notes",
          },
        });
      } else {
        res.status(404).json({
          message: "No valid entry found for provided ID",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  }

exports.notes_edit_note = async (req, res, next) => {
    try {
      const id = req.params.noteId;
      const updateOps = {};
      for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
      }
  
      await Note.updateOne({ _id: id }, { $set: updateOps }).exec();
      const doc = await Note.findById(id).select("_id title content").exec();
  
      res.status(200).json({
        updatedNote: doc,
        message: "Note updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/notes/" + id,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  }

exports.notes_delete_note = async (req, res, next) => {
    try {
      const id = req.params.noteId;
      await Note.deleteOne({ _id: id }).exec();
  
      res.status(200).json({
        message: `${id} note deleted`,
        request: {
          type: "GET",
          url: "http://localhost:3000/notes/",
          body: { title: "String", content: "Number" },
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  }