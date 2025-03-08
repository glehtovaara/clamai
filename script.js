const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');  // If needed to display chat

sendBtn.addEventListener('click', async () => {
  console.log('Send button clicked!');  // Log to check if the event is triggered

  const userText = userInput.value.trim();
  if (!userText) {
    console.log('No input provided');
    return;
  }

  // Append user message (for testing)
  appendMessage(userText, 'user');
  userInput.value = '';

  try {
    console.log('Sending message to API: ', userText);

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer xai-sk1tTMEFO17RTBggGjugszZF0qDJKDxKzse6SSDbWJgTeuOZ7HgmzYUgp009CLolzkddz34tGOwjV9b5`,  // Use your API key here
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userText },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.log('API error:', await response.text());  // Log API error
      appendMessage('An error occurred. Please check your API key.', 'bot');
      return;
    }

    const data = await response.json();
    console.log('API Response:', data);  // Log response for debugging
    const botMessage = data.choices[0].message.content;
    appendMessage(botMessage, 'bot');
  } catch (error) {
    console.error('Network Error:', error);
    appendMessage('Unable to connect. Please check your internet or API key.', 'bot');
  }
});

function appendMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
