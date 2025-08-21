import React from 'react'
import {
  Users,
  UserPlus,
  UserRoundPen,
  MessageSquare,
  UserCheck,
  Eye,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  dummyConnectionsData as connections,
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pendingConnections,
} from '../assets/assets'

const Connections = () => {
  const navigate = useNavigate()
  const [tab, setTab] = React.useState('connections')

  const dataArray = [
    { label: 'Followers', value: followers, icon: Users },
    { label: 'Following', value: following, icon: UserCheck },
    { label: 'Pending', value: pendingConnections, icon: UserRoundPen },
    { label: 'Connections', value: connections, icon: UserPlus },
  ]

  // Placeholder functions for actions
  const handleUnfollow = (userId) => {
    console.log('Unfollow user:', userId)
  }

  const handleAccept = (userId) => {
    console.log('Accept connection:', userId)
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* title */}
        <div className="mb-6 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Connections</h1>
          <p className="text-gray-400 text-sm sm:text-base">Manage your social network</p>
        </div>

        {/* connection categories */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {dataArray.map((item, idx) => (
            <div
              key={idx}
              className="bg-sky-800/80 p-3 sm:p-4 rounded-lg shadow-lg flex items-center gap-2 sm:gap-3 hover:bg-sky-700 transition-colors duration-200 cursor-pointer"
              onClick={() => setTab(item.label.toLowerCase())}
            >
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <div>
                <h3 className="text-sm sm:text-lg font-semibold text-white">{item.label}</h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  {item.value.length} {item.label.toLowerCase()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* tabs */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 mb-6">
          {dataArray.map((item, idx) => (
            <button
              key={idx}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base text-white rounded-lg transition-colors duration-200 
                ${tab === item.label.toLowerCase() ? 'bg-sky-700 font-semibold' : 'hover:bg-sky-700'}`}
              onClick={() => setTab(item.label.toLowerCase())}
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-1 sm:mr-2" />
              {item.label}
            </button>
          ))}
        </div>

        {/* tab content */}
        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          {dataArray.map(
            (item) =>
              tab === item.label.toLowerCase() &&
              (item.value.length > 0 ? (
                item.value.map((user) => (
                  <div
                    key={user._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-sky-900/80 p-4 sm:p-6 rounded-lg transition-colors duration-200"
                  >
                    <img
                      src={user.profile_picture}
                      alt={user.full_name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-indigo-500 shadow-sm flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm sm:text-base">{user.full_name}</p>
                      <p className="text-gray-400 text-xs sm:text-sm">@{user.username}</p>
                      <p className="p-1 text-gray-400 text-xs sm:text-sm">{user.bio}</p>
                    </div>

                    {/* actions per tab */}
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      {/* View Profile always */}
                      <button
                        onClick={() => navigate(`/profile/${user._id}`)}
                        aria-label={`View profile of ${user.full_name}`}
                        className="px-2 sm:px-3 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors duration-200"
                      >
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>

                      {tab === 'connections' && (
                        <button
                          onClick={() => navigate(`/messages/${user._id}`)}
                          aria-label={`Message ${user.full_name}`}
                          className="px-2 sm:px-3 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors duration-200"
                        >
                          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      )}

                      {tab === 'following' && (
                        <button
                          onClick={() => handleUnfollow(user._id)}
                          className="px-2 sm:px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                        >
                          Unfollow
                        </button>
                      )}

                      {tab === 'pending' && (
                        <button
                          onClick={() => handleAccept(user._id)}
                          className="px-2 sm:px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                          Accept
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 py-6">
                  No {item.label.toLowerCase()} found
                </p>
              ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Connections
