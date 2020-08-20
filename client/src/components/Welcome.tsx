import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../types/reducers'
import hero from '../images/hero.png'

const Welcome: FC = () => {
  const notesList = useSelector((state: RootState) => state.notes.notesList)

  return (
    <>
      <div className="hero">
        <div className="hero__left">
          <h1>Note taking app</h1>
          <p>You can create and edit notes with notemorphism</p>
          <Link to="/add" className="btn btn--accent">
            {notesList.length !== 0
              ? 'Create another one note'
              : 'Create your first note'}
          </Link>
        </div>
        <div className="hero__right">
          <img src={hero} alt="notemorphism hero" />
        </div>
      </div>
    </>
  )
}

export default Welcome
