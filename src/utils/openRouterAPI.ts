const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const getMovieRecommendations = async (
  query: string,
): Promise<string[]> => {
  const response = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'MovieGPT',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-exp:free',
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
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';
  return content.split(',').map((movie: string) => movie.trim());
};
