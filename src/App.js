import "./App.css";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import MovieList from './Components/MovieList';
import MovieDetails from './Components/MovieDetails';
import Watchlist from './Components/WatchList';
import Login from './Components/Login';
import Register from './Components/Register';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
    if (storedUsers.length > 0) {
      setCurrentUser(storedUsers[0]); 
    }
  }, []);

  const handleLogin = (email) => {
    const user = users.find((u) => u.email === email);
    if (user) {
      setCurrentUser(user);
    } else {
      alert('Invalid email address');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleRegister = (email) => {
    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      alert('User already exists');
      return;
    }
    
    const user = { email, watchlist: [] };
    setUsers([...users, user]);
    setCurrentUser(user);
    localStorage.setItem('users', JSON.stringify([...users, user]));
  };

  const addToWatchlist = (movie) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, watchlist: [...currentUser.watchlist, movie] };
      const updatedUsers = users.map((u) => (u.email === currentUser.email ? updatedUser : u));
      setUsers(updatedUsers);
      setCurrentUser(updatedUser); // Update current user state
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      alert(`${movie.Title} added to your watchlist!`);
    } else {
      alert('Please log in to add movies to your watchlist.');
    }
  };

  const removeFromWatchlist = (movieId) => {
    if (currentUser) {
      const updatedWatchlist = currentUser.watchlist.filter(movie => movie.imdbID !== movieId);
      const updatedUser = { ...currentUser, watchlist: updatedWatchlist };
      const updatedUsers = users.map((u) => (u.email === currentUser.email ? updatedUser : u));
      
      setUsers(updatedUsers);
      setCurrentUser(updatedUser); // Update current user state
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      alert('Movie removed from your watchlist!');
    }
  };

  return (
    <Router>
      <div className="app">
        <Header currentUser={currentUser} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<MovieList currentUser={currentUser} addToWatchlist={addToWatchlist} />} />
          <Route path="/movie/:id" element={<MovieDetails currentUser={currentUser} addToWatchlist={addToWatchlist} />} />
          <Route path="/watchlist" element={<Watchlist currentUser={currentUser} removeFromWatchlist={removeFromWatchlist} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;





// import "./App.css";
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './Components/Header';
// import MovieList from './Components/MovieList';
// import MovieDetails from './Components/MovieDetails';
// import Watchlist from './Components/WatchList';
// import Login from './Components/Login';
// import Register from './Components/Register';


// const App = () => {
//   const [users, setUsers] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
//     setUsers(storedUsers);
//     if (storedUsers.length > 0) {
//       setCurrentUser(storedUsers[0]); // Automatically log in first user for demo purposes
//     }
//   }, []);

//   const handleLogin = (email) => {
//     const user = users.find((u) => u.email === email);
//     if (user) {
//       setCurrentUser(user);
//     } else {
//       alert('Invalid email address');
//     }
//   };

//   const handleLogout = () => {
//     setCurrentUser(null);
//   };

//   const handleRegister = (email) => {
//     const user = { email, watchlist: [] };
//     setUsers([...users, user]);
//     setCurrentUser(user);
//     localStorage.setItem('users', JSON.stringify([...users, user]));
//   };

//   return (
//     <Router>
//       <div className="app">
//         <Header currentUser={currentUser} onLogout={handleLogout} />
//         <Routes>
//           <Route path="/" >
//             <MovieList currentUser={currentUser} />
//           </Route>
//           <Route path="/movie/:id">
//             <MovieDetails currentUser={currentUser} />
//           </Route>
//           <Route path="/watchlist">
//             <Watchlist currentUser={currentUser} />
//           </Route>
//           <Route path="/login">
//             <Login onLogin={handleLogin} />
//           </Route>
//           <Route path="/register">
//             <Register onRegister={handleRegister} />
//           </Route>
//         </Routes>
//       </div>
//     </Router>
//   );
// }; 

// export default App;
