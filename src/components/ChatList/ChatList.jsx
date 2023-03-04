import React, { useRef, useEffect } from 'react';
import styles from './ChatList.module.css';

function ChatList({ messages }) {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className={styles['chat-container']} ref={chatContainerRef}>
      {messages.map((message, index) => (
        <div key={index} className={styles['message']}>
          <p className={styles['role']}>{message.role}</p>
          <p className={styles['content']}>{message.content}</p>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
