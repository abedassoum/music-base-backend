import { Router } from 'express';
import {
  readAllArtists,
  updateArtist,
  createArtist,
  deleteArtist,
  readArtistById,
} from '../controllers/artists.controller.js';

export default Router()
  .get('/', readAllArtists)
  .get('/:id', readArtistById)
  .post('/', createArtist)
  .put('/:id', updateArtist)
  .delete('/:id', deleteArtist);
