// Reusable poster image with a fallback when OMDb has no poster ("N/A").
const Poster = ({ src, title, className = '' }) => {
  if (!src || src === 'N/A') {
    return (
      <div className={`flex items-center justify-center bg-slate-200 text-slate-500 text-sm ${className}`}>
        No poster available
      </div>
    );
  }

  return <img src={src} alt={`${title} poster`} className={`object-cover ${className}`} />;
};

export default Poster;
