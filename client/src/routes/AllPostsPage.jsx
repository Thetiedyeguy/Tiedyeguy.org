import React, { useEffect, useState } from 'react';
import styles from './AllPostsPage.module.css';
import PostFinder from '../apis/PostFinder';
import DropdownMenu from '../components/DropDownMenu';
import { Link } from 'react-router-dom';
import { useUser } from '../context/Context';

const AllPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: loggedInUser} = useUser();

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await PostFinder.get('');
            setPosts(response.data.data.posts);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setLoading(false);
        }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  const deletePost = async (e, id) => {
    e.stopPropagation()
    try {
      await PostFinder.delete(`/${id}`)
      setPosts(posts.filter(post => {
          return post.id !== id
      }))
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div>
        <DropdownMenu/>
        <div className={styles.container}>
        <h1 className={styles.header}>Feed</h1>
        {posts.map((post) => (
            <div key={post.id} className={styles.post}>
              <div className={styles.postHeader}>
                  <h3>
                      {post.name}
                      (<Link to={`/${post.username}`} className={styles.usernameLink}>
                          @{post.username}
                      </Link>)
                  </h3>
                  <small>{new Date(post.created_at).toLocaleString()}</small>
              </div>
              <p className={styles.content}>{post.content}</p>
              {loggedInUser?.username === "root" && <button onClick={(e) => deletePost(e, post.id)}>delete</button>}
            </div>
        ))}
        </div>
    </div>
  );
};

export default AllPostsPage;
