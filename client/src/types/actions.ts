import { Note } from './Note'

export const FETCH_NOTES = 'FETCH_NOTES'
export const REMOVE_NOTES = 'REMOVE_NOTES'
export const ADD_NOTE = 'ADD_NOTE'
export const EDIT_NOTE = 'EDIT_NOTE'
export const REMOVE_NOTE = 'REMOVE_NOTE'
export const API_ERROR = 'API_ERROR'

export interface FetchNotesAction {
  type: typeof FETCH_NOTES;
  payload: Note[];
}

export interface RemoveNotesAction {
  type: typeof REMOVE_NOTES;
}

export interface AddNoteAction {
  type: typeof ADD_NOTE;
  payload: Note;
}

export interface EditNoteAction {
  type: typeof EDIT_NOTE;
  payload: Note;
}

export interface RemoveNoteAction {
  type: typeof REMOVE_NOTE;
  payload: string;
}

export interface ApiError {
  type: typeof API_ERROR;
  payload: boolean;
}

export type NoteActionTypes =
  | FetchNotesAction
  | RemoveNotesAction
  | AddNoteAction
  | EditNoteAction
  | RemoveNoteAction
  | ApiError

export type AppActions = NoteActionTypes
