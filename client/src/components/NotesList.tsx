import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeNote, removeNotes } from '../actions/notes'
import NoteCard from './NoteCard'
import { RootState } from '../types/reducers'
import { Note } from '../types/Note'

const NotesList: FC = () => {
  const notesList = useSelector((state: RootState) => state.notes.notesList)
  const dispatch = useDispatch()

  const notesListReversed = [...notesList].reverse()

  return (
    <div className="notes">
      {notesList.length !== 0 ? (
        <>
          <div className="notes__top">
            <button
              onClick={() => dispatch(removeNotes())}
              className="btn btn--red"
            >
              Clear notes
            </button>
          </div>
          <div className="notes__list">
            {notesListReversed.map((note: Note, i: number) => (
              <NoteCard
                key={note._id}
                id={note._id}
                title={note.title}
                content={note.content}
                onRemoveClick={() => dispatch(removeNote(note._id))}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="notes__empty card">
          <span>
            <h1>Empty</h1>
            <p>You don't have any notes</p>
          </span>
          <Link to="/add" className="btn btn--accent">
            Add note
          </Link>
        </div>
      )}
    </div>
  )
}

export default NotesList
