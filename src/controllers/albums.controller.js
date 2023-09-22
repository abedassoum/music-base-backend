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
    console.error(err);
    res.status(500).json({ error: 'An error occure while fetching album' });
  }
}

export async function updateAlbum(req, res) {
  const id = req.params.id;
  const { 
    title, 
    releaseDate, 
    artists, 
    labels, 
    genres, 
    songs, 
  } = req.body;

  try {
    const updatedAlbum = await updateAlbum_db(
      id,
      title,
      releaseDate,
      artists,
      labels,
      genres,
      songs
    );
    res.status(200).json(updatedAlbum)
  } catch (err) {
    console.error(err)
    res.status(500).json({error: 'An error occured while updating album'})
  }
}

export async function createAlbum(req, res) {
  const { title, releaseDate, genres, artists, labels, songs } = req.body;
  try {
    const newAlbum = await createAlbum_db(
      title,
      releaseDate,
      genres,
      artists, 
      labels,
      songs
    );
    console.log(newAlbum);
    res.status(200).json(newAlbum)
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Failed to create new album'})
  }
}

export function deleteAlbum(req, res) {
  const id = req.params.id;
  try {
    deleteAlbum_db(id);
    res.status(200).json({message: 'Album deleted succesfully'})
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'An error occured while deleting album'})
  }
}
