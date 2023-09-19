import connection from '../db/database.js';

export function readAllSongs_db() {
  connection.query('SELECT * FROM songs', (err, results) => {
    if (err) throw err;
    return results;
  });
}

export function readSongById_db(id) {
  connection.query('SELECT * FROM songs WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    return results;
  });
}

export function updateSong_db(id, name, artist, album, genre) {
  connection.query(
    'UPDATE songs SET name = ?, artist = ?, album = ?, genre = ?, WHERE id = ?',
    [name, artist, album, genre, id],
    (err, results) => {
      if (err) throw err;
      return results;
    }
  );
}

export function createSong_db(name, artist, album, genre) {
  connection.query(
    'INSERT INTO songs (name, artist, album, genre) VALUES (?, ?, ?, ?, ?)',
    [name, artist, album, genre],
    (err, results) => {
      if (err) throw err;
      return results;
    }
  );

  // make genre and label junction tables - then update them here
}

export function deleteSong_db(id) {
  connection.query('DELETE FROM songs WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    return results;
  });
}
