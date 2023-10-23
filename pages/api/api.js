const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27018/beasiswa', {
  useNewUrlParser: true,
});

const Pendaftaran = mongoose.model('Pendaftaran', {
  name: String,
  nim: String,
  email: String,
  phone: String,
  semester: String,
  ipk: Number,
  beasiswa: String,
  berkas: String,
  statusAjuan: Boolean,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

app.post('/api/daftar', upload.single('berkas'), async (req, res) => {
  const { name, nim, email, phone, semester, ipk, beasiswa, statusAjuan } =
    req.body;
  const berkas = req.file;

  try {
    const pendaftaran = new Pendaftaran({
      name,
      nim,
      email,
      phone,
      semester,
      ipk,
      beasiswa,
      berkas: '/uploads/' + berkas.filename,
      statusAjuan,
    });

    await pendaftaran.save();

    res.status(200).json(pendaftaran);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mendaftar' });
  }
});

app.get('/api/daftar', async (req, res) => {
  const data = await Pendaftaran.find({});

  if (data.length < 1) {
    res.json({
      status: 404,
      message: 'Data tidak ditemukan!',
    });
  } else {
    res.json({
      status: 200,
      message: 'Data Ada',
      data,
    });
  }
});
app.get('/api/daftar-verifikasi', async (req, res) => {
  const data = await Pendaftaran.find({
    statusAjuan: true,
  });

  res.json(data);
});

app.put('/api/daftar/:id', async (req, res) => {
  const { id } = req.params;
  const { statusAjuan } = req.body;

  try {
    const data = await Pendaftaran.findById(id);
    if (data) {
      data.statusAjuan = statusAjuan;
      await data.save();
      res.json({
        status: 200,
        message: 'Data berhasil diupdate',
        data,
      });
    } else {
      res.json({
        status: 404,
        message: 'Data tidak ditemukan!',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal update' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
