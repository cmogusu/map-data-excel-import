import React, { useState } from 'react'
import './style.css'

const Header = () => {
  const [isMenuOpen, toggleMenu] = useState(false)
  const memoizedToggleMenu = () => toggleMenu(!isMenuOpen)

  return (
    <header className="pos-f-t mb-2">
      <nav className="navbar navbar-dark bg-light border">
        <h1 className="h4">Coronavirus COVID-19 Cases in South Africa</h1>
        <button className="navbar-toggler bg-dark" type="button" onClick={memoizedToggleMenu} aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
      <div className={`collapse ${isMenuOpen ? 'show' : ''}`} id="navbarToggleExternalContent">
        <nav className="nav flex-column bg-dark p-4">
          <a className="nav-link active" href="#">Active</a>
          <a className="nav-link" href="#">Link</a>
          <a className="nav-link" href="#">Link</a>
          <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
