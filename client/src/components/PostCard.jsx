import React from 'react'
import moment from 'moment'
import { Heart, MessageCircle, Share2 } 
from 'lucide-react'
import { useNavigate } from 'react-router-dom' 
const PostCard = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl shadow-lg p-4 space-y-4 w-full max-w-2xl 
                    bg-sky-900/40  text-gray-100 border border-gray-800">
      
      {/* USER INFO */}
      <div onClick={()=> navigate(`/profile/${post.user._id}`)} className="flex items-center gap-3">
        <img
          src={post.user.profile_picture}
          alt={post.user.username}
          className="w-10 h-10 rounded-full ring-2 ring-indigo-500 shadow-md"
        />
        <div>
          <p className="font-semibold text-white">{post.user.username}</p>
          <p className="text-xs text-gray-400">
            {moment(post.createdAt).fromNow()}
          </p>
        </div>
      </div>

      {/* CONTENT */}
       {post.content && <p className="text-gray-200 leading-relaxed">{post.content}</p>}

      {/* IMAGE (if any) */}
      {post.image_urls?.length > 0 && (
        <img
          src={post.image_urls[0]}
          alt="post"
          className="rounded-xl w-full object-cover max-h-96 border border-gray-700 shadow-md"
        />
      )}

      {/* ACTIONS */}
      <div className="flex items-center gap-6 pt-2 text-sm text-gray-400">
        <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-400">
            <Heart className="w-4 h-4" />
            <span>{post.likes_count.length}</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-400">
            <MessageCircle className="w-4 h-4" />
            <span>12</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-400">
            <Share2 className="w-4 h-4" />
            <span>7</span>
        </div>
        </div>

    </div>
  )
}

export default PostCard
