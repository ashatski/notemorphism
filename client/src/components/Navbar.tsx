import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const Navbar: FC = () => {
  return (
    <header>
      <nav>
        <div className="container">
          <div className="navbar">
            <Link to="/" className="navbar__logo btn">
              notemorphism
            </Link>
            <ul className="navbar__menu">
              <li>
                <Link to="/notes" className=" btn">
                  Notes
                </Link>
              </li>
              <li>
                <Link to="/add" className="btn btn--accent">
                  Add note
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
