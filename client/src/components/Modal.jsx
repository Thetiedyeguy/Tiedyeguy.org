import React, { useState } from 'react';
import styles from './Modal.module.css';
import UserFinder from '../apis/UserFinder';

const Modal = ({ closeModal, setUser }) => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const url = isCreatingAccount ? '/register' : '/login';

      const response = await UserFinder.post(url, formData);

      localStorage.setItem('token', response.data.data.token);

      setUser(response.data.data.user);

      closeModal();
    }catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={closeModal}>
          ✖
        </button>
        <h2>{isCreatingAccount ? 'Create Account' : 'Sign In'}</h2>
        {isCreatingAccount && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className={styles.input}
          />
        )}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button
          className={styles.toggleButton}
          onClick={() => setIsCreatingAccount(!isCreatingAccount)}
        >
          {isCreatingAccount ? 'Back to Sign In' : 'Create an Account'}
        </button>
        <button className={styles.submitButton} onClick={handleSubmit}>
          {isCreatingAccount ? 'Create Account' : 'Sign In'}
        </button>
      </div>
    </div>
  );
};

export default Modal;
