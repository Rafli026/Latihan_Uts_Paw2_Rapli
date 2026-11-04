const mongoose = require('mongoose');

const detailKartuSchema = new mongoose.Schema({
  warnaPita: { type: String, trim: true },
  pesan: { type: String, trim: true },
}, { _id: false });

const bouquetSchema = new mongoose.Schema({
  kode: {
    type: String,
    required: [true, 'Kode buket wajib diisi'],
    unique: true,
    trim: true,
    uppercase: true,
  },
  nama: {
    type: String,
    required: [true, 'Nama buket wajib diisi'],
    trim: true,
  },
  jenisBunga: {
    type: String,
    required: [true, 'Jenis bunga wajib diisi'],
    trim: true,
  },
  warna: { type: String, required: true, trim: true },
  harga: { type: Number, required: true, min: 0 },
  stok: { type: Number, required: true, min: 0 },
  detailKartu: detailKartuSchema,
  kategori: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Kategori wajib dipilih'],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bouquet', bouquetSchema);