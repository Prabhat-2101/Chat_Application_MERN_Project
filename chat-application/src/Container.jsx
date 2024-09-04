import './App.css'
import React, { useEffect,useState } from 'react'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import Chatarea from './components/ChatArea'
import Welcome from './components/Welcome'
import CreateGroup from './components/CreateGroup'
import { Outlet,useNavigate } from 'react-router-dom'

export default function Container() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')));

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);
  return (
    <div className="w-full overflow-hidden h-screen bg-white-400 flex flex-col justify-center items-center py-4">
      <div className="flex w-11/12 h-full p-2 gap-3 rounded box-shadow-1 bg-gray-200">
        <Navbar/>
        <Contact/>
        <Outlet/>
      </div>
    </div>
  )
}