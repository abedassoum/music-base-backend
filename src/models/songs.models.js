import connection from '../db/database.js';

export async function readAllSongs_db() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM songs', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

export function readSongById_db(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM songs WHERE id = ?',
      [id],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}
export function updateSong_db(
  title,
  duration,
  releaseDate,
  bonus_track,
  artist_id,
  album_id,
  id
) {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE songs SET title = ?, duration = ?, releaseDate = ?, bonus_track = ?, artist_id = ?, album_id = ? WHERE id = ?',
      [title, duration, releaseDate, bonus_track, artist_id, album_id, id],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          console.log(results);
          resolve(results);
        }
      }
    );
  });
}

export function createSong_db(
  title,
  duration,
  releaseDate,
  bonus_track,
  artist_id,
  album_id
) {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO songs (title, duration, releaseDate, bonus_track, artist_id, album_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, duration, releaseDate, bonus_track, artist_id, album_id],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

export function deleteSong_db(id) {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM songs WHERE id = ?', [id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
