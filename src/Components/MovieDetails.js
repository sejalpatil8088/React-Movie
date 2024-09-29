
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = ({ currentUser }) => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=7c2b319f`);
      const data = await response.json();
      // console.log(data);
      

      
      if (data.Response === "True") {
        setMovie(data);
      } else {
        console.error(data.Error); 
      }
    };

    fetchMovieDetails();
  }, [id]);

  const addToWatchlist = () => {
    console.log("addToWatchlist" , currentUser);
    
    
    
    if (currentUser) {
     console.log("movie" , movie);
     
    
      
      const updatedUser = {
        ...currentUser,
        watchlist: [...currentUser.watchlist, movie],
      };
      const updatedUsers = users.map((u) => (u.email === currentUser.email ? updatedUser : u));
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      alert(`${movie.Title} added to your watchlist!`);
    } else {
      alert('Please log in to add movies to your watchlist.');
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <div className="movie-poster">
        <img src={movie.Poster} alt={movie.Title} />
      </div>
      <div className="movie-info">
        <h2 >{movie.Title}</h2>
        <p>Year: {movie.Year}</p>
        <p>Director: {movie.Director}</p>
        <p>Actors: {movie.Actors}</p>
        <p>Plot: {movie.Plot}</p>
        <button className="add-to-watchlist" onClick={(movie) => addToWatchlist(movie)}>



          Add to Watchlist
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;



