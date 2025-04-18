import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import Movie from "../components/Movie";

function Favorites() {
  const { favs } = useMovieContext();
  if (favs.length > 0) {
    return (
      <div className="favorites">
        <h2>Favorite Movies</h2>

        <div className="movies-grid">
          {favs.map((movie) => (
            <Movie info={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
    </div>
  );
}

export default Favorites;
