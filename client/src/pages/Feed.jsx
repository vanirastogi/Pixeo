import React, { useEffect, useState } from 'react'
import { assets, dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading'
import StoriesBar from '../components/StoriesBar'
import PostCard from '../components/PostCard'
import RecentMessages from '../components/recentMessages'

const Feed = () => {
  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData);
    setLoading(false);
  }
  
  useEffect(() => {
    fetchFeeds()
  },[])

  return !loading ? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex justify-center items-start xl:gap-8'>
      
      {/* STORIES AND POST LIST */}
      <div>
        <StoriesBar/>
        <div className='p-4 space-y-6'>
          {feeds.map((post, idx) => (
            <PostCard key={post._id || idx} post={post} />
          ))}
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className='max-xl:hidden sticky top-0'>
        <div className="max-w-xs bg-sky-900/80 rounded-2xl shadow-lg p-4 mb-6 gap-2">
          <h3 className="text-white font-semibold mb-2">Sponsored</h3>
          <img src={assets.sponsored_img} alt="Sponsored Ad" className="w-full h-40 object-cover rounded-lg" />
          <p className="text-slate-300 mt-2">Email Marketing</p>
          <p className="text-slate-400 text-sm">
            Get more leads with our email marketing service.
          </p>
          <button className="bg-sky-600 text-white px-4 py-2 rounded-lg mt-3 hover:bg-sky-700 transition">
            Learn More
          </button>
        </div>
        
        <div>
          <RecentMessages />
        </div>
      </div>
      
    </div>
  ) : (
    <Loading/>
  )
}

export default Feed
