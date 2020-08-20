import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../types/reducers'

import useForm from '../hooks/useForm'
import validateNoteForm from '../utils/validateNoteForm'
import Modal from './Modal'

const EditNoteForm: FC = () => {
  const notesList = useSelector((state: RootState) => state.notes.notesList)
  const { noteId } = useParams()

  const INITIAL_VALUES = notesList.find((note) => {
    return note._id === noteId
  })

  const {
    handleValuesChange,
    handleSubmit,
    values,
    errors,
    modalVisible,
    modalMessage,
  } = useForm(INITIAL_VALUES, validateNoteForm, noteId)

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__item">
          <label
            className={`form__label ${errors.title && 'form__label--red'}`}
            htmlFor="title"
          >
            {errors.title ? 'Title is required' : 'Title'}
          </label>
          <input
            type="text"
            name="title"
            placeholder="Note title"
            value={values.title}
            autoFocus={true}
            onChange={handleValuesChange}
          />
        </div>
        <div className="form__item">
          <label
            className={`form__label ${errors.content && 'form__label--red'}`}
            htmlFor="content"
          >
            {errors.content ? 'Content is required' : 'Content'}
          </label>
          <textarea
            name="content"
            placeholder="Note content"
            value={values.content}
            onChange={handleValuesChange}
          />
        </div>
        <div className="form__btn">
          <button type="submit" className="btn btn--accent">
            Save
          </button>
        </div>
      </form>
      <Modal modalVisible={modalVisible} modalMessage={modalMessage} />
    </>
  )
}

export default EditNoteForm
