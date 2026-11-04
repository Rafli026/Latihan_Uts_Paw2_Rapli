const Category = require('../models/categoryModel');

exports.create = async (req, res) => {
  const { kode, nama } = req.body;
  const category = await Category.create({ kode, nama });
  res.status(201).json(category);
};

exports.getAll = async (req, res) => {
  const categories = await Category.find().sort({ kode: 1 });
  res.json(categories);
};