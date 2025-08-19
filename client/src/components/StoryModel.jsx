import React, { useState } from 'react'
import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react'; 
import toast from 'react-hot-toast';

const StoryModel = ({ setShowModel, fetchStories }) => {
  const bgColors = [
    "bg-sky-500",
    "bg-pink-500",
    "bg-blue-900",
    "bg-blue-800",
    "bg-gray-900",
    "bg-gray-800",
    "bg-black"
  ];

  const [mode, setMode] = useState('text');
  const [background, setBackground] = useState(bgColors[0]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCreateStory = async () => {
    // your logic here
  };

  return (
    <div className="fixed inset-0 z-[110] min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center flex mb-4 items-center justify-between">
          <button onClick={() => setShowModel(false)} className="text-white p-2 cursor-pointer">
            <ArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">Create Story</h2>
          <span className="w-10"></span>
        </div>

        {/* ✅ Apply Tailwind class dynamically */}
        <div className={`rounded-lg h-96 flex items-center justify-center relative ${background}`}> 
          {mode === 'text' && (
            <textarea
              className="bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none"
              placeholder="What's on your mind?"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          )}
          {
            mode === 'media' && previewUrl && (
              media?.type.startsWith('image')?(
                <img src = {previewUrl} alt='' className='object-contain max-h-full'/>
              ):(
                <video src = {previewUrl}/>
              )

            )
          }
        </div>

       <div className="flex mt-4 gap-2">
        {bgColors.map((color) => (
          <button
            key={color}
            className={`w-6 h-6 rounded-full ring cursor-pointer ${color}`}
            onClick={() => setBackground(color)}
          />
        ))}
      </div>

      <div className='flex gap-2 mt-4'>
        <button onClick = {() => {setMode('text'); setMedia(null); setPreviewUrl(null) }} className={`flex-1 flex items-center justify-center gap-2 p-2 rounded ${mode === 'text' ? "bg-white text-black" : "bg-zinc-800 text-white"}`}>
          <TextIcon size={18}/> Text
        </button>
        <label className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === 'media' ? "bg-white text-black" : "bg-zinc-800 text-white"} `}>
          <input onChange = {(e) => {handleMediaUpload(e); setMode('media')}} type="file" accept='image/*, vedeo/*' className='hidden'/>
          <Upload size={18} /> Photo/Video
        </label>
      </div>
      <button className='flex items-center justify-center bg-sky-500 gap-2 text-white py-3 mt-4 w-full rounded  bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 active:scale-95 transition cursor-pointer'
        onClick={() => toast.promise(handleCreateStory(), {
          loading: 'Creating story...',
          success: <p>Story Added</p>,
          error: e => <p>{e.message}</p>
        })}>
        <Sparkle size={20} /> Create Story
      </button>

      </div>
    </div>
  );
};

export default StoryModel;
