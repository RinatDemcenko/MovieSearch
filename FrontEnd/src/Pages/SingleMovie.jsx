import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import { fetchMovieById } from "../Services/api";
import "../css/Movie.css";
import "../css/Favorites.css";
import "../css/SingleMovie.css";

function SingleMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFav, addFav, removeFav } = useMovieContext();
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movie = await fetchMovieById(id);
        setMovie(movie);
      } catch (error) {
        setError("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleFavoriteClick = () => {
    if (!movie) return;
    try {
      if (isFav(movie.id)) {
        removeFav(movie.id);
      } else {
        addFav(movie);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  if (error) {
    return (
      <div className="favorites-empty">
        <h2>Movie not found</h2>
        <p>Cannot find movie with id: {id}</p>
      </div>
    );
  }
  if (loading) return <h2>Loading...</h2>;

  const backgroundImage = movie.backdrop_path
    ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
    : "none";

  return (
    <div
      className="film-details"
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="film-overlay">
        <div className="film-content">
          <div className="film-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <button
              className={`favorite-btn ${isFav(movie.id) ? "active" : ""}`}
              onClick={handleFavoriteClick}
            >
              ♥
            </button>
          </div>
          <div className="film-info">
            <h1>{movie.title}</h1>
            <p>
              <strong>Overview:</strong>{" "}
              {movie.overview || "No overview available"}
            </p>
            <p>
              <strong>Release Date:</strong> {movie.release_date || "Unknown"}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average?.toFixed(1) || "N/A"}
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres?.map((g) => g.name).join(", ") || "Unknown"}
            </p>
            <p>
              <strong>Runtime:</strong>{" "}
              {movie.runtime ? `${movie.runtime} min` : "Unknown"}
            </p>
            <p>
              <strong>Budget:</strong>{" "}
              {movie.budget ? `$${movie.budget.toLocaleString()}` : "Unknown"}
            </p>
            <p>
              <strong>Revenue:</strong>{" "}
              {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMovie;
