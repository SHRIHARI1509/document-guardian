export async function sendToN8n(text: string, documentName: string) {
  const WEBHOOK_URL = 'https://puneethsuperstar.app.n8n.cloud/webhook/gemini-chat';
  
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_input: text,
        document_name: documentName,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n Webhook Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to send to n8n:', error);
    throw error;
  }
}
