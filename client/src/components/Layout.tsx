import React, { FC } from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '../types/reducers'
import Loading from './Loading'

type LayoutProps = {}

const Layout: FC<LayoutProps> = ({ children }, props) => {
  const isFetched = useSelector((state: RootState) => state.notes.isFetched)

  if (!isFetched) {
    return <Loading />
  }

  return (
    <main className="app__content">
      <div className="container">{children}</div>
    </main>
  )
}

export default Layout
