import { Router } from 'express';
import {
  readAllAlbums,
  readAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from '../controllers/albums.controller.js';

export default Router()
  .get('/', readAllAlbums)
  .get('/:id', readAlbumById)
  .post('/', createAlbum)
  .put('/:id', updateAlbum)
  .delete('/:id', deleteAlbum);
