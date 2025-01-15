"use client"
import React, { createContext, useState, useContext } from 'react';

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState([]);
  const [progress, setProgress] = useState({ currentTime: 0, duration: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [folderPath, setFolderPath] = useState([]);
  const [ shuffledSongs, setShuffledSongs ] = useState([]);
  const [folders, setFolders] = useState([]);

  return (
    <SongContext.Provider value={{ songs, setSongs, currentSong, setCurrentSong, progress, setProgress, isPlaying, setIsPlaying, folderPath, setFolderPath, setShuffledSongs, shuffledSongs, folders, setFolders }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSongContext = () => useContext(SongContext);
