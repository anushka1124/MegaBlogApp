import { useEffect, useState } from 'react'
import './App.css'
import {Header, Footer} from './components/index'
import { useDispatch } from 'react-redux'
import authService from './appwrite/Auth_Service'
import {login, logout} from './stores/AuthSlice'

function App() {

  const[loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then(
      (userData) => {
        if(userData) {
          dispatch(login({userData}));
        }else {
          dispatch(logout());
        }
      }
    )
    .finally(
      () => setLoading(false)
    )
  },[])

  return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header/>
      <main>
        Todo:{/* <Outlet/> */}
      </main>
      <Footer/>
    </div>
  </div>
  ): null
}

export default App
