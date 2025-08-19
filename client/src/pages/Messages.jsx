import React from 'react'
import { dummyConnectionsData } from '../assets/assets'
import { Eye, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Messages = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen relative  p-4'>
      <div className='max-w-6xl mx-auto p-6'>
        {/* title */}
        <div>
          <h1 className='text-3xl font-bold text-white'>Messages</h1>
          
        </div>
        {/* connected users */}
        <div className='mt-6 rounded-2xl shadow-xl p-4 space-y-3 gap-3'>
        {dummyConnectionsData.map((user) => (
          <div key={user._id} className='max-w-xl flex items-start gap-3  bg-sky-900/80  p-6 rounded-lg transition-colors duration-200'>
            <img
              src={user.profile_picture}
              alt={user.full_name}
              className='w-10 h-10 rounded-full ring-2 ring-indigo-500 shadow-sm flex-shrink-0'
            />
            <div className='flex-1'>
              <p className='font-medium text-white'>{user.full_name}</p>
              <p className='text-gray-400 text-sm'>@{user.username}</p>
              <p className='p-1 text-gray-400 text-sm'>{user.bio}</p>
            </div>
            <div className='flex flex-col gap-2 mt-4'>
              <button
                  onClick={() => navigate(`/messages/${user._id}`)}
                  aria-label={`Message ${user.full_name}`}
                  className='px-3 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors duration-200'
                >
                  <MessageSquare className='w-4 h-4' />
                </button>
                <button
                  onClick={() => navigate(`/profile/${user._id}`)}
                  aria-label={`View profile of ${user.full_name}`}
                  className='px-3 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors duration-200'
                >
                  <Eye className='w-4 h-4' />
                </button> 
            </div>
            
          </div>
        ))}

        </div>

      </div>
     
    </div>
  )
}

export default Messages
