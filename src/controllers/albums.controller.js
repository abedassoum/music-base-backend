import {
  createAlbum_db,
  deleteAlbum_db,
  readAlbumById_db,
  readAllAlbums_db,
  updateAlbum_db,
} from '../models/albums.models.js';

export function readAllAlbums(req, res) {
  const albums = readAllAlbums_db();
  if (err) throw err;
  res.status(200).json(albums);
}

export function readAlbumById(req, res) {
  const id = req.params.id;
  const album = readAlbumById_db(id);
  if (err) throw err;
  res.status(200).json(album);
}

export function updateAlbum(req, res) {
  const id = req.params.id;
  const { name, year, image, artist, genres, labels } = req.body;

  const album = updateAlbum_db(id, name, year, image, artist, genres, labels);
  if (err) throw err;
  res.status(200).json(album);
}

export function createAlbum(req, res) {
  const { name, year, image, artist, genres, labels } = req.body;

  const album = createAlbum_db(name, year, image, artist, genres, labels);
  if (err) throw err;
  res.status(200).json(album);
}

export function deleteAlbum(req, res) {
  const id = req.params.id;
  const album = deleteAlbum_db(id);
  if (err) throw err;
  res.status(200).json(album);
}
