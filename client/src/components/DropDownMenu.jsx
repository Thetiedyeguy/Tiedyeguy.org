import React, { useState } from 'react';
import { useUser } from '../context/Context';
import { Link } from 'react-router-dom'; // Assuming React Router is used
import Modal from './Modal';
import styles from './DropdownMenu.module.css';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {
  let navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user, setUser} = useUser();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.dropdown}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.limitedInfo}>
          <Link to="/">Tiedyeguy.org</Link>
          <Link to="/yelp">Yelp</Link>
          <Link to="/games">Games</Link>
          <Link to="/posts">Posts</Link>
        </div>
        <div className={styles.auth}>
          {user ? (
            <>
              <span className={styles.username}>Welcome, {user.name}</span>
              <button className={styles.profileButton} onClick={() => navigate(`/${user.username.toLowerCase()}`)}>
                Profile
              </button>
            </>
          ) : (
            <button className={styles.signInButton} onClick={() => setIsModalOpen(true)}>
              Sign In
            </button>
          )}
        </div>
        {isModalOpen && (
          <Modal
            closeModal={() => setIsModalOpen(false)}
            setUser={setUser}
          />
        )}
        {/* <button className={styles.expandButton} onClick={toggleExpand}>
          {isExpanded ? '\u25B2' : '\u25BC'}
        </button> */}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className={styles.expandedMenu}>
          <ul>
            <li>
              <Link to="/about" onClick={toggleExpand}>About</Link>
            </li>
            <li>
              <Link to="/contact" onClick={toggleExpand}>Contact</Link>
            </li>
            <li>
              <Link to="/more" onClick={toggleExpand}>More</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
