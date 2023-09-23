import connection from '../db/database.js';

async function query(sql, params) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

export async function readAllSongs_db() {
  const sql = `
    SELECT songs.*,
      GROUP_CONCAT(DISTINCT artists.name) AS artists, 
      GROUP_CONCAT(DISTINCT albums.title) AS albums,
      GROUP_CONCAT(DISTINCT genres.name) AS genres,
      GROUP_CONCAT(DISTINCT labels.name) AS labels
    FROM songs
    LEFT JOIN song_artist ON songs.id = song_artist.song_id
    LEFT JOIN artists ON song_artist.artist_id = artists.id
    LEFT JOIN song_album ON songs.id = song_album.song_id
    LEFT JOIN albums ON song_album.album_id = albums.id
    LEFT JOIN song_genre ON songs.id = song_genre.song_id
    LEFT JOIN genres ON song_genre.genre_id = genres.id
    LEFT JOIN song_label ON songs.id = song_label.song_id
    LEFT JOIN labels ON song_label.label_id = labels.id
    GROUP BY songs.id
  `;

  try {
    const results = await query(sql);

    // Parse the genres and labels into arrays if needed
    const songs = results.map(song => ({
      ...song,
      genres: song.genres ? song.genres.split(',') : [],
      labels: song.labels ? song.labels.split(',') : [],
      albums: song.albums ? song.albums.split(',') : [],
      artists: song.artists ? song.artists.split(',') : [],
    }));
    return results;
  } catch (error) {
    console.error('Error reading all songs:', error);
    throw error;
  }
}

export async function readSongById_db(id) {
  const sql = `
    SELECT 
      songs.*,
      GROUP_CONCAT(DISTINCT artists.name) AS artists, 
      GROUP_CONCAT(DISTINCT albums.title) AS albums,
      GROUP_CONCAT(DISTINCT genres.name) AS genres,
      GROUP_CONCAT(DISTINCT labels.name) AS labels
    FROM songs
    LEFT JOIN song_artist ON songs.id = song_artist.song_id
    LEFT JOIN artists ON song_artist.artist_id = artists.id
    LEFT JOIN song_album ON songs.id = song_album.song_id
    LEFT JOIN albums ON song_album.album_id = albums.id
    LEFT JOIN song_genre ON songs.id = song_genre.song_id
    LEFT JOIN genres ON song_genre.genre_id = genres.id
    LEFT JOIN song_label ON songs.id = song_label.song_id
    LEFT JOIN labels ON song_label.label_id = labels.id
    WHERE songs.id = ?
    GROUP BY songs.id
  `;

  try {
    const results = await query(sql, [id]);

    if (results.length === 0) {
      return null; // No song found
    }

    const song = results[0];

    // Parse the artists and albumsinto arrays if needed
    song.artists = song.artists ? song.artists.split(',') : [];
    song.albums = song.albums ? song.albums.split(',') : [];
    song.genres = song.genres ? song.genres.split(',') : [];
    song.labels = song.labels ? song.labels.split(',') : [];
    return song;
  } catch (error) {
    console.error('Error getting song:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function updateSong_db(
  songId,
  title,
  duration,
  releaseDate,
  bonus_track,
  artists, // array of artists names
  albums, // array of albums names
  genres,
  labels
) {
  const sql = `
    START TRANSACTION;

    UPDATE songs
    SET title = ?, duration = ?, releaseDate = ?, bonus_track = ?
    WHERE id = ?;

    DELETE FROM song_artist WHERE song_id = ?;
    DELETE FROM song_album WHERE song_id = ?;
    DELETE FROM song_genre WHERE song_id = ?;
    DELETE FROM song_label WHERE song_id = ?;

    INSERT INTO song_artist (song_id, artist_id)
    SELECT ?, id FROM artists WHERE name IN (?);

    INSERT INTO song_album (song_id, album_id)
    SELECT ?, id FROM albums WHERE title IN (?);

    INSERT INTO song_genre (song_id, genre_id)
    SELECT ?, id FROM genres WHERE name IN (?);

    INSERT INTO song_label (song_id, label_id)
    SELECT ?, id FROM labels WHERE name IN (?);

    COMMIT;
  `;

  try {
    const results = await query(sql, [
      title,
      duration,
      releaseDate,
      bonus_track,
      songId,
      songId,
      songId,
      songId,
      artists,
      songId,
      albums,
      songId,
      genres,
      songId,
      labels,
    ]);
    return results;
  } catch (error) {
    console.error('Error updating song:', error);
    throw error;
  }
}

export async function createSong_db(
  title,
  duration,
  releaseDate,
  bonus_track,
  artists, // array of artists names
  albums, // array of albums names
  genres,
  labels
) {
  const sql = `
    START TRANSACTION;
    
    INSERT INTO songs (title, duration, releaseDate, bonus_track)
    VALUES (?, ?, ?, ?);

    SET @songId = LAST_INSERT_ID();

    INSERT INTO song_artist (song_id, artist_id)
    SELECT @songId AS song_id, id FROM artists WHERE name IN (?);

    INSERT INTO song_album (song_id, album_id)
    SELECT @songId AS song_id, id FROM albums WHERE title IN (?);

    INSERT INTO song_genre (song_id, genre_id)
    SELECT @songId AS song_id, id FROM genres WHERE name IN (?);

    INSERT INTO song_label (song_id, label_id)
    SELECT @songId AS song_id, id FROM labels WHERE name IN (?);

    COMMIT;
  `;

  try {
    const results = await query(sql, [
      title,
      duration,
      releaseDate,
      bonus_track,
      artists,
      albums,
      genres,
      labels,
    ]);
    return results;
  } catch (error) {
    console.error('Error creating song:', error);
    throw error;
  }
}

export async function deleteSong_db(id) {
  const sql = `
    START TRANSACTION;

    DELETE FROM song_artist WHERE song_id = ?;
    DELETE FROM song_album WHERE song_id = ?;
    DELETE FROM song_genre WHERE song_id = ?;
    DELETE FROM song_label WHERE song_id = ?;

    DELETE FROM songs WHERE id = ?;


    COMMIT;
  `;

  try {
    const results = await query(sql, [id, id, id]);
    return results;
  } catch (error) {
    console.error('Error deleting song:', error);
    throw error;
  }
}
