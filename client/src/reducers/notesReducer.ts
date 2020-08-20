import {
  FETCH_NOTES,
  REMOVE_NOTES,
  ADD_NOTE,
  REMOVE_NOTE,
  EDIT_NOTE,
  API_ERROR,
  NoteActionTypes,
} from '../types/actions'

import { NotesState } from '../types/reducers'
import { Note } from '../types/Note'

const initialNotesState: NotesState = {
  notesList: [],
  isFetched: false,
  addedNote: {},
  editedNote: {},
  isError: false,
}

const notesReducer = (
  state: NotesState = initialNotesState,
  action: NoteActionTypes
) => {
  switch (action.type) {
    case FETCH_NOTES:
      return {
        notesList: action.payload,
        isFetched: true,
      }

    case REMOVE_NOTES:
      return {
        ...state,
        notesList: [],
      }

    case ADD_NOTE:
      return {
        ...state,
        notesList: [...state.notesList, action.payload],
        addedNote: action.payload,
      }

    case EDIT_NOTE:
      const notesListEditedNote = state.notesList.map((note: Note) => {
        if (note._id === action.payload._id) {
          return {
            ...note,
            ...action.payload,
          }
        } else {
          return note
        }
      })

      return {
        ...state,
        notesList: notesListEditedNote,
        editedNote: action.payload,
      }

    case REMOVE_NOTE:
      const notesListRemovedNote = state.notesList.filter(({ _id }) => {
        return _id !== action.payload
      })
      return {
        ...state,
        notesList: notesListRemovedNote,
      }

    case API_ERROR:
      return {
        ...state,
        isError: action.payload,
      }

    default:
      return state
  }
}

export default notesReducer
