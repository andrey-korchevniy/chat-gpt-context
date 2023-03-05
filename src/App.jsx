import { useState } from 'react';
import ChatInput from 'components/ChatInput/ChatInput';
import ChatList from 'components/ChatList/ChatList';
import getGptMessage from 'js/getGptMessage';
import { useEffect } from 'react';
import Slider from 'components/Slider/Slider';

export const App = () => {
  //* хранилище сообщений разговора
  const [history, setHistory] = useState([
    { role: 'system', content: 'Hello!' },
  ]);
  //* хранилище температуры
  const [temperature, setTemperature] = useState(0.5);

  //* хранилище глубины контекста
  const [depth, setDepth] = useState(4);

  //* обработка добавления нового сообщения
  const hundleNewMessage = message => {
    setHistory(prev => [...prev, message]);
  };

  //* обработка изменения температуры
  const hundleTemperature = value => {
    setTemperature(value);
  };

  //* обработка изменения глубины контекста
  const hundleContext = value => {
    setDepth(value);
  };

  //* обработка отправки сообщения пользователем
  const onMessageSubmit = async data => {
    const message = { role: 'user', content: data };
    hundleNewMessage(message);
  };

  //* обработка отправки запроса по сообщению пользователя
  useEffect(() => {
    const hundleGptAnswer = async data => {
      const message = { role: 'system', content: data };
      hundleNewMessage(message);
    };
    const lastEl = history.length - 1;
    if (history[lastEl] && history[lastEl].role === 'user') {
      const dataForGPT =
        history.length < depth ? history : history.slice(-depth);
      getGptMessage(dataForGPT, hundleGptAnswer, temperature);
    }
  }, [history, temperature, depth]);

  return (
    <div>
      <ChatList messages={history} />
      <ChatInput onMessageSubmit={onMessageSubmit} />{' '}
      <Slider
        onChange={hundleTemperature}
        data={temperature}
        title="Temperature"
        min="0"
        max="1"
        step="0.05"
      />
      <Slider
        onChange={hundleContext}
        data={depth}
        title="Context depth"
        min="1"
        max="10"
        step="1"
      />
    </div>
  );
};
