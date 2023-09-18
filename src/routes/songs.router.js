import { Router } from 'express';
import {
  readAllSongs,
  readSongById,
  createSong,
  updateSong,
  deleteSong,
} from '../controllers/songs.controller.js';

export default Router()
  .get('/', readAllSongs)
  .get('/:id', readSongById)
  .post('/', createSong)
  .put('/:id', updateSong)
  .delete('/:id', deleteSong);
