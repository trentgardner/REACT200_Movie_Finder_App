import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import Header from './components/Header';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';

const App = () => {
  return (
    <MovieProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 text-slate-800">
          <Header />
          <main className="max-w-6xl mx-auto px-4 py-8">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/movie/:id' element={<MovieDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    </MovieProvider>
  );
};

export default App;
