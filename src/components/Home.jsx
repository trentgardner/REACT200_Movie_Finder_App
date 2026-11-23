// Import components, hooks, and context
import { useState, useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import MoviePreview from './MoviePreview';

const omdb_endpoint = '/api/search';

const Home = () => {
  // Create a state for the search term.
  const [query, setQuery] = useState('');

  // Get state and dispatch from the context.
  const { state, dispatch } = useContext(MovieContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    dispatch({ type: 'FETCH_START' });

    try {
      const res = await fetch(`${omdb_endpoint}?query=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (data.Response === 'False') {
        dispatch({ type: 'FETCH_ERROR', payload: data.Error });
      } else {
        dispatch({ type: 'SEARCH_SUCCESS', payload: data.Search });
      }
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div>
      <section className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Find your next favorite film</h2>
        <p className="mt-2 text-slate-500">Search by title to see posters, ratings, and plot details.</p>
      </section>

      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-10 bg-white p-3 rounded-xl shadow-sm ring-1 ring-slate-200"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, e.g. The Shawshank Redemption"
          aria-label="Search movies"
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={state.loading}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 transition-colors"
        >
          Search
        </button>
      </form>

      {state.loading && (
        <div className="flex justify-center py-12" role="status">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {!state.loading && state.error && (
        <p className="max-w-2xl mx-auto rounded-lg bg-red-50 px-4 py-3 text-center text-red-700 ring-1 ring-red-200">
          {state.error}
        </p>
      )}

      {!state.loading && !state.error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {state.movies.map((m) => (
            <MoviePreview key={m.imdbID} movie={m} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
