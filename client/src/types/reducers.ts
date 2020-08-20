import { Note } from './Note'

export interface RootState {
  notes: NotesState;
}

export interface NotesState {
  notesList: Note[];
  isFetched: boolean;
  addedNote: object;
  editedNote: object;
  isError: boolean;
}
