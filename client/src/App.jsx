import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Feed from './pages/Feed'
import Login from './pages/login'
import Discover from './pages/discover'
import Messages from './pages/Messages'
import Profile from './pages/profile'
import ChatBox from './pages/chatBox'
import CreatePost from './pages/createPost'
import { useUser, useAuth} from '@clerk/clerk-react'
import './index.css'
import Layout from './pages/Layout'
import Loading from './components/Loading'
import {Toaster} from 'react-hot-toast'
import Connections from './pages/Connections'
import { useEffect } from 'react'

const App = () => {
  const { isLoaded, user } = useUser()
  const {getToken} = useAuth()
  useEffect(() => {
  if (user) {
    getToken().then((token) => {
      console.log(token);
    });
  }
}, [user]);
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-900 via-black to-gray-800 text-white">
        <Loading/>
      </div>
    )
  }

  return (
  <>
    <Toaster />
    <div className="min-h-screen ">
      <Routes>
        {!user ? (
          <Route path="/" element={<Login />} />
        ) : (
          <Route element={<Layout />}>
            <Route path="/" element={<Feed />} />
            <Route index element={<Feed />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:userId" element={<ChatBox />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:profileId" element={<Profile />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/connections" element={<Connections />} />
          </Route>
        )}
      </Routes>
    </div>
  </>
)

}

export default App
