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
export function updateSong_db(title, duration, releaseDate, bonus_track, id) {
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
  artists_names, // array of artists names
  albums_names // array of albums names
) {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO songs (title, duration, releaseDate, bonus_track) VALUES (?, ?, ?, ?)',
      [title, duration, releaseDate, bonus_track],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          const songId = results.insertId;
          // find artist id's from artist names in artists table
          for (const artist_name of artists_names) {
            connection.query(
              'SELECT id FROM artists WHERE name = ?',
              [artist_name],
              (err, artistsResults) => {
                if (err) {
                  reject(err);
                } else {
                  const artistId = artistsResults[0].id;
                  connection.query(
                    'INSERT INTO song_to_artists (song_id, artist_id) VALUES (?, ?)',
                    [songId, artistId],
                    (err, results) => {
                      if (err) {
                        reject(err);
                      } else {
                        console.log(results);
                      }
                    }
                  );
                }
              }
            );
          }
          // find album id's from album names in albums table
          for (const album_name of albums_names) {
            connection.query(
              'SELECT id FROM albums WHERE title = ?',
              [album_name],
              (err, albumsResults) => {
                if (err) {
                  reject(err);
                } else {
                  const albumId = albumsResults[0].id;
                  connection.query(
                    'INSERT INTO song_to_albums (song_id, album_id) VALUES (?, ?)',
                    [songId, albumId],
                    (err, results) => {
                      if (err) {
                        reject(err);
                      } else {
                        console.log(results);
                        resolve(results);
                      }
                    }
                  );
                }
              }
            );
          }
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
