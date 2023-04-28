import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './toast.module.css'
import { useState, useEffect } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Toast({ message, duration }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);
    
        return () => {
            clearTimeout(timer);
        };
    }, [duration]);
  
    return (
      <>
        {visible && (
            <div className={styles.toast}>
                <p>{message}</p>
                <button onClick={()=>setVisible(false)} className={styles.closeBtn}>
                    <FontAwesomeIcon icon={faTimes} size='sm' />
                </button>
            </div>
        )}
      </>
    );
  }