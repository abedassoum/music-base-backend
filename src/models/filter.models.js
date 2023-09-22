import connection from '../db/database.js';

async function query(sql, params) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

export async function filterGenres_db(table) {
  const sql = `SELECT * FROM ${table}`;
  try {
    const results = await query(sql);
    return results;
  } catch (err) {
    console.log(err);
  }
}

export async function filterLabels_db(table) {
  const sql = `SELECT * FROM ${table}`;
  try {
    const results = await query(sql);
    return results;
  } catch (err) {
    console.log(err);
  }
}

export async function getGenreNames_db () {
  const sql = `SELECT name FROM Genres`;
  try {
    const results = await query(sql);
    return results;
  } catch (err) {
    console.log(err);
  }
}

export async function getLabelNames_db () {
  const sql = `SELECT name FROM Labels`;
  try {
    const results = await query(sql);
    return results;
  } catch (err) {
    console.log(err);
  }
}
