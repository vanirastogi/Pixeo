import React from 'react';
import { SignIn} from '@clerk/clerk-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-start px-10 py-20">
        <h1 className="text-9xl font-extrabold text-white-900 mb-6">Pixeo</h1>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex -space-x-2">
            <img src="https://i.pravatar.cc/40?img=1" alt="user" className="w-8 h-8 rounded-full border-2 border-white" />
            <img src="https://i.pravatar.cc/40?img=2" alt="user" className="w-8 h-8 rounded-full border-2 border-white" />
            <img src="https://i.pravatar.cc/40?img=3" alt="user" className="w-8 h-8 rounded-full border-2 border-white" />
          </div>
          <p className="text-sm text-gray-700 font-medium">
            <span className="text-white-500">★★★★★</span> Used by 12k+ users
          </p>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white-800 leading-tight mb-4">
          More than just friends, <br /> truly connect
        </h1>
        <p className="text-gray-600 text-lg">
          Connect with global community on Pixeo.
        </p>
      </div>

      {/* Right Section (Login Form) */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white px-8 py-16">
        {/* <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign in to</h2>
          <p className="text-sm text-gray-500 mb-8">Welcome back! Please login to continue</p>

          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg hover:opacity-90 transition"
            >
              Continue →
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{' '}
            <a href="#" className="text-blue-600 font-medium hover:underline">Sign up</a>
          </p> */}
        {/* </div> */}
        <SignIn/>
        
      </div>
    </div>
  );
};

export default LoginPage;
