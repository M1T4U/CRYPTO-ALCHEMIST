// The backend server runs on port 3001 by default.
const API_URL = 'http://localhost:3001/api/generate';

export const getAiResponse = async (
  prompt: string,
  onChunk: (chunk: string) => void,
  onError: (error: string) => void,
): Promise<void> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok || !response.body) {
        if (response.status === 503) {
            throw new Error("The AI chatbot is currently disabled. Please check the server configuration.");
        }
        const errorData = await response.json().catch(() => ({ error: 'An unknown error occurred' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk);
    }
  } catch (error) {
    console.error("Failed to get AI response:", error);
    const errorMessage = error instanceof Error ? error.message : "I'm sorry, I encountered an error. Please try again.";
    onError(errorMessage);
  }
};