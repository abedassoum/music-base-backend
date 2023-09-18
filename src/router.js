import { Router } from 'express';
import homeRouter from './routes/home.router.js';
import artistsRouter from './routes/artists.router.js';
import albumsRouter from './routes/albums.router.js';
import songsRouter from './routes/songs.router.js';

export default Router()
  .use('/', homeRouter)
  .use('/artists', artistsRouter)
  .use('/albums', albumsRouter)
  .use('/songs', songsRouter);
