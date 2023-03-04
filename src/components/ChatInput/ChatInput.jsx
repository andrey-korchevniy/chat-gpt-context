import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatInput.module.css';

function ChatInput({ onMessageSubmit }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  }, [message]);

  const handleMessageChange = event => {
    setMessage(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (message.trim()) {
      onMessageSubmit(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        ref={inputRef}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;
