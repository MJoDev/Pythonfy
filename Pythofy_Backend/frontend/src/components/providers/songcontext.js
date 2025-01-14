"use client"
import React, { createContext, useState, useContext } from 'react';

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState([]);
  const [progress, setProgress] = useState({ currentTime: 0, duration: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [folderPath, setFolderPath] = useState([]);

  return (
    <SongContext.Provider value={{ songs, setSongs, currentSong, setCurrentSong, progress, setProgress, isPlaying, setIsPlaying, folderPath, setFolderPath }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSongContext = () => useContext(SongContext);
