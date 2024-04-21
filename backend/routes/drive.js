const express = require('express');
const multer = require('multer');
const File = require('../models/file'); 

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// POST endpoint for file upload
router.post('/files', upload.single('file'), async (req, res) => {
  try {
    const { name, type, location } = req.body;
    const newFile = new File({
      name: name || req.file.originalname,
      owner: req.user._id, 
      location: location || 'uploads/', 
      type: type || 'file', 
      fileSize: req.file.size
    });

    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET endpoint to list all files
router.get('/files', async (req, res) => {
  try {
    const files = await File.find({ owner: req.user._id }).sort({ uploadDate: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE endpoint to delete a file
router.delete('/files/:id', async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);
    res.json({ message: 'File deleted successfully', file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH endpoint to update file metadata
router.patch('/files/:id', upload.single('file'), async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'location', 'type']; 
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates!' });
  }

  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (file.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Permission denied' });
    }

    updates.forEach((update) => file[update] = req.body[update]);
    if (req.file) {
      file.location = req.file.path; 
      file.fileSize = req.file.size;
    }
    
    await file.save();
    res.json(file);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
