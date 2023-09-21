import {
  createAlbum_db,
  deleteAlbum_db,
  readAlbumById_db,
  readAllAlbums_db,
  updateAlbum_db,
} from '../models/albums.models.js';

export async function readAllAlbums(req, res) {
  try {
    const albums = await readAllAlbums_db();
    res.status(200).json(albums);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occured while fetching songs' });
  }
}

export async function readAlbumById(req, res) {
  const id = req.params.id;
  try {
    const albums = await readAlbumById_db(id);
    res.status(200).json(albums);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occure while fetching album' });
  }
}

export async function updateAlbum(req, res) {
  const id = req.params.id;
  const { title, releaseDate, genre } = req.body;

  try {
    const updatedAlbum = await updateAlbum_db(
      title, releaseDate, genre, id
    );
    res.status(200).json(updatedAlbum)
  } catch (err) {
    console.log(err)
    res.status(500).json({error: 'An error occured while updating album'})
  }
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
