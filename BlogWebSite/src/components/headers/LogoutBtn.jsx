import React from 'react'
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/Auth_Service';
import {logout} from '../../stores/AuthSlice'

const LogoutBtn = () => {

    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout()
            .then(() => dispatch(logout()))
    }

  return (
    <button 
    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >LogoutBtn</button>
  )
}

export default LogoutBtn