import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/Context';
import UserFinder from '../apis/UserFinder';
import styles from './ProfilePage.module.css';
import { useNavigate } from 'react-router-dom';
console.log('Styles:', styles);

const ProfilePage = () => {
  let navigate = useNavigate();
  const { username } = useParams();
  const { user: loggedInUser, setUser} = useUser();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone_number: '',
    age: '',
  });
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [editable, setEditable] = useState(false);
  
  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('token'); // Clear the JWT token
    navigate('/'); // Redirect to home page
  };
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await UserFinder.get(`/${username}`);
        setProfile(response.data.data.user);
        setPosts(response.data.data.posts);
        setEditable(loggedInUser?.username === username);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    
    fetchProfile();
  }, [username, loggedInUser, editable]);
  
  const handleSave = async () => {
    try {
      const response = await UserFinder.put(`/${username}`, profile);
      setProfile(response.data.data.user);
      alert('Profile updated successfully');
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handlePostSubmit = async () => {
    try {
      const response = await UserFinder.post(`/${username}/posts`, { content: newPost });
      setPosts([response.data.data.post, ...posts]);
      setNewPost('');
    } catch (err) {
      console.error('Error submitting post:', err);
    }
  };


  if (!profile) return <p>Loading...</p>;

  return (
    <div className={styles.profileContainer}>
        <h1 className={styles.sectionHeader}>{username}'s Profile</h1>
          {editable && (
            <button className={styles.signOutButton} onClick={handleSignOut}>
              Sign Out
            </button>
          )}
        {editable ? (
            <div className={styles.profileInfo}>
            <input
                type="text"
                value={profile.name || ''}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Name"
            />
            <input
                type="email"
                value={profile.email || ''}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="Email"
            />
            <input
                type="text"
                value={profile.phone_number || ''}
                onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
                placeholder="Phone Number"
            />
            <input
                type="number"
                value={profile.age || ''}
                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                placeholder="Age"
            />
            <button className={styles.saveButton} onClick={handleSave}>Save</button>
            </div>
        ) : (
            <div className={styles.profileInfo}>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone_number}</p>
            <p>Age: {profile.age}</p>
            </div>
        )}
        <div className={styles.blogPosts}>
            <h2 className={styles.sectionHeader}>Posts</h2>
            {posts.map((post) => (
            <div key={post.id} className={styles.post}>
                <p>{post.content}</p>
                <small>{new Date(post.created_at).toLocaleString()}</small>
            </div>
            ))}
            {editable && (
            <div className={styles.newPostContainer}>
                <textarea
                rows="4"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Write a new post..."
                ></textarea>
                <button className={styles.submitButton} onClick={handlePostSubmit}>Submit</button>
            </div>
            )}
        </div>
    </div>
  );
};

export default ProfilePage;
