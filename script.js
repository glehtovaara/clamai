
  
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
    console.log('Sending message to OpenAI API: ', userText);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`,  // Replace with your OpenAI API key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',  // OpenAI model
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

