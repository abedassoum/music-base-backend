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
  id
) {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE songs SET title = ?, duration = ?, releaseDate = ?, bonus_track = ? WHERE id = ?',
      [title, duration, releaseDate, bonus_track, id],
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
) {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO songs (title, duration, releaseDate, bonus_track) VALUES (?, ?, ?, ?)',
      [title, duration, releaseDate, bonus_track],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          console.log(results)
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
