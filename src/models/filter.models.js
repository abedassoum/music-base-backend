import connection from '../db/database.js';

async function query(sql, params) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

export class filter_db {
  static async filterForLabel_db(labels, table) {
    const sql = `SELECT * FROM ${table} WHERE label_id IN (?)`;
    try {
      const results = await query(sql, [labels]);
      return results;
    } catch (err) {
      console.log(err);
    }
  }

  static async filterForGenre_db(genres, table) {
    const sql = `SELECT * FROM ${table} WHERE genre_id IN (?)`;
    try {
      const results = await query(sql, [genres]);
      return results;
    } catch (err) {
      console.log(err);
    }
  }

  static async filterForArtist_db(artists, table) {
    const sql = `SELECT * FROM ${table} WHERE artist_id IN (?)`;
    try {
      const results = await query(sql, [artists]);
      return results;
    } catch (err) {
      console.log(err);
    }
  }

  static async filterForAlbum_db(albums, table) {
    const sql = `SELECT * FROM ${table} WHERE album_id IN (?)`;
    try {
      const results = await query(sql, [albums]);
      return results;
    } catch (err) {
      console.log(err);
    }
  }

  static async filterForSong_db(songs, table) {
    const sql = `SELECT * FROM ${table} WHERE song_id IN (?)`;
    try {
      const results = await query(sql, [songs]);
      return results;
    } catch (err) {
      console.log(err);
    }
  }
}

export async function getGenres_db() {
  const sql = `SELECT * FROM genres`;
  try {
    const results = await query(sql);
    return results;
  } catch (err) {
    console.log(err);
  }
}

export async function getLabels_db() {
  const sql = `SELECT * FROM labels`;
  try {
    const results = await query(sql);
    return results;
  } catch (err) {
    console.log(err);
  }
}
