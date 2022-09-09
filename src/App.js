import React, { useEffect} from 'react'
import { useDispatch } from 'react-redux'

import Routing from './Routing';
import { auth } from './config/firebase'
import { login, logout} from './store/slices/AuthSlice'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth === null) {
        dispatch(logout())
      } else {
        dispatch(login())
      }
    })
    // eslint-disable-next-line
  }, [])

  return <Routing />
}

export default App;
