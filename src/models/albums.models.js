import connection from '../db/database.js';

export async function readAllAlbums_db() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM albums', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

export function readAlbumById_db(id) {
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

export function updateAlbum_db(id, name, year, image, artist, genres, labels) {
  connection.query(
    'UPDATE albums SET name = ?, year = ?, image = ?, artist = ?, genres = ?, labels = ? WHERE id = ?',
    [name, year, image, artist, genres, labels, id],
    (err, results) => {
      if (err) throw err;
      return results;
    }
  );
  // make genre and label junction tables - then update them here
}

export function createAlbum_db(name, year, image, artist, genres, labels) {
  connection.query(
    'INSERT INTO albums (name, year, image, artist, genres, labels) VALUES (?, ?, ?, ?, ?, ?)',
    [name, year, image, artist, genres, labels],
    (err, results) => {
      if (err) throw err;
      return results;
    }
  );

  // make genre and label junction tables - then update them here
}

export function deleteAlbum_db(id) {
  connection.query('DELETE FROM albums WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    return results;
  });
}
