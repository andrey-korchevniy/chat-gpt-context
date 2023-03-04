import { useState } from 'react';
import ChatInput from 'components/ChatInput/ChatInput';
import ChatList from 'components/ChatList/ChatList';
import getGptMessage from 'js/getGptMessage';
import { useEffect } from 'react';

export const App = () => {
  const [history, setHistory] = useState([
    { role: 'system', content: 'Hello!' },
  ]);

  const hundleNewMessage = message => {
    setHistory(prev => [...prev, message]);
  };

  const onMessageSubmit = async data => {
    const message = { role: 'user', content: data };
    hundleNewMessage(message);
  };

  useEffect(() => {
    const lastEl = history.length - 1;
    if (history[lastEl] && history[lastEl].role === 'user') {
      const dataForGPT = history.slice(-4);
      getGptMessage(dataForGPT);
    }
  }, [history]);

  return (
    <div>
      <ChatList messages={history} />
      <ChatInput onMessageSubmit={onMessageSubmit} />
    </div>
  );
};
