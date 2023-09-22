import {
  filterGenres_db,
  filterLabels_db,
  getGenreNames_db,
  getLabelNames_db,
} from '../models/filter.models.js';

export class filter {
  static async filterGenres(req, res) {
    const table = req.params.table;

    try {
      const results = await filterGenres_db(table);
      res.status(200).json(results);
    } catch (err) {
      console.log(err);
    }
  }
  static async filterLabels(req, res) {
    const table = req.params.table;

    try {
      const results = await filterLabels_db(table);
      res.status(200).json(results);
    } catch (err) {
      console.log(err);
    }
  }
}

export async function getGenreNames(req, res) {
  try {
    const results = await getGenreNames_db();
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
  }
}

export async function getLabelNames(req, res) {
  try {
    const results = await getLabelNames_db();
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
  }
}
