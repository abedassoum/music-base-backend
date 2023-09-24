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
  static async filterForLabel_db(label, table) {
    const sql = `SELECT * FROM ${table} WHERE label_id IN (?)`;
    try {
      const results = await query(sql, [label]);
      return results;
    } catch (err) {
      console.log(err);
    }
  }

  static async filterForGenre_db(genre, table) {
    const sql = `SELECT * FROM ${table} WHERE genre_id IN (?)`;
    try {
      const results = await query(sql, [genre]);
      return results;
    } catch (err) {
      console.log(err);
    }
  }

  static async filterForArtist_db(artist, table) {
    const sql = `SELECT * FROM ${table} WHERE artist_id IN (?)`;
    try {
      const results = await query(sql, [artist]);
      return results;
    } catch (err) {
      console.log(err);
    }
  }

  static async filterForAlbum_db(album, table) {
    const sql = `SELECT * FROM ${table} WHERE album_id IN (?)`;
    try {
      const results = await query(sql, [album]);
      return results;
    } catch (err) {
      console.log(err);
    }
  }

  static async filterForSong_db(song, table) {
    const sql = `SELECT * FROM ${table} WHERE song_id IN (?)`;
    try {
      const results = await query(sql, [song]);
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
