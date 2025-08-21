import { Verified } from 'lucide-react'
import React from 'react'

const UserProfileInfo = ({ user, posts, profileId, setShowEdit }) => {
  return (
    <div className="relative py-6 px-6 md:px-8 bg-white rounded-xl shadow">
      {/* Profile Image */}
      <div className="absolute -top-16 left-6">
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
          <img
            src={user.profile_picture}
            alt={user.full_name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="w-full pt-20 md:pl-40">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.full_name}
              </h1>
              <Verified className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-gray-600">@{user.username}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileInfo
