import Router from 'express';
import {
  getGenres,
  getLabels,
} from '../controllers/filter.controller.js';

export default Router()
  .get('/', (req, res) => res.send('This is the home page'))
  .get('/genres', getGenres)
  .get('/labels', getLabels)
