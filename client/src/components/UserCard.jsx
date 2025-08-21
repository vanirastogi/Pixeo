import React from 'react';
import { dummyUserData } from '../assets/assets';
import { MapPin, MessageCircle, Plus, UserPlus } from 'lucide-react';

const UserCard = ({ user }) => {
  const currentUser = dummyUserData;

  const handleFollow = () => {
    console.log(`Followed ${user.full_name}`);
  };

  const handleConnectionRequest = () => {
    console.log(`Connection request sent to ${user.full_name}`);
  };

  return (
    <div
      key={user._id}
      className="p-6 flex flex-col justify-between w-88 rounded-xl border border-slate-800 bg-sky-900/70  transition-all duration-200 shadow-md"
    >
      {/* Top Section */}
      <div className="flex flex-col items-center text-center">
        <img
          src={user.profile_picture}
          alt={user.full_name}
          className="w-20 h-20 rounded-full shadow-md object-cover"
        />
        <p className="mt-4 font-semibold text-slate-100">{user.full_name}</p>
        {user.username && (
          <p className="text-slate-400 text-sm">@{user.username}</p>
        )}
        {user.bio && (
          <p className="text-slate-400 mt-2 text-xs leading-relaxed px-2">
            {user.bio}
          </p>
        )}
      </div>

      {/* Middle Section */}
      <div className="mt-4 flex flex-col gap-2 text-slate-400 text-sm">
        <div className="flex items-center justify-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{user.location || 'Location not specified'}</span>
        </div>
        <div className="flex items-center justify-center">
          <span>{user.followers.length} Followers</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex gap-2 mt-6">
        {/* Follow button */}
        <button
          disabled={currentUser?.following.includes(user._id)}
          onClick={handleFollow}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors duration-200 ${
            currentUser?.following.includes(user._id)
              ? 'bg-slate-800 text-slate-300 '
              : 'bg-sky-600 hover:bg-sky-700 text-white'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          {currentUser?.following.includes(user._id) ? 'Following' : 'Follow'}
        </button>

        {/* Connection button */}
        <button
          onClick={handleConnectionRequest}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors duration-200"
        >
          {currentUser?.connections.includes(user._id) ? (
            <MessageCircle className="w-5 text-sky-400" />
          ) : (
            <Plus className="w-5 text-slate-300" />
          )}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
