export type Errors = {
  title?: string
  content?: string
}

const validateNoteForm = (values: any) => {
  let errors: Errors = {}

  if (!values.title) {
    errors.title = 'Title is required'
  }

  if (!values.content) {
    errors.content = 'Content is required'
  }

  return errors
}

export default validateNoteForm
