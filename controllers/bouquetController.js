const mongoose = require('mongoose');
const Bouquet = require('../models/bouquetModel');

exports.create = async (req, res) => {
  const {
    kode, nama, jenisBunga, warna, harga, stok, detailKartu, kategori,
  } = req.body;

  const bouquet = await Bouquet.create({
    kode, nama, jenisBunga, warna, harga, stok, detailKartu, kategori,
  });

  res.status(201).json(bouquet);
};

exports.getAll = async (req, res) => {
  const filter = {};
  if (req.query.jenisBunga !== undefined) {
    filter.jenisBunga = String(req.query.jenisBunga);
  }

  const bouquets = await Bouquet.find(filter)
    .select('_id kode nama jenisBunga warna harga stok')
    .sort({ createdAt: -1 });

  res.json(bouquets);
};

exports.getById = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'ID tidak valid' });
  }

  const bouquet = await Bouquet.findById(req.params.id)
    .populate('kategori', 'kode nama');

  if (!bouquet) {
    return res.status(404).json({ message: 'Data buket tidak ditemukan' });
  }

  res.json(bouquet);
};