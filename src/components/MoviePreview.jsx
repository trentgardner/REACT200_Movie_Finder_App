// Import the useNavigate hook from react-router-dom.
import { useNavigate } from 'react-router-dom';
import Poster from './Poster';

const MoviePreview = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition">
      <Poster src={movie.Poster} title={movie.Title} className="aspect-[2/3] w-full" />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-slate-900 leading-snug">{movie.Title}</h3>
        <div className="mt-2 flex gap-2">
          <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-700">{movie.Year}</span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium capitalize text-slate-600">{movie.Type}</span>
        </div>
        <button
          onClick={() => navigate(`/movie/${movie.imdbID}`)}
          className="mt-auto pt-4 text-left text-sm font-semibold text-indigo-600 hover:text-indigo-800"
        >
          More Information →
        </button>
      </div>
    </div>
  );
};

export default MoviePreview;
