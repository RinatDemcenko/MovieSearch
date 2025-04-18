import Movie from '../components/Movie.jsx'
import {useState, useEffect} from 'react'
import { fetchTrendingMovies, searchMovies } from '../Services/api.js';
import "../css/Home.css"

function Home(){

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try{
        const popularMovies = await fetchTrendingMovies();
        setMovies(popularMovies);
      }
      catch(error){
        setError("Error fetching movies:", error);
      }
      finally{
        setLoading(false);
      }
    }
    fetchMovies();
  }, [])
 

  const searchForMovies = async (e) => {
    e.preventDefault();
    if(!query.trim()) return;

    setLoading(true);
    if(loading) return;

    try{
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
      setError(null);
    }
    catch(error){
      setError("Error searching movies:", error);
      console.error("Error"+error);
    }
    finally{
      setLoading(false);
    }
  }

  return(
    <div className="home">
      <form onSubmit={searchForMovies} action="" className="search-form">
        <input 
        type="text" 
        className="search-input" 
        placeholder="Search for movies"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading? (<div className="loading"></div>):
      <div className="movies-grid">
        {movies.map((movie)=>(
          <Movie info={movie} key={movie.id}/>
        ))}
      </div>
      }
    </div>
  )
}

export default Home