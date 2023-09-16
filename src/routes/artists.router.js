import { Router } from 'express';
import {
  readAllArtists,
  updateArtist,
  createArtist,
  deleteArtist,
} from '../controllers/artists.controller.js';

export default Router()
  //artists
  .get('/', readAllArtists)
  .post('/', createArtist)
  .put('/:id', updateArtist)
  .delete('/:id', deleteArtist);
