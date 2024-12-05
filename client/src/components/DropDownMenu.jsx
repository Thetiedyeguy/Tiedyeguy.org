import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming React Router is used
import styles from './DropdownMenu.module.css';

const DropdownMenu = () => {
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
        </div>
        <button className={styles.expandButton} onClick={toggleExpand}>
          {isExpanded ? '▲' : '▼'}
        </button>
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
