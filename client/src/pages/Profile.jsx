import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { dummyPostsData, dummyUserData } from '../assets/assets';
import Loading from '../components/Loading';
import UserProfileInfo from '../components/UserProfileInfo';

const Profile = () => {
  const { profileId } = useParams();
  const [user, setUser] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState('posts');
  const [showEdit, setShowEdit] = React.useState(false);

  const fetchUser = () => {
    setUser(dummyUserData);
    setPosts(dummyPostsData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return user ? (
    <div className="relative h-full overflow-y-scroll bg-sky-500 p-6">
      <div className="max-w-6xl mx-auto">
        {/* profile card */}
        <div className="bg-sky-900/80 rounded-2xl shadow overflow-hidden">
          <div className="h-40 md:h-56 bg-gradient-to-r from-sky-600 to-sky-800">
            {user.cover_photo && (
              <img
                src={user.cover_photo}
                alt="cover photo"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* user profile info */}
          <UserProfileInfo
            user={user}
            posts={posts}
            profileId={profileId}
            setShowEdit={setShowEdit}
          />
        </div>
      </div>
    </div>
  ) : (
    <Loading height="60vh" />
  );
};

export default Profile;
