import {
  readAllSongs_db,
  readSongById_db,
  updateSong_db,
  createSong_db,
  deleteSong_db,
} from '../models/songs.models.js';
  

export async function readAllSongs(req, res) {
  const songs = await readAllSongs_db();
  if (!songs) {
    res.status(500).json({ error: 'Failed to retrieve songs' });
  } else {
    res.status(200).json(songs);
  }
}

export async function readSongById(req, res) {
  const id = req.params.id;
  const song = await readSongById_db(id);
  if (!song) {
    res.status(404).json({ error: 'Song not found' });
  } else {
    res.status(200).json(song);
  }
}

export async function updateSong(req, res) {
  const id = req.params.id;
  const { name, year, image, artist, genres, labels } = req.body;

  const updatedSong = await updateSong_db(id, name, year, image, artist, genres, labels);
  if (!updatedSong) {
    res.status(500).json({ error: 'Failed to update song' });
  } else {
    res.status(200).json(updatedSong);
  }
}

export async function createSong(req, res) {
  const { name, year, image, artist, genres, labels } = req.body;

  const newSong = await createSong_db(name, year, image, artist, genres, labels);
  if (!newSong) {
    res.status(500).json({ error: 'Failed to create song' });
  } else {
    res.status(200).json(newSong);
  }
}

export async function deleteSong(req, res) {
  const id = req.params.id;
  const deletedSong = await deleteSong_db(id);
  if (!deletedSong) {
    res.status(500).json({ error: 'Failed to delete song' });
  } else {
    res.status(200).json(deletedSong);
  }
}


// export function readAllSongs(req, res) {
//   const songs = readAllSongs_db();
//   if (err) throw err;
//   res.status(200).json(songs);
// }

// export function readSongById(req, res) {
//   const id = req.params.id;
//   const song = readSongById_db(id);
//   if (err) throw err;
//   res.status(200).json(song);
// }

// export function updateSong(req, res) {
//   const id = req.params.id;
//   const { name, year, image, artist, genres, labels } = req.body;

//   const song = updateSong_db(id, name, year, image, artist, genres, labels);
//   if (err) throw err;
//   res.status(200).json(song);
// }

// export function createSong(req, res) {
//   const { name, year, image, artist, genres, labels } = req.body;

//   const song = createSong_db(name, year, image, artist, genres, labels);
//   if (err) throw err;
//   res.status(200).json(song);
// }

// export function deleteSong(req, res) {
//   const id = req.params.id;
//   const song = deleteSong_db(id);
//   if (err) throw err;
//   res.status(200).json(song);
// }
