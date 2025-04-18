import "../css/Movie.css";
import { useMovieContext } from "../contexts/MovieContext";

function Movie({ info }) {
  const {isFav , addFav, removeFav } = useMovieContext();
  const favorite = isFav(info.id);

  function onFavoriteClick() {
    if (favorite) {
      removeFav(info.id);
    } else {
      addFav(info);
    }
  }

  return (
    <div className="movie">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${info.poster_path}`}
          alt={info.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{info.title}</h3>
        <p>{info.release_date}</p>
      </div>
    </div>
  );
}

export default Movie;
