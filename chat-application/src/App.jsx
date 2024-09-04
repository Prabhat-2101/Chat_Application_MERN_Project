import React,{useEffect} from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import Container from './Container.jsx'
import Login from './components/Login.jsx'
import CreateGroup from './components/CreateGroup.jsx'
import Welcome from './components/Welcome.jsx'
import ChatArea from './components/ChatArea.jsx'
import Register from './components/Register.jsx'
import './App.css';
import CreateUser from './components/CreateUser.jsx'

function MainApp() {
  return (
    <div className='App'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<Container />}>
            <Route path="" element={<Welcome />} />
            <Route path="welcome" element={<Welcome />} />
            <Route path="group" element={<CreateGroup />} />
            <Route path="user" element={<CreateUser />} />
            <Route path="chat" element={<ChatArea />} />
          </Route>
        </Routes>
    </div>
  )
}

export default MainApp