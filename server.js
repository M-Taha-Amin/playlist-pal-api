import express from 'express';
import playlistRoutes from './routes/playlist.routes.js';
import cors from 'cors';
import path from 'path';

const app = express();
const __dirname = path.resolve();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/playlist', playlistRoutes);

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Listening on Port 3000...');
});
