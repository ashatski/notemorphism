import { useState, useEffect } from 'react'
import { Errors } from '../utils/validateNoteForm'
import { useDispatch } from 'react-redux'
import { addNote, editNote } from '../actions/notes'

const useForm = (initialValues: any, validate: any, noteId?: any) => {
  const dispatch = useDispatch()

  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<Errors>({})
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<string>('')

  const handleValuesChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  function handleSubmit(event: any) {
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setModalVisible(true)

      if (initialValues._id !== undefined) {
        dispatch(editNote(noteId, values))
        setModalMessage(`${values.title} note updated`)
      } else if (initialValues._id === undefined) {
        dispatch(addNote(values))
        setModalMessage(`${values.title} note added`)
        setValues(initialValues)
      }
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setModalVisible(false)
    }, 1500)

    return () => {
      clearTimeout(timeout)
    }
  }, [modalVisible])

  return {
    handleValuesChange,
    handleSubmit,
    values,
    errors,
    modalVisible,
    modalMessage,
  }
}

export default useForm
