import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-slate-900 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-center sm:justify-start">
        <Link to="/" className="flex items-center gap-2 group">
          <svg
            className="w-7 h-7 text-amber-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M7 4v16M17 4v16M2 9h5M2 15h5M17 9h5M17 15h5" />
          </svg>
          <h1 className="text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
            Movie Finder
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
