import {
  createArtist_db,
  deleteArtist_db,
  readAllArtists_db,
  readArtistById_db,
  updateArtist_db,
} from '../models/artists.models.js';

export async function readAllArtists(req, res) {
  try {
    const artists = await readAllArtists_db();
    res.status(200).json(artists);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching artists.' });
  }
}

export async function readArtistById(req, res) {
  const id = req.params.id;
  try {
    const artist = await readArtistById_db(id);
    res.status(200).json(artist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching artist.' });
  }
}

export async function updateArtist(req, res) {
  const id = req.params.id;
  const {
    name,
    birthdate,
    activeSince,
    website,
    image,
    shortDescription,
    favorite,
    genres,
    labels,
    albums,
    songs,
  } = req.body;

  try {
    const artist = await updateArtist_db(
      id,
      name,
      birthdate,
      activeSince,
      website,
      image,
      shortDescription,
      favorite,
      genres,
      labels,
      albums,
      songs
    );
    res.status(200).json(artist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating artist.' });
  }
}

export async function createArtist(req, res) {
  const {
    name,
    birthdate,
    activeSince,
    website,
    image,
    shortDescription,
    favorite,
    genres,
    labels,
    albums,
    songs,
  } = req.body;

  try {
    const artist = await createArtist_db(
      name,
      birthdate,
      activeSince,
      website,
      image,
      shortDescription,
      favorite,
      genres,
      labels,
      albums,
      songs
    );
    res.status(200).json(artist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while creating artist.' });
  }
}

export function deleteArtist(req, res) {
  const id = req.params.id;
  try {
    deleteArtist_db(id);
    res.status(200).json({ message: 'Artist deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting artist.' });
  }
}
