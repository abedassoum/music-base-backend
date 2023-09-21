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
      GROUP_CONCAT(DISTINCT albums.title) AS albums
    FROM songs
    LEFT JOIN song_to_artists ON songs.id = song_to_artists.song_id
    LEFT JOIN artists ON song_to_artists.artist_id = artists.id
    LEFT JOIN song_to_albums ON songs.id = song_to_albums.song_id
    LEFT JOIN albums ON song_to_albums.album_id = albums.id
    GROUP BY songs.id
  `;

  try {
    const results = await query(sql);
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
      GROUP_CONCAT(DISTINCT albums.title) AS albums
    FROM songs
    LEFT JOIN song_to_artists ON songs.id = song_to_artists.song_id
    LEFT JOIN artists ON song_to_artists.artist_id = artists.id
    LEFT JOIN song_to_albums ON songs.id = song_to_albums.song_id
    LEFT JOIN albums ON song_to_albums.album_id = albums.id
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
    return song;
  } catch (error) {
    console.error('Error getting song:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function updateSong_db(
  id,
  title,
  duration,
  releaseDate,
  bonus_track,
  artists, // array of artists names
  albums // array of albums names
) {
  const sql = `

    START TRANSACTION;

    UPDATE songs
    SET title = ?, duration = ?, releaseDate = ?, bonus_track = ?
    WHERE id = ?;

    DELETE FROM song_to_artists WHERE song_id = ?;
    DELETE FROM song_to_albums WHERE song_id = ?;

    INSERT INTO song_to_artists (song_id, artist_id)
    SELECT ?, id FROM artists WHERE name IN (?);

    INSERT INTO song_to_albums (song_id, album_id)
    SELECT ?, id FROM albums WHERE title IN (?);

    COMMIT;
  `;

  try {
    const results = await query(sql, [
      title,
      duration,
      releaseDate,
      bonus_track,
      id,
      id,
      id,
      artists,
      id,
      albums,
      id,
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
  albums // array of albums names
) {
  const sql = `
    START TRANSACTION;
    
    INSERT INTO songs (title, duration, releaseDate, bonus_track)
    VALUES (?, ?, ?, ?);

    SET @songId = LAST_INSERT_ID();

    INSERT INTO song_to_artists (song_id, artist_id)
    SELECT @songId AS song_id, id FROM artists WHERE name IN (?);

    INSERT INTO song_to_albums (song_id, album_id)
    SELECT @songId AS song_id, id FROM albums WHERE title IN (?);

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

    DELETE FROM song_to_artists WHERE song_id = ?;
    DELETE FROM song_to_albums WHERE song_id = ?;

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
