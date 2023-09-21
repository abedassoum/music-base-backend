import {
  readAllSongs_db,
  readSongById_db,
  updateSong_db,
  createSong_db,
  deleteSong_db,
} from '../models/songs.models.js';

export async function readAllSongs(req, res) {
  try {
    const songs = await readAllSongs_db();
    res.status(200).json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occured while fetching songs' });
  }
}

export async function readSongById(req, res) {
  const id = req.params.id;
  try {
    const song = await readSongById_db(id);
    res.status(200).json(song);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occure while fetching song' });
  }
}

export async function updateSong(req, res) {
  const id = req.params.id;
  const { title, duration, releaseDate, bonus_track} =
    req.body;

  try {
    const updatedSong = await updateSong_db(
      title,
      duration,
      releaseDate,
      bonus_track,   
      id
    );
    res.status(200).json(updatedSong);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occured while updating song' });
  }
}

export async function createSong(req, res) {
  const { title, duration, releaseDate, bonus_track, artist_names, album_names } =
    req.body;
  try {
    const newSong = await createSong_db(
      title,
      duration,
      releaseDate,
      bonus_track,
      artist_names,
      album_names
    );
    
    console.log(newSong);
    res.status(200).json(newSong);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to create song' });
  }
}

export async function deleteSong(req, res) {
  const id = req.params.id;
  try {
    deleteSong_db(id);
    res.status(200).json({message: 'Song deleted successfully'})
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occured while deleting song'});
  }
}