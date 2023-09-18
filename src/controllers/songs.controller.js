import {
  readAllSongs_db,
  readSongById_db,
  updateSong_db,
  createSong_db,
  deleteSong_db,
} from '../models/songs.models.js';

export function readAllSongs(req, res) {
  const songs = readAllSongs_db();
  if (err) throw err;
  res.status(200).json(songs);
}

export function readSongById(req, res) {
  const id = req.params.id;
  const song = readSongById_db(id);
  if (err) throw err;
  res.status(200).json(song);
}

export function updateSong(req, res) {
  const id = req.params.id;
  const { name, year, image, artist, genres, labels } = req.body;

  const song = updateSong_db(id, name, year, image, artist, genres, labels);
  if (err) throw err;
  res.status(200).json(song);
}

export function createSong(req, res) {
  const { name, year, image, artist, genres, labels } = req.body;

  const song = createSong_db(name, year, image, artist, genres, labels);
  if (err) throw err;
  res.status(200).json(song);
}

export function deleteSong(req, res) {
  const id = req.params.id;
  const song = deleteSong_db(id);
  if (err) throw err;
  res.status(200).json(song);
}
