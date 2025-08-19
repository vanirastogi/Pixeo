import { BadgeCheck, X } from 'lucide-react'
import React, { useEffect } from 'react'

const StoryViewer = ({ viewStory, setViewStory }) => {

    const [progress, setProgress] = React.useState(0);
    useEffect(() => {
        let timer, processInterval;
        if(viewStory && viewStory.media_type !== 'video') {
            setProgress(0);
            const duration = 10000; // 10 seconds for text and image stories
            const setTime = 10; // 100 milliseconds
            let elapsedTime = 0;
            processInterval = setInterval(() => {
                elapsedTime += setTime;
                setProgress((elapsedTime / duration) * 100);
            }, setTime);
            // we have to cole the store after duration
            timer = setTimeout(() => {
                setViewStory(null);
                
            },duration)
        }
        return () => {
            clearTimeout(timer);
            clearInterval(processInterval);
            setProgress(0); // Reset progress when the component unmounts
        }
    },[viewStory, setViewStory]);

    if(!viewStory) return null;

    const renderContent = () => {
        if(viewStory.media_type === 'text') {
            return (
                <div className='text-white text-2xl sm:text-4xl p-6 sm:p-12 font-semibold text-center'>
                    {viewStory.content}
                </div>
            )
        }
        else if(viewStory.media_type === 'image') {
            return (
                <img src = {viewStory.media_url} alt='' className='max-w-full max-h-screen object-cover'/>
            )
        }
        else if(viewStory.media_type === 'video') {
            return (
                <video onEnded={() => setViewStory(null)} src = {viewStory.media_url} className='max-h-screen ' controls autoPlay/>
            )
        }
    }
  return (
    <div
      className="fixed inset-0 h-screen  backdrop-blur flex items-center justify-center z-[110]"
      style={{
        backgroundColor:
          viewStory.media_type === 'text'
            ? viewStory.background_color 
            : '#000000'
      }}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
        <div
          className="h-full bg-white transition-all duration-100 linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* User info */}
      <div className="absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 sm:p-4 sm:px-8 backdrop-blur rounded bg-black/50">
        <img
          src={viewStory.user?.profile_picture}
          alt=""
          className="size-7 sm:size-8 rounded-full object-cover border border-white"
        />
        <div className="text-white font-medium flex items-center gap-1.5">
          <span>{viewStory.user?.full_name}</span>
          <BadgeCheck size={18} />
        </div>
      </div>
      {/* close buthhon  */}
      <button className='absolute top-4 right-4 text-white text-xl font-bold focus:outline-none' onClick={() => setViewStory(null)}>
        <X className='w-8 h-8 hower:scale-100 transition cursor-pointer'/>
      </button>
        {/* Story content */}
        <div className="max-w-full max-h-screen flex items-center justify-center">
            {renderContent()}
        </div>
    </div>
  )
}

export default StoryViewer
