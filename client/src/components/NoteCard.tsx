import React, { FC } from 'react'
import { Link } from 'react-router-dom'

type NoteCardProps = {
  id: string,
  title: string,
  content: string,
  onRemoveClick: () => void,
}

const NoteCard: FC<NoteCardProps> = ({ id, title, content, onRemoveClick }) => {
  return (
    <div className="note">
      <Link to={`/notes/${id}`}>
        <h1 className="note__title">{title}</h1>
        <p className="note__content">{content}</p>
      </Link>
      <button onClick={onRemoveClick} className="note__delete">
        <span className="btn btn--red">&#10005;</span>
      </button>
    </div>
  )
}

export default NoteCard
