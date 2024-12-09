import React from 'react';
import styles from './Contacts.module.css';

const Contacts = () => {
  return (
    <footer className={styles.footer}>
      <h3>My Info</h3>
      <ul className={styles.contactList}>
        <li>
          <a href="mailto:thetiedyeguy42@gmail.com">Email</a>
        </li>
        <li>
          <a href="https://github.com/Thetiedyeguy" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/josiah-johnson-514516293" target="_blank" rel="noopener noreferrer">
            Linkedin Profile
          </a>
        </li>
        <li>
          <strong>Phone:</strong> (209) 568-7740
        </li>
        <li>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Contacts;
