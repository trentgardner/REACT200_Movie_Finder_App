// Import the necessary hooks and context
import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import Poster from './Poster';

// Create the enpoint variable
// The call request should be to '/api/movie/{movie-id}'
const omdb_endpoint = '/api/movie';

const Badge = ({ children, color }) => (
  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${color}`}>{children}</span>
);

const MovieDetails = () => {
  // get the ':id' from the route using the useParams hook
  const { id } = useParams();
  const { state, dispatch } = useContext(MovieContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const res = await fetch(`${omdb_endpoint}/${id}`);
        const data = await res.json();
        if (data.Response === 'False') {
          dispatch({ type: 'FETCH_ERROR', payload: data.Error });
        } else {
          dispatch({ type: 'MOVIE_SUCCESS', payload: data });
        }
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: 'Something went wrong. Please try again.' });
      }
    };
    fetchMovie();
  }, [id, dispatch]);

  const { movie, loading, error } = state;

  const backButton = (
    <button
      onClick={() => navigate(-1)}
      className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
    >
      ← Go Back
    </button>
  );

  // Handle loading (also covers the old movie still in state while the new one loads)
  if (loading || (movie && movie.imdbID !== id && !error)) {
    return (
      <div className="flex justify-center py-12" role="status">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  // Handle errors
  if (error) {
    return (
      <div>
        {backButton}
        <p className="rounded-lg bg-red-50 px-4 py-3 text-red-700 ring-1 ring-red-200">{error}</p>
      </div>
    );
  }

  // Handle movie being undefined
  if (!movie) return null;

  const show = (value) => value && value !== 'N/A';

  return (
    <div className="max-w-4xl mx-auto">
      {backButton}

      <div className="flex flex-col md:flex-row gap-8">
        <Poster
          src={movie.Poster}
          title={movie.Title}
          className="w-full max-w-xs mx-auto md:mx-0 aspect-[2/3] rounded-xl shadow-lg shrink-0"
        />

        <div className="flex-1 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 self-start">
          <div className="bg-indigo-50 px-5 py-3 border-b border-indigo-100">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-700">Movie Details</h2>
          </div>

          <div className="p-5 space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">{movie.Title}</h3>

            <div className="flex flex-wrap gap-2">
              {show(movie.Year) && <Badge color="bg-emerald-100 text-emerald-700">Released {movie.Year}</Badge>}
              {show(movie.Runtime) && <Badge color="bg-sky-100 text-sky-700">{movie.Runtime}</Badge>}
              {show(movie.Genre) && <Badge color="bg-violet-100 text-violet-700">{movie.Genre}</Badge>}
              {show(movie.Rated) && <Badge color="bg-slate-100 text-slate-700">{movie.Rated}</Badge>}
            </div>

            {show(movie.Plot) && <p className="text-slate-700 leading-relaxed">{movie.Plot}</p>}

            {show(movie.Awards) && (
              <p className="text-slate-600 italic">{movie.Awards}</p>
            )}

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {show(movie.Director) && (
                <div><dt className="inline font-semibold text-slate-900">Director: </dt><dd className="inline">{movie.Director}</dd></div>
              )}
              {show(movie.Actors) && (
                <div><dt className="inline font-semibold text-slate-900">Cast: </dt><dd className="inline">{movie.Actors}</dd></div>
              )}
              {show(movie.Metascore) && (
                <div><dt className="inline font-semibold text-slate-900">Metascore: </dt><dd className="inline">{movie.Metascore}/100</dd></div>
              )}
              {show(movie.imdbRating) && (
                <div>
                  <dt className="inline font-semibold text-slate-900">IMDb: </dt>
                  <dd className="inline"><span className="text-amber-500">★</span> {movie.imdbRating}/10</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
