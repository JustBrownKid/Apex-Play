import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AuthPage from './auth/AuthPage'
import MoviePage from './Pages/MoviePage'
import SeriesPage from './Pages/SeriesPage'
import MovieDetails from './movie/MovieDetails'
import Download from './common/Download'
import SeriesDetails from './series/SeriesDetails'
import Navbar from './Navbar/Navbar'
import MainLayout from './HomePage'
import Home from './Pages/HomePage'
import { ProtectedRoute, ProtectedAuthRoute } from './utils/ProtectedRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactPage from './Pages/ContactPage'
import AboutPage from './Pages/AboutPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/auth" element={
            <ProtectedAuthRoute>
              <AuthPage />
            </ProtectedAuthRoute>
          } />
          <Route path="/" element={<Navbar />} />
          <Route
            path="/download"
            element={
              <ProtectedRoute>
                <Download />
              </ProtectedRoute>
            }
          />
          <Route index element={<Home />} />

          <Route path="/movies" element={<MoviePage />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/series/:id" element={<SeriesDetails />} />



      </Routes>

    </BrowserRouter>
  )
}

export default App
