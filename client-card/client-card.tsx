"use client"; // Adicione esta linha no início do arquivo

import React, { useState, useEffect } from 'react';
import styles from './ClientCard.module.css';

interface ExpandableCardProps {
  profilePicture?: string;
  name: string;
  comment: string;
  servicePhotos: string[];
  stars: number;
}

const ClientCard: React.FC<ExpandableCardProps> = ({ profilePicture, name, comment, servicePhotos, stars }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOutsideClick = (event: MouseEvent) => {
    if (!(event.target as Element).closest(`.${styles.card}`)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className={isOpen ? styles.cardOpen : styles.card} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.header}>
        {profilePicture && <img src={profilePicture} alt={`${name}'s profile`} className={styles.profilePicture} />}
        <h2>{name}</h2>
      </div>
      <div className={styles.details}>
        <div className={styles.stars}>
          {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
        </div>
        <p className={styles.comment}>{comment}</p>
      </div>
      <div className={styles.photos}>
        {!isOpen && servicePhotos.length > 0 && (
          <div className={styles.photoFirstWrapper}>
            <div
              className={styles.photoFirst}
              style={{ backgroundImage: `url(${servicePhotos[0]})` }}
              onClick={(e) => {
                if (!isOpen) {
                  e.stopPropagation();
                }
              }}
            />
          </div>
        )}
        {isOpen && servicePhotos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`service ${index + 1}`}
            className={styles.photoOpen}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientCard;
