import Router from 'express';
import {
  getGenreNames,
  getLabelNames,
  filter,
} from '../controllers/filter.controller.js';

export default Router()
  .get('/', (req, res) => res.send('This is the home page'))
  .get('/genres', getGenreNames)
  .get('/labels', getLabelNames)
  .get('/genres/:table', filter.filterGenres)
  .get('/labels/:table', filter.filterLabels);
