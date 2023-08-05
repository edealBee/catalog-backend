import express from 'express';
import mongoose from 'mongoose';
import authRouter from './auth/authRouter.js';
import cors from 'cors';
import { postValidation } from './validations/validations.js';
import handleValidationErrors from './validations/handleValidationErrors.js';
import { createPost, updatePost, deletePost, getPost, getPosts } from './post/postController.js';
import checkAuth from './checkAuth.js';
import multer from 'multer';

const app = express();

const PORT = process.env.PORT || 4444;

mongoose.set('strictQuery', false);

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use('/auth', authRouter);

app.use(express.json());

app.get('/posts', getPosts);

app.get('/posts/:id', getPost);

app.post('/posts', checkAuth, postValidation, handleValidationErrors, createPost);

app.patch('/posts/:id', checkAuth, postValidation, handleValidationErrors, updatePost);

app.delete('/posts/:id', checkAuth, deletePost);

try {
  mongoose
    .connect('mongodb+srv://edeal:12345@catalogcluster.owsvled.mongodb.net/CatalogCluster')
    .then(() => console.log('Mongoose is OK'))
    .catch((err) => console.log('Mongoose is BAD'));
  app.listen(PORT, () => {
    console.log('Server is OK');
  });
} catch (err) {
  console.log(err);
}
