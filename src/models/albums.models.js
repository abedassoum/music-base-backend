import connection from '../db/database.js';

async function query(sql, params) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results);
      }
    })
  })
}

export async function readAllAlbums_db() {
  const sql = `
  SELECT albums.*,
    GROUP_CONCAT(DISTINCT artists.name) AS artists,
      GROUP_CONCAT(DISTINCT labels.name) AS labels,
        GROUP_CONCAT(DISTINCT genres.name) AS genres,
          GROUP_CONCAT(DISTINCT songs.title) AS songs
  FROM albums
  LEFT JOIN album_artist ON albums.id = album_artist.album_id
  LEFT JOIN artists ON album_artist.artist_id = artists.id

  LEFT JOIN album_label ON albums.id = album_label.album_id
  LEFT JOIN labels ON album_label.label_id = labels.id

  LEFT JOIN album_genre ON albums.id = album_genre.album_id
  LEFT JOIN genres ON album_genre.genre_id = genres.id

  LEFT JOIN song_album ON albums.id = song_album.album_id
  LEFT JOIN songs ON song_album.song_id = songs.id
  GROUP BY albums.id
  `;

  try {
    const results = await query(sql);
    return results;
  } catch (error) {
    console.error('Error  reading all albums', error);
    throw error;
  }
}

export async function readAlbumById_db(id) {
  const sql = `
  SELECT albums.*,
    GROUP_CONCAT(DISTINCT artists.name) AS artists,
      GROUP_CONCAT(DISTINCT labels.name) AS labels,
        GROUP_CONCAT(DISTINCT genres.name) AS genres,
          GROUP_CONCAT(DISTINCT songs.title) AS songs
  FROM albums
  LEFT JOIN album_artist ON albums.id = album_artist.album_id
  LEFT JOIN artists ON album_artist.artist_id = artists.id

  LEFT JOIN album_label ON albums.id = album_label.album_id
  LEFT JOIN labels ON album_label.label_id = labels.id

  LEFT JOIN album_genre ON albums.id = album_genre.album_id
  LEFT JOIN genres ON album_genre.genre_id = genres.id

  LEFT JOIN song_album ON albums.id = song_album.album_id
  LEFT JOIN songs ON song_album.song_id = songs.id
  WHERE albums.id = ?
  GROUP BY albums.id
  `;

  try {
    const results = await query(sql, [id]);

    if (results.length === 0) {
      return null;
    }

    const album = results[0]

    album.artists = album.artists ? album.artists.split(',') : [];
    album.labels = album.labels ? album.labels.split(',') : [];
    album.genres = album.genres ? album.genres.split(',') : [];
    album.songs = album.songs ? album.songs.split(',') : [];
    return album;
  } catch (error) {
    console.error('Error getting album', error);
    throw error;
  }
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
