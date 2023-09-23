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

export async function readAllArtists_db() {
  const sql = `
    SELECT 
      artists.*,
      GROUP_CONCAT(DISTINCT genres.name) AS genres,
      GROUP_CONCAT(DISTINCT labels.name) AS labels,
      GROUP_CONCAT(DISTINCT albums.title) AS albums,
      GROUP_CONCAT(DISTINCT songs.title) AS songs
    FROM artists
    LEFT JOIN artist_genre ON artists.id = artist_genre.artist_id
    LEFT JOIN genres ON artist_genre.genre_id = genres.id
    LEFT JOIN artist_label ON artists.id = artist_label.artist_id
    LEFT JOIN labels ON artist_label.label_id = labels.id
    LEFT JOIN album_artist ON artists.id = album_artist.artist_id
    LEFT JOIN albums ON album_artist.album_id = albums.id
    LEFT JOIN song_artist ON artists.id = song_artist.artist_id
    LEFT JOIN songs ON song_artist.song_id = songs.id
    GROUP BY artists.id
  `;

  try {
    const results = await query(sql);

    // Parse the genres and labels into arrays if needed
    const artistsWithGenresAndLabels = results.map(artist => ({
      ...artist,
      genres: artist.genres ? artist.genres.split(',') : [],
      labels: artist.labels ? artist.labels.split(',') : [],
      albums: artist.albums ? artist.albums.split(',') : [],
      songs: artist.songs ? artist.songs.split(',') : [],
    }));

    return artistsWithGenresAndLabels;
  } catch (error) {
    console.error('Error getting artists:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function readArtistById_db(id) {
  const sql = `
    SELECT 
      artists.*,
      GROUP_CONCAT(DISTINCT genres.name) AS genres,
      GROUP_CONCAT(DISTINCT labels.name) AS labels,
      GROUP_CONCAT(DISTINCT albums.title) AS albums,
      GROUP_CONCAT(DISTINCT songs.title) AS songs
    FROM artists
    LEFT JOIN artist_genre ON artists.id = artist_genre.artist_id
    LEFT JOIN genres ON artist_genre.genre_id = genres.id
    LEFT JOIN artist_label ON artists.id = artist_label.artist_id
    LEFT JOIN labels ON artist_label.label_id = labels.id
    LEFT JOIN album_artist ON artists.id = album_artist.artist_id
    LEFT JOIN albums ON album_artist.album_id = albums.id
    LEFT JOIN song_artist ON artists.id = song_artist.artist_id
    LEFT JOIN songs ON song_artist.song_id = songs.id
    WHERE artists.id = ?
    GROUP BY artists.id
  `;

  try {
    const results = await query(sql, [id]);

    if (results.length === 0) {
      return null; // Return null if artist with the given ID is not found
    }

    const artist = results[0];

    // Parse the genre_names and label_names into arrays if needed
    artist.genres = artist.genres ? artist.genres.split(',') : [];
    artist.labels = artist.labels ? artist.labels.split(',') : [];

    return artist;
  } catch (error) {
    console.error('Error getting artist:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function updateArtist_db(
  artistId,
  name,
  birthdate,
  activeSince,
  website,
  image,
  shortDescription,
  favorite,
  genres, // Array of genres [ "Rap", "Rock", etc...]
  labels, // Array of labels ["XL recordings", "Def Jam", etc...]
  albums, // Array of albums ["The Eminem Show", "The Marshall Mathers LP", etc...]
  songs // Array of songs ["Lose Yourself", "Stan", etc...]
) {
  const sql = `

    START TRANSACTION;

    UPDATE artists 
    SET name = ?,birthdate  = ?,activeSince  = ?, website = ?, image = ?, shortDescription = ?, favorite = ?
    WHERE id = ?;
    
    DELETE FROM artist_genre WHERE artist_id = ?;
    DELETE FROM artist_label WHERE artist_id = ?;
    DELETE FROM album_artist WHERE artist_id = ?;
    DELETE FROM song_artist WHERE artist_id = ?;
    
    INSERT INTO artist_genre (artist_id, genre_id)
    SELECT ?, id FROM genres WHERE name IN (?);
    
    INSERT INTO artist_label (artist_id, label_id)
    SELECT ?, id FROM labels WHERE name IN (?);

    INSERT INTO album_artist (album_id, artist_id)
    SELECT id, ? FROM albums WHERE title IN (?);

    INSERT INTO song_artist (song_id, artist_id)
    SELECT id, ? FROM songs WHERE title IN (?);

    COMMIT;
  `;

  try {
    const results = await query(sql, [
      name,
      birthdate,
      activeSince,
      website,
      image,
      shortDescription,
      favorite,
      artistId,
      artistId,
      artistId,
      artistId,
      genres,
      artistId,
      labels,
      artistId,
      albums,
      artistId,
      songs,
    ]);

    return results;
  } catch (error) {
    console.error('Error updating artist:', error);
    throw error;
  }
}

export async function createArtist_db(
  name,
  birthdate,
  activeSince,
  website,
  image,
  shortDescription,
  favorite,
  genres, // Array of genres [ "Rap", "Rock"]
  labels, // Array of labels ["XL recordings", "Def Jam"]
  albums, // Array of albums ["The Eminem Show", "The Marshall Mathers LP"]
  songs // Array of songs ["Lose Yourself", "Stan"]
  ) 
{
  const sql = ` 

    START TRANSACTION;

    INSERT INTO artists (name, birthdate , activeSince , website, image, shortDescription, favorite)
    VALUES (?, ?, ?, ?, ?, ?, ?);
    
    SET @artistId = LAST_INSERT_ID();
    
    INSERT INTO artist_genre (artist_id, genre_id)
    SELECT @artistId AS artist_id, id FROM genres WHERE name IN (?);
    
    INSERT INTO artist_label (artist_id, label_id)
    SELECT @artistId AS artist_id, id FROM labels WHERE name IN (?);

    INSERT INTO album_artist (album_id, artist_id)
    SELECT id, @artistId FROM albums WHERE title IN (?);

    INSERT INTO song_artist (song_id, artist_id)
    SELECT id, @artistId FROM songs WHERE title IN (?);

    COMMIT;
  `;

  try {
    const results = await query(sql, [
      name,
      birthdate,
      activeSince,
      website,
      image,
      shortDescription,
      favorite,
      genres,
      labels,
    ]);

    return results;
  } catch (error) {
    console.error('Error creating artist:', error);
    throw error;
  }
}

export async function deleteArtist_db(id) {
  const sql = `
    START TRANSACTION;

    DELETE FROM artist_genre WHERE artist_id = ?;
    DELETE FROM artist_label WHERE artist_id = ?;
    DELETE FROM album_artist WHERE artist_id = ?;
    DELETE FROM song_artist WHERE artist_id = ?;

    DELETE FROM artists WHERE id = ?;

    COMMIT;
  `;

  try {
    const results = await query(sql, [id, id, id]);
    return results;
  } catch (error) {
    console.error('Error deleting artist:', error);
    throw error;
  }
}
