import {
  getGenres_db,
  getLabels_db,
} from '../models/filter.models.js';

export async function getGenres(req, res) {
  try {
    const results = await getGenres_db();
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
  }
}

export async function getLabels(req, res) {
  try {
    const results = await getLabels_db();
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
  }
}
