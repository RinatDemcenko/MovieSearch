// src/components/Movie.jsx
import { useNavigate } from 'react-router-dom'; // Добавляем хук для навигации
import '../css/Movie.css';
import { useMovieContext } from '../contexts/MovieContext';

function Movie({ info }) {
  const { isFav, addFav, removeFav } = useMovieContext();
  const favorite = isFav(info.id);
  const navigate = useNavigate(); 

  function onFavoriteClick() {
    if (favorite) {
      removeFav(info.id);
    } else {
      addFav(info);
    }
  }

  function viewInfo() {
    navigate(`/singleMovie/${info.id}`); 
  }

  return (
    <div className="movie">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${info.poster_path}`}
          alt={""}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? 'active' : ''}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
          <div className="user-rating">
            <p className="">{Math.round(info.vote_average * 10) / 10}★</p>
          </div>  
          <button 
            className="display-info"
            onClick={viewInfo}
          >
            About this movie
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{info.title}</h3>
        <p>Released: {info.release_date}</p>
      </div>
    </div>
  );
}

export default Movie;