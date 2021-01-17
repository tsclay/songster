import React from 'react';
import './App.css';
import SearchResults from '../Content/SearchResults';
import SearchBar from '../Header/SearchBar';
import Lyrics from '../Content/Lyrics';

function App(): JSX.Element {
  return (
    <div className="App">
      <nav className="Header">
        <h1>Songster</h1>
        <SearchBar />
      </nav>
      <div className="Content">
        <SearchResults />
        <Lyrics />
      </div>
    </div>
  );
}

export default App;
