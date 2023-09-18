import con from '../db/database.js';

export function readAllAlbums_db() {
  con.query('SELECT * FROM Albums', (err, results) => {
    if (err) throw err;
    return results;
  });
}

export function readAlbumById_db(id) {
  con.query('SELECT * FROM Albums WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    return results;
  });
}

export function updateAlbum_db(id, name, year, image, artist, genres, labels) {
  con.query(
    'UPDATE Albums SET name = ?, year = ?, image = ?, artist = ?, genres = ?, labels = ? WHERE id = ?',
    [name, year, image, artist, genres, labels, id],
    (err, results) => {
      if (err) throw err;
      return results;
    }
  );
  // make genre and label junction tables - then update them here
}

export function createAlbum_db(name, year, image, artist, genres, labels) {
  con.query(
    'INSERT INTO Albums (name, year, image, artist, genres, labels) VALUES (?, ?, ?, ?, ?, ?)',
    [name, year, image, artist, genres, labels],
    (err, results) => {
      if (err) throw err;
      return results;
    }
  );

  // make genre and label junction tables - then update them here
}

export function deleteAlbum_db(id) {
  con.query('DELETE FROM Albums WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    return results;
  });
}
