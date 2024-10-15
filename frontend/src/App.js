import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState('regex'); // 'regex' or 'semantic'

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const url =
        searchType === 'regex'
          ? `/api/search?query=${query}`
          : `/api/semantic?query=${query}`;
      const response = await axios.get(url);
      setResults(response.data.data.movies);
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Movie Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />
      <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
        <option value="regex">Regex Search</option>
        <option value="semantic">Semantic Search</option>
      </select>
      <button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>

      <div className="results">
        {results.map((movie) => (
          <div key={movie._id} className="movie">
            <h3>{movie.title}</h3>
            {movie.poster && <img src={movie.poster} alt={movie.title} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
