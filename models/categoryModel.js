const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  kode: {
    type: String,
    required: [true, 'Kode kategori wajib diisi'],
    unique: true,
    trim: true,
    uppercase: true,
  },
  nama: {
    type: String,
    required: [true, 'Nama kategori wajib diisi'],
    trim: true,
  },
});

module.exports = mongoose.model('Category', categorySchema);