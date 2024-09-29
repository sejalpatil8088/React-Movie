import React from 'react';
import { Link } from 'react-router-dom';

const WatchList = ({ currentUser }) => {
  return (
    <div className="watchlist">
      <h2>Your Watchlist</h2>
      {/* Check if currentUser exists and watchlist is not empty */}
      {currentUser && currentUser.watchlist && currentUser.watchlist.length > 0 ? (
        <div className="movie-grid">
          {/* Map through the movies only if the watchlist exists */}
          {currentUser.watchlist.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <Link to={`/movie/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
                <h3 className="movie-title">{movie.Title}</h3>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Your watchlist is empty.</p>  // This will show if watchlist is empty or undefined
      )}
    </div>
  );
};

export default WatchList;






// import React from 'react';
// import { Link } from 'react-router-dom';

// const WatchList = ({ currentUser }) => {
//   return (
//     <div className="watchlist">
//       <h2>Your Watchlist</h2>
//       {/* Check if currentUser exists and watchlist is not empty */}
//       {currentUser && currentUser.watchlist && currentUser.watchlist.length === 0 ? (
//         <p>Your watchlist is empty.</p>
//       ) : (
//         <div className="movie-grid">
//           {/* Ensure currentUser and watchlist exist before mapping */}
//           {currentUser && currentUser.watchlist && currentUser.watchlist.map((movie) => (
//             <div key={movie.imdbID} className="movie-card">
//               <Link to={`/movie/${movie.imdbID}`}>
//                 <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
//                 <h3 className="movie-title">{movie.Title}</h3>
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WatchList;










// import React from 'react';
// import { Link } from 'react-router-dom';

// const WatchList = ({ currentUser }) => {
//   return (
//     <div className="watchlist">
//       <h2>Your Watchlist</h2>
//       {currentUser && currentUser.watchlist.length === 0 ? (
//         <p>Your watchlist is empty.</p>
//       ) : (
//         <div className="movie-grid">
//           {currentUser &&
//             currentUser.watchlist.map((movie) => (
//               <div key={movie.imdbID} className="movie-card">
//                 <Link to={`/movie/${movie.imdbID}`}>
//                   <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
//                   <h3 className="movie-title">{movie.Title}</h3>
//                 </Link>
//               </div>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WatchList;