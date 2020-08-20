import {
  FETCH_NOTES,
  REMOVE_NOTES,
  ADD_NOTE,
  EDIT_NOTE,
  REMOVE_NOTE,
  API_ERROR,
  NoteActionTypes,
} from '../types/actions'
import { Dispatch } from 'redux'

export const fetchNotes = () => async (dispatch: Dispatch<NoteActionTypes>) => {
  try {
    const response = await fetch('/api/notes', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })

    const responseData = await response.json()

    dispatch({
      type: FETCH_NOTES,
      payload: responseData.notes,
    })
  } catch (error) {
    dispatch({
      type: API_ERROR,
      payload: true,
    })
    console.warn('Houston we have a problem fetching notes  =>', error)
  }
}

export const removeNotes = () => async (
  dispatch: Dispatch<NoteActionTypes>
) => {
  try {
    const fetchData = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }

    await fetch('/api/notes', fetchData)

    dispatch({
      type: REMOVE_NOTES,
    })
  } catch (error) {
    dispatch({
      type: API_ERROR,
      payload: true,
    })
    console.warn('Houston we have a problem removing all notes =>', error)
  }
}

export const addNote = (data: object) => async (
  dispatch: Dispatch<NoteActionTypes>
) => {
  try {
    const fetchData = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      method: 'POST',
    }

    const response = await fetch('/api/notes', fetchData)

    const responseData = await response.json()

    const newNote = responseData.createdNote

    dispatch({
      type: ADD_NOTE,
      payload: newNote,
    })
  } catch (error) {
    dispatch({
      type: API_ERROR,
      payload: true,
    })
    console.warn('Houston we have a problem adding note =>', error)
  }
}

export const editNote = (id: string, data: object) => async (
  dispatch: Dispatch<NoteActionTypes>
) => {
  try {
    let patchArr = []

    for (const [key, value] of Object.entries(data)) {
      patchArr.push({
        propName: key,
        value: value,
      })
    }

    const fetchData = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patchArr),
      method: 'PATCH',
    }

    const response = await fetch(`/api/notes/${id}`, fetchData)

    const responseData = await response.json()

    const updatedNote = responseData.updatedNote

    dispatch({
      type: EDIT_NOTE,
      payload: updatedNote,
    })
  } catch (error) {
    dispatch({
      type: API_ERROR,
      payload: true,
    })
    console.warn('Houston we have a problem patching note =>', error)
  }
}

export const removeNote = (id: string) => async (
  dispatch: Dispatch<NoteActionTypes>
) => {
  try {
    const fetchData = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }

    await fetch(`/api/notes/${id}`, fetchData)

    dispatch({
      type: REMOVE_NOTE,
      payload: id,
    })
  } catch (error) {
    dispatch({
      type: API_ERROR,
      payload: true,
    })
    console.warn('Houston we have a problem removing note =>', error)
  }
}
