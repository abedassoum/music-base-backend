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
  artist_name,
  album_name
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

          // find artist id from artist name in artist table
          connection.query(
            'SELECT id FROM artists WHERE name = ?',
            [artist_name],
            (err, artistResults) => {
              if (err) {
                reject(err);
              } else {
                console.log(artistResults);
                const artistId = artistResults[0].id;
                console.log(artistId);

                // find album id from album name in album table
                connection.query(
                  'SELECT id FROM albums WHERE title = ?',
                  [album_name],
                  (err, albumResults) => {
                    if (err) {
                      reject(err);
                    } else {
                      const albumId = albumResults[0].id;
                      console.log(albumId);

                      // insert song id, artist id in song_to_artist table
                      connection.query(
                        'INSERT INTO song_to_artists (song_id, artist_id) VALUES (?, ?)',
                        [songId, artistId],
                        (err, results) => {
                          if (err) {
                            reject(err);
                          } else {
                            console.log(results);
                            // insert song id, album id in song_to_album table
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
                );
              }
            }
          );
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
