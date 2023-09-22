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
      GROUP_CONCAT(DISTINCT labels.name) AS labels
    FROM artists
    LEFT JOIN artist_to_genre ON artists.id = artist_to_genre.artist_id
    LEFT JOIN genres ON artist_to_genre.genre_id = genres.id
    LEFT JOIN artist_to_label ON artists.id = artist_to_label.artist_id
    LEFT JOIN labels ON artist_to_label.label_id = labels.id
    GROUP BY artists.id
  `;

  try {
    const results = await query(sql);

    // Parse the genres and labels into arrays if needed
    const artistsWithGenresAndLabels = results.map(artist => ({
      ...artist,
      genres: artist.genres ? artist.genres.split(',') : [],
      labels: artist.labels ? artist.labels.split(',') : [],
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
      GROUP_CONCAT(DISTINCT labels.name) AS labels
    FROM artists
    LEFT JOIN artist_to_genre ON artists.id = artist_to_genre.artist_id
    LEFT JOIN genres ON artist_to_genre.genre_id = genres.id
    LEFT JOIN artist_to_label ON artists.id = artist_to_label.artist_id
    LEFT JOIN labels ON artist_to_label.label_id = labels.id
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
  genres,
  labels
) {
  const sql = `

    START TRANSACTION;

    UPDATE artists 
    SET name = ?,birthdate  = ?,activeSince  = ?, website = ?, image = ?, shortDescription = ?, favorite = ?
    WHERE id = ?;
    
    DELETE FROM artist_to_genre WHERE artist_id = ?;
    DELETE FROM artist_to_label WHERE artist_id = ?;
    
    INSERT INTO artist_to_genre (artist_id, genre_id)
    SELECT ?, id FROM genres WHERE name IN (?);
    
    INSERT INTO artist_to_label (artist_id, label_id)
    SELECT ?, id FROM labels WHERE name IN (?);

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
  genres,
  labels
) {
  const sql = ` 

    START TRANSACTION;

    INSERT INTO artists (name, birthdate , activeSince , website, image, shortDescription, favorite)
    VALUES (?, ?, ?, ?, ?, ?, ?);
    
    SET @artistId = LAST_INSERT_ID();
    
    INSERT INTO artist_to_genre (artist_id, genre_id)
    SELECT @artistId AS artist_id, id FROM genres WHERE name IN (?);
    
    INSERT INTO artist_to_label (artist_id, label_id)
    SELECT @artistId AS artist_id, id FROM labels WHERE name IN (?);

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

    DELETE FROM artist_to_genre WHERE artist_id = ?;
    DELETE FROM artist_to_label WHERE artist_id = ?;

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
