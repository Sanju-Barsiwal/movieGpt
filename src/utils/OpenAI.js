const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const getMovieRecommendations = async (query) => {
  const response = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'MovieGPT',
      },
      body: JSON.stringify({
        model: 'mistralai/devstral-2512:free',
        messages: [
          {
            role: 'user',
            content: query,
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data;
};

export default { getMovieRecommendations };
