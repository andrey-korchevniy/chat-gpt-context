import axios from 'axios';

async function getGptMessage(dataForGPT, hundleGptAnswer, temperature) {
  //* -- проверяем тело запроса на путоту --

  try {
    console.log(typeof temperature);
    axios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // замените YOUR_API_KEY на свой ключ API
      },
      data: {
        model: 'gpt-3.5-turbo-0301',
        messages: dataForGPT,
        max_tokens: 200,
        temperature: temperature,
      },
    })
      .then(response =>
        hundleGptAnswer(response.data.choices[0].message.content)
      )
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.error(error.response.status, error.response.data);
  }
}

export default getGptMessage;
