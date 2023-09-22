import Router from 'express';
import {
  getGenreNames,
  getLabelNames,
  filter,
} from '../controllers/filter.controller';

export default Router()
  .get('/')
  .get('/genres', getGenreNames)
  .get('/labels', getLabelNames)
  .get('/genres/:table', filter.filterGenres)
  .get('/labels/:table', filter.filterLabels);
