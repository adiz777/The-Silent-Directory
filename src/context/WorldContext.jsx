import React, { createContext, useState, useContext } from 'react';

const WorldContext = createContext();

export const WorldProvider = ({ children }) => {
  const [gameState, setGameState] = useState({});

  return (
    <WorldContext.Provider value={{ gameState, setGameState }}>
      {children}
    </WorldContext.Provider>
  );
};

export const useWorld = () => {
  const context = useContext(WorldContext);
  if (!context) {
    throw new Error('useWorld must be used within a WorldProvider');
  }
  return context;
};
