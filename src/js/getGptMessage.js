import axios from 'axios';

//* -- подключаемся к openai --
import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getGptMessage(dataForGPT, res) {
  //* -- проверяем, есть ли apiKey --
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  //* -- проверяем тело запроса на путоту --
  const query = JSON.stringify({ query: dataForGPT }) || '';
  console.log(query);
  if (query.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Введите текст',
      },
    });
    return;
  }

  try {
    const completion = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-0301',
        prompt: query,
        temperature: 0.6,
        max_tokens: 10,
      }
    );
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
}

export default getGptMessage;
