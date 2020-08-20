import React, { useEffect, useCallback, FC } from 'react'
import {
  Switch,
  Route,
  useLocation,
  Redirect,
  useHistory,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { fetchNotes } from '../actions/notes'

import Navbar from '../components/Navbar'
import Welcome from '../components/Welcome'
import NotesList from '../components/NotesList'
import EditNoteForm from '../components/EditNoteForm'
import AddNoteForm from '../components/AddNoteForm'
import Layout from '../components/Layout'
import Error from '../components/Error'
import { RootState } from '../types/reducers'
import { API_ERROR } from '../types/actions'

const AppRouter: FC = () => {
  const isError = useSelector((state: RootState) => state.notes.isError)
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (isError) {
      history.push('/error')
      dispatch({
        type: API_ERROR,
        isError: false,
      })
    }
  }, [isError])

  const initFetch = useCallback(() => {
    dispatch(fetchNotes())
  }, [fetchNotes])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  return (
    <>
      <Navbar />
      <div className="app">
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={800}
            classNames="app__animate-"
          >
            <Layout>
              <Switch location={location}>
                <Route exact path="/" component={Welcome} />
                <Route exact path="/notes" component={NotesList} />
                <Route exact path="/add" component={AddNoteForm} />
                <Route exact path="/notes/:noteId" component={EditNoteForm} />
                <Route exact path="/error" component={Error} />
                <Redirect to="/" />
              </Switch>
            </Layout>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </>
  )
}

export default AppRouter
