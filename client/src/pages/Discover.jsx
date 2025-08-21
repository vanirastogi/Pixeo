import React, { useState } from 'react';
import { dummyConnectionsData } from '../assets/assets';
import { Search, User } from 'lucide-react';
import UserCard from '../components/UserCard';
import Loading from '../components/Loading';

const Discover = () => {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState(dummyConnectionsData);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      setUsers([]);
      setLoading(true);
      setTimeout(() => {
        setUsers(dummyConnectionsData);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        {/* title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Discover People
          </h1>
          <p className="text-gray-200 text-sm sm:text-base">
            Connect with new people and expand your network.
          </p>
        </div>

        {/* search - minimalist */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or username..."
              className="w-full pl-10 pr-4 py-2 bg-transparent border border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 text-sm sm:text-base text-slate-100 placeholder-slate-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
        <div className='flex flex-wrap gap-6'>
          {users.map((user) => (
            <UserCard user = {user} key = {user._id}/>
          ))}
        </div>

        {loading && (
         <Loading height='60vh'/>
        )}
      </div>
    </div>
  );
};

export default Discover;
