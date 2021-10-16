import axios from 'axios'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import reducer from '../reducers/user_reducer'
import {getToken, hostAddress} from '../utils/helpers';

const initalState = {
  user: [],
  isAuthenticated: false,
  userLoading: false,
}

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState)

  //Login area start
  const userIntercting = async () => {
    try {
      const token = getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      if(!token) {
        return ''
      }

      dispatch({type: 'userLoading'})
      const response = await axios.get(`${hostAddress}/users/me`, config)
      console.log(response);
      const user = response.data.data.doc

      if(user) {
        dispatch({type: 'setUser', payload: user})
      }
      
    } catch (error) {
      const errorMessage = JSON.parse(error.request.response);
      dispatch({type: 'userError'})
      alert(errorMessage.message);

    }
  }

  // calling userIntercting first
  useEffect(() => {
    userIntercting()
  }, [])

  let user = [];
  const isLogin = () => {
    
      const token = getToken();
      if(!token) return '';

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = axios.get(`${hostAddress}/users/me`, config).then(response => {
        
        user.push(response.data.data.doc.role)
        return response.data.data.doc.role
        
      }).catch((error) => console.log(error))

      console.log();

      return user
  }
  const user2 = isLogin()
  console.log(user2)  
  


  const getUserLoggedIn = async (email, password) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${hostAddress}/users/login`,
        data: {
          email, password,
        }
      })
  
      console.log(response);
      const user = response.data.data.user
      const token = response.data.token;
  
      //set token into local storage
      localStorage.setItem("jwt", token);
    
      if(token) {
        dispatch({type: "setUser", payload: user})
      }
    } catch (error) {
      const errorMessage = JSON.parse(error.request.response);
      alert(errorMessage.message);
    }
    
  }

  const userLogout = () => {
    localStorage.removeItem('jwt')
    dispatch({type: "userLogout"})
  }
  //Login area end

  //Signup area start

  //Signup area end

  return (
    <UserContext.Provider value={{...state, getUserLoggedIn, userLogout, userIntercting}}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
