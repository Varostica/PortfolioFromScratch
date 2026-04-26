import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ArtGalleryPage from './pages/ArtGalleryPage'
import CredentialsPage from './pages/CredentialsPage'
import ResumePage from './pages/ResumePage'
import ContactPage from './pages/ContactPage'

export default function App() {
  const [load, setLoad] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoad(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Router>
      <Preloader load={load} />
      <div id={load ? 'no-scroll' : 'scroll'}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/artgallery" element={<ArtGalleryPage />} />
          <Route path="/credentials" element={<CredentialsPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}
