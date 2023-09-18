import con from '../db/database.js';

export function readAllSongs_db() {
  con.query('SELECT * FROM Songs', (err, results) => {
    if (err) throw err;
    return results;
  });
}

export function readSongById_db(id) {
  con.query('SELECT * FROM Songs WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    return results;
  });
}

export function updateSong_db(id, name, artist, album, genre) {
  con.query(
    'UPDATE Songs SET name = ?, artist = ?, album = ?, genre = ?, WHERE id = ?',
    [name, artist, album, genre, id],
    (err, results) => {
      if (err) throw err;
      return results;
    }
  );
}

export function createSong_db(name, artist, album, genre) {
  con.query(
    'INSERT INTO Songs (name, artist, album, genre) VALUES (?, ?, ?, ?, ?)',
    [name, artist, album, genre],
    (err, results) => {
      if (err) throw err;
      return results;
    }
  );

  // make genre and label junction tables - then update them here
}

export function deleteSong_db(id) {
  con.query('DELETE FROM Songs WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    return results;
  });
}
