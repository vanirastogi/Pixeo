import React, { useEffect } from 'react'
import { dummyStoriesData } from '../assets/assets'
import { Plus } from 'lucide-react'
import moment from 'moment'
import StoryModel from './StoryModel'
import StoryViewer from './StoryViewer'

const StoriesBar = () => {
  const [stories, setStories] = React.useState([])
  const [showModel, setShowModel] = React.useState(false)
  const [viewStory, setViewStory] = React.useState(null)

  const fetchStories = async () => {
    setStories(dummyStoriesData)
  }

  useEffect(() => {
    fetchStories()
  }, [])

  return (
    <div className="w-screen sm:[calc(100vh-140px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4">
      <div className="flex gap-4 pb-5">
        {/* Add a new story */}
        <div onClick = {() => setShowModel(true)} className="rounded-lg shadow-sm min-w-30 max-w-30 max-h-40 aspect-[3/4] cursor-pointer 
                        border-2 border-dashed border-sky-500/40 
                        bg-sky-900/40 backdrop-blur-md 
                        hover:shadow-sky-500/30 hover:shadow-lg transition-all duration-200">
          <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="size-10 bg-sky-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-200 text-center">
              Create Story
            </p>
          </div>
        </div>
        
        {/* Story cards will go here */}
        
       {
  stories.map((story, index) => {
    return (
      <div
        onClick={( ) => setViewStory(story)}
        key={index}
        className="relative rounded-lg shadow min-w-30 max-w-40 max-h-40 cursor-pointer
                   bg-sky-900/40 backdrop-blur-md 
                   hover:shadow-sky-500/30 hover:shadow-lg 
                   transition-all duration-200 active:scale-95 " style={{
                      backgroundColor: story.media_type === 'text' 
                      ? story.background_color 
                      : undefined}}
      >
        {/* User profile image */}
        <img
          src={story.user.profile_picture}
          alt=""
          className="absolute size-8 top-3 left-3 z-10 rounded-full ring-2 ring-sky-500/40 shadow-lg"
        />

        {/* Story content (title or text) */}
        <p className="absolute top-16 left-3 text-gray-200 text-sm truncate max-w-25">
          {story.content}
        </p>

        {/* Story timestamp */}
        <p className="text-gray-400 absolute bottom-1 right-2 z-10 text-xs ">
          {moment(story.created_at).fromNow()}
        </p>
        {
          story.media_type === 'image' ? (
            <img
              src={story.media_url}
              className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80"
              alt="Story media"
            />
          ) : story.media_type === 'video' ? (
            <video
              src={story.media_url}
              className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80"
              autoPlay
              loop
              muted
            />
          ) : null
        }
        
      </div>
    )
  })
}

      </div>
      {/* add story model */}
      {showModel && <StoryModel setShowModel={setShowModel} fetchStories={fetchStories}/>}
      {/* view story model */}
      {viewStory && <StoryViewer viewStory = {viewStory} setViewStory = {setViewStory}/>}

    </div>
  )
}

export default StoriesBar
