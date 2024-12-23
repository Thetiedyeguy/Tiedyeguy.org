import React, { useEffect, useState } from 'react';
import styles from './DownloadPage.module.css';
import GameFinder from '../apis/GameFinder';

const DownloadPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await GameFinder.get('');
        setProjects(response.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Download My Projects</h1>
      <ul className={styles.projectList}>
        {projects.map((project, index) => (
          <li key={index} className={styles.projectItem}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <a href={`/${project.fileName}`} download ={`${project.fileName}`} className={styles.downloadButton}>
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DownloadPage;
