import React from "react";
import styles from "../styles/footer.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h4 className={styles["info-footer"]}>©2021 Digital Booking</h4>
      <div className={styles["icons-social-media"]}>
        <a href="https://facebook.com"><FontAwesomeIcon icon={['fab', 'facebook']} color='white' size='lg'/></a>
        <a href="https://linkedin.com/"><FontAwesomeIcon icon={['fab', 'linkedin']} color='white' size='lg'/></a>
        <a href="https://twitter.com/"><FontAwesomeIcon icon={['fab', 'twitter']} color='white' size='lg'/></a>
        <a  href="https://instagram.com/"><FontAwesomeIcon icon={['fab', 'instagram']} color='white' size='lg'/></a>
      </div>
    </footer>
  );
}