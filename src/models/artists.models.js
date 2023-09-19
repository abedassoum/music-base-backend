import connection from '../db/database.js';

export function readAllArtists_db() {
  connection.query('SELECT * FROM Artists', (err, results) => {
    if (err) throw err;
    return results;
  });
}

export function readArtistById_db(id) {
  connection.query('SELECT * FROM Artists WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    return results;
  });
}

export function updateArtist_db(
  id,
  name,
  website,
  image,
  birthdate,
  activeSince,
  genres,
  labels
) {
  connection.query(
    'UPDATE Artists SET name = ?, website = ?, image = ?, birthdate = ?, activeSince = ?, WHERE id = ?',
    [name, website, image, birthdate, activeSince, id],
    (err, results) => {
      if (err) throw err;
      return results;
    }
  );
  // make genre and label junction tables - then update them here
}

export function createArtist_db(
  name,
  website,
  image,
  birthdate,
  activeSince,
  genres,
  // array of genre ids ["Rap", "Rock", "Pop"] connection.query('SELECT * FROM Genres WHERE name IN (?)', [genres], (err, results) => { if (err) throw err; return results; });
  labels
  // array of label ids ["Sony", "Warner", "Universal"] connection.query('SELECT * FROM Labels WHERE name IN (?)', [labels], (err, results) => { if (err) throw err; return results; });
) {
  connection.query(
    'INSERT INTO Artists (name, website, image, birthdate, activeSince) VALUES (?, ?, ?, ?, ?)',
    [name, website, image, birthdate, activeSince],
    (err, results) => {
      if (err) throw err;
      return results;
    }
  );

  // make genre and label junction tables - then update them here
}

export function deleteArtist_db(id) {
  connection.query('DELETE FROM Artists WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    return results;
  });
}
