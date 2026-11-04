require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const bouquetRoutes = require('./routes/bouquetRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST'],
}));

app.use(express.json());
app.use('/categories', categoryRoutes);
app.use('/bouquets', bouquetRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Terhubung ke MongoDB');
    app.listen(port, () => {
      console.log(`Server aktif di http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Gagal terhubung ke MongoDB:', error.message);
    process.exit(1);
  });