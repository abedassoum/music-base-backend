import con from '../db/database.js';

export const readAllArtists = (req, res) => {
  con.query('SELECT * FROM Artists', (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  });
};

export const readArtistById = (req, res) => {
  const id = req.params.id;
  con.query('SELECT * FROM Artists WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  });
};

export const updateArtist = (req, res) => {
  const id = req.params.id;
  const { name, website, image, birthdate, activeSince, genres, labels } =
    req.body;
  con.query(
    'UPDATE Artists SET name = ?, website = ?, image = ?, birthdate = ?, activeSince = ?, genres = ?, labels = ? WHERE id = ?',
    [name, website, image, birthdate, activeSince, genres, labels, id],
    (err, results) => {
      if (err) throw err;
      res.status(200).json(results);
    }
  );
};

export const createArtist = (req, res) => {
  const { name, website, image, birthdate, activeSince, genres, labels } =
    req.body;
  con.query(
    'INSERT INTO Artists name = ?, website = ?, image = ?, birthdate = ?, activeSince = ?, genres = ?, labels = ? VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, website, image, birthdate, activeSince, genres, labels],
    (err, results) => {
      if (err) throw err;
      res.status(200).json(results);
    }
  );
};

export const deleteArtist = (req, res) => {
  const id = req.params.id;
  con.query('DELETE FROM Artists WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  });
};
