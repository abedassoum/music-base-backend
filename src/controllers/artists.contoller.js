import {
  createArtist_db,
  deleteArtist_db,
  readAllArtists_db,
  readArtistById_db,
  updateArtist_db,
} from '../models/artists.models.js';

export function readAllArtists(req, res) {
  const artists = readAllArtists_db();
  if (err) throw err;
  res.status(200).json(artists);
}

export function readArtistById(req, res) {
  const id = req.params.id;
  const artist = readArtistById_db(id);
  if (err) throw err;
  res.status(200).json(artist);
}

export function updateArtist(req, res) {
  const id = req.params.id;
  const { name, website, image, birthdate, activeSince, genres, labels } =
    req.body;

  const artist = updateArtist_db(
    id,
    name,
    website,
    image,
    birthdate,
    activeSince,
    genres,
    labels
  );
  if (err) throw err;
  res.status(200).json(artist);
}

export function createArtist(req, res) {
  const { name, website, image, birthdate, activeSince, genres, labels } =
    req.body;

  const artist = createArtist_db(
    name,
    website,
    image,
    birthdate,
    activeSince,
    genres,
    labels
  );
  if (err) throw err;
  res.status(200).json(artist);
}

export function deleteArtist(req, res) {
  const id = req.params.id;
  const artist = deleteArtist_db(id);
  if (err) throw err;
  res.status(200).json(artist);
}
