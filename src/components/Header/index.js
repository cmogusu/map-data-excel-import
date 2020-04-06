import React, { useState } from 'react'
import './style.css'

const Header = () => {
  const [isMenuOpen, toggleMenu] = useState(false)
  const memoizedToggleMenu = () => toggleMenu(!isMenuOpen)

  return (
    <header class="pos-f-t mb-2">
      <nav class="navbar navbar-dark bg-light border">
        <h1 className="h4">Coronavirus COVID-19 Cases in South Africa</h1>
        <button class="navbar-toggler bg-dark" type="button" onClick={memoizedToggleMenu} aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
      <div class={`collapse ${isMenuOpen ? 'show' : ''}`} id="navbarToggleExternalContent">
        <nav class="nav flex-column bg-dark p-4">
          <a class="nav-link active" href="#">Active</a>
          <a class="nav-link" href="#">Link</a>
          <a class="nav-link" href="#">Link</a>
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
