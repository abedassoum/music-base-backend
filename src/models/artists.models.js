import connection from '../db/database.js';

export function readAllArtists_db() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM artists', (err, results) => {
      if (err) {
        reject(err); // Reject the promise with an error if there is one
      } else {
        const artistPromises = results.map(artist => {
          return new Promise((resolveArt, rejectArt) => {
            // Get genres for each artist
            connection.query(
              'SELECT genres.name FROM genres INNER JOIN artist_to_genre ON genres.id = artist_to_genre.genre_id WHERE artist_to_genre.artist_id = ?',
              [artist.id],
              (err, genreResults) => {
                if (err) {
                  console.error('Error getting genres:', err);
                  rejectArt(err);
                } else {
                  artist.genres = genreResults.map(result => result.name);

                  // Get labels for each artist
                  connection.query(
                    'SELECT labels.name FROM labels INNER JOIN artist_to_label ON labels.id = artist_to_label.label_id WHERE artist_to_label.artist_id = ?',
                    [artist.id],
                    (err, labelResults) => {
                      if (err) {
                        console.error('Error getting labels:', err);
                        rejectArt(err);
                      } else {
                        artist.labels = labelResults.map(result => result.name);
                        resolveArt(artist);
                      }
                    }
                  );
                }
              }
            );
          });
        });
        // Use Promise.all to wait for all artistPromises to resolve
        Promise.all(artistPromises)
          .then(artistsWithGenresAndLabels => {
            resolve(artistsWithGenresAndLabels);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  });
}
export function readArtistById_db(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM artists WHERE id = ?',
      [id],
      (err, results) => {
        if (err) {
          reject(err); // Reject the promise with an error if there is one
        } else {
          const artist = results[0];
          // Get genres for this artist
          connection.query(
            'SELECT genres.name FROM genres INNER JOIN artist_to_genre ON genres.id = artist_to_genre.genre_id WHERE artist_to_genre.artist_id = ?',
            [artist.id],
            (err, genreResults) => {
              if (err) {
                console.error('Error getting genres:', err);
                reject(err);
              } else {
                artist.genres = genreResults.map(result => result.name);
                // Get labels for this artist
                connection.query(
                  'SELECT labels.name FROM labels INNER JOIN artist_to_label ON labels.id = artist_to_label.label_id WHERE artist_to_label.artist_id = ?',
                  [artist.id],
                  (err, labelResults) => {
                    if (err) {
                      console.error('Error getting labels:', err);
                      reject(err);
                    } else {
                      artist.labels = labelResults.map(result => result.name);
                      resolve(artist);
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

export function updateArtist_db(
  id,
  name,
  website,
  image,
  birthdate,
  activeSince,
  genres, // Array of genres [ "Rap", "Rock", etc...]
  labels // Array of labels ["XL recordings", "Def Jam", etc...]
) {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE artists SET name = ?, website = ?, image = ?, birthdate = ?, activeSince = ? WHERE id = ?',
      [name, website, image, birthdate, activeSince, id],
      (err, results) => {
        if (err) {
          reject(err); // Reject the promise with an error if there is one
        } else {
          // Delete all genres and labels for this artist
          connection.query(
            'DELETE FROM artist_to_genre WHERE artist_id = ?',
            [id],
            err => {
              if (err) {
                console.error('Error deleting genres:', err);
              }
            }
          );
          connection.query(
            'DELETE FROM artist_to_label WHERE artist_id = ?',
            [id],
            err => {
              if (err) {
                console.error('Error deleting labels:', err);
              }
            }
          );
          // Insert genres into artist_to_genres
          for (const genre of genres) {
            connection.query(
              'INSERT INTO artist_to_genre (artist_id, genre_id) VALUES (?, (SELECT id FROM genres WHERE name = ?))',
              [id, genre],
              err => {
                if (err) {
                  console.error('Error inserting genre:', err);
                }
              }
            );
          }
          // Insert labels into artist_to_labels
          for (const label of labels) {
            connection.query(
              'INSERT INTO artist_to_label (artist_id, label_id) VALUES (?, (SELECT id FROM labels WHERE name = ?))',
              [id, label],
              err => {
                if (err) {
                  console.error('Error inserting label:', err);
                }
              }
            );
          }
          resolve(results); // Resolve the promise with the query results
        }
      }
    );
  });
}

export function createArtist_db(
  name,
  website,
  image,
  birthdate,
  activeSince,
  genres, // Array of genres [ "Rap", "Rock"]
  labels // Array of labels ["XL recordings", "Def Jam"]
) {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO artists (name, website, image, birthdate, activeSince) VALUES (?, ?, ?, ?, ?)',
      [name, website, image, birthdate, activeSince],
      (err, results) => {
        if (err) {
          reject(err); // Reject the promise with an error if there is one
        } else {
          // Get the generated artist ID
          const artistId = results.insertId;
          // Insert genres into artist_to_genres
          for (const genre of genres) {
            connection.query(
              'INSERT INTO artist_to_genre (artist_id, genre_id) VALUES (?, (SELECT id FROM genres WHERE name = ?))',
              [artistId, genre],
              err => {
                if (err) {
                  console.error('Error inserting genre:', err);
                }
              }
            );
          }
          // Insert labels into artist_to_labels
          for (const label of labels) {
            connection.query(
              'INSERT INTO artist_to_label (artist_id, label_id) VALUES (?, (SELECT id FROM labels WHERE name = ?))',
              [artistId, label],
              err => {
                if (err) {
                  console.error('Error inserting label:', err);
                }
              }
            );
          }
          resolve(results); // Resolve the promise with the query results
        }
      }
    );
  });
}

export function deleteArtist_db(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      'DELETE FROM artists WHERE id = ?',
      [id],
      (err, results) => {
        if (err) {
          reject(err); // Reject the promise with an error if there is one
        } else {
          // Delete all genres and labels for this artist
          connection.query(
            'DELETE FROM artist_to_genre WHERE artist_id = ?',
            [id],
            err => {
              if (err) {
                console.error('Error deleting genres:', err);
              }
            }
          );
          connection.query(
            'DELETE FROM artist_to_label WHERE artist_id = ?',
            [id],
            err => {
              if (err) {
                console.error('Error deleting labels:', err);
              }
            }
          );
          resolve(results); // Resolve the promise with the query results
        }
      }
    );
  });
}
