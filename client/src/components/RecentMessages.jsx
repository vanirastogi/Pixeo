import React, { useState, useEffect } from 'react'
import { dummyRecentMessagesData } from '../assets/assets'
import { Link } from 'react-router-dom'
import moment from 'moment'

const RecentMessages = () => {
  const [messages, setMessages] = useState([])

  const fetchMessages = async () => {
    setMessages(dummyRecentMessagesData)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <div className="bg-sky-900/80 rounded-2xl shadow-xl p-4 space-y-3">
      <h3 className="text-white font-semibold text-lg">Recent Messages</h3>

      {messages.length > 0 ? (
        messages.map((message, idx) => (
          <Link
            key={idx}
            to={`/messages/${message.from_user_id._id}`}
            className="flex items-start gap-3 p-2 rounded-lg hover:bg-sky-700 transition-colors duration-200"
            
          >
            <img
              src={message.from_user_id.profile_picture}
              alt={message.from_user_id.full_name}
              className="w-10 h-10 rounded-full ring-2 ring-indigo-500 shadow-sm flex-shrink-0"
            />

            <div className="flex-1">
              {/* Header: Name + Timestamp */}
              <div className="flex items-center justify-between">
                <p className="font-medium text-white">{message.from_user_id.full_name}</p>
                <p className="text-xs text-gray-400">{moment(message.createdAt).fromNow()}</p>
              </div>

              {/* Message preview + Unseen badge */}
              <div className="flex items-center justify-between mt-1">
                <p className="text-gray-200 text-sm truncate">{message.text || 'Media'}</p>

                {/* Unseen badge */}
                {!message.seen && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-sky-500 rounded-full">
                    1
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-gray-400">No recent messages</p>
      )}
    </div>
  )
}

export default RecentMessages
