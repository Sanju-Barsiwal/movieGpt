import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import BackgroundEffects from './BackgroundEffects';

const GptSearch: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <BackgroundEffects />
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
