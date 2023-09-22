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

export function updateAlbum_db(title, releaseDate, genre, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE albums SET title = ?, releaseDate = ?, genre = ? WHERE id = ?',
      [title, releaseDate, genre, id],
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
  // make genre and label junction tables - then update them here
}

export function createAlbum_db(
  title,
  releaseDate,
  genres,
  artists,
  labels,
  songs
) {
  return new Promise((resolve, reject) => {
    const query = `
      START TRANSACTION;
      
      INSERT INTO albums (title, releaseDate) VALUES (?, ?);
      SET @albumId = LAST_INSERT_ID();

      INSERT INTO album_artist (album_id, artist_id)
      SELECT @albumId, id FROM artists WHERE name IN (?);
      
      INSERT INTO album_label (album_id, label_id)
      SELECT @albumId, id FROM labels WHERE name IN (?);
      
      INSERT INTO album_genre (album_id, genre_id)
      SELECT @albumId, id FROM genres WHERE name IN (?);
      
      INSERT INTO song_album (album_id, song_id)
      SELECT @albumId, id FROM songs WHERE title IN (?);
      
      COMMIT;
    `;

    const values = [title, releaseDate, artists, labels, genres, songs];

    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

export function deleteAlbum_db(id) {
  connection.query('DELETE FROM albums WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    return results;
  });
}
