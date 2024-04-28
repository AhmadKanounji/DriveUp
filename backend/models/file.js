const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  storedFilename: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  lastAccessed: { type: Date, default: Date.now },
  location: { type: String, required: true },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  sharedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, required: true, enum: ['file', 'folder'] },
  fileSize: { type: Number }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
