function sendMessage() {
  var userInput = document.getElementById('user-input').value;
  if (userInput !== '') {
    appendMessage(userInput, true);
    document.getElementById('user-input').value = '';
    generateResponse(userInput);
  }
}

function appendMessage(message, isUser) {
  var chatBox = document.getElementById('chat-box');
  var messageElement = document.createElement('div');
  messageElement.classList.add('message');
  if (isUser) {
    messageElement.classList.add('user-message');
    messageElement.innerHTML = `<img src="img-002.jpg" class="avatar"> ${message}`;
  } else {
    messageElement.classList.add('bot-message');
    messageElement.innerHTML = `<img src="img-001.jpg" class="avatar"> ${message}`;
  }
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateResponse(userInput) {
  var response;
  userInput = userInput.toLowerCase();

  if (userInput.includes('hello') || userInput.includes('hi')) {
    response = "Hello! How can I assist you?";
    appendMessage(response, false);
  } else if (userInput.includes('how are you')) {
    response = "I'm just a bot, but thanks for asking!";
    appendMessage(response, false);
  } else if (userInput.includes('bye')) {
    response = "Goodbye! Have a great day!";
    appendMessage(response, false);
  } else {
    // Generate response based on user input
    response = generateCustomResponse(userInput);

    if (!response) {
      // If unable to generate response, search the web for additional information
      searchWeb(userInput);
    } else {
      // Display the generated response
      appendMessage(response, false);
    }
  }

  return response;
}

function generateCustomResponse(userInput) {
  // Implement custom logic to generate response based on user input
  // For example, check for specific keywords or patterns in the user input
  // and return an appropriate response
  var customResponses = {
    'food': "I love food too!",
    'weather': "It's a beautiful day outside!",
    // Add more custom responses as needed
  };

  for (var keyword in customResponses) {
    if (userInput.includes(keyword)) {
      return customResponses[keyword];
    }
  }

  return null; // Return null if no custom response is generated
}

function searchWeb(query) {
  // Search the web for additional information using Axios
  axios.get('https://www.example.com/search?q=' + encodeURIComponent(query))
    .then(function(response) {
      // Parse the HTML response to extract relevant information
      var parser = new DOMParser();
      var htmlDoc = parser.parseFromString(response.data, 'text/html');
      var searchResult = htmlDoc.querySelector('.search-result');

      if (searchResult) {
        appendMessage("Here's some information I found: " + searchResult.innerText, false);
      } else {
        appendMessage("I couldn't find information about that.", false);
      }
    })
    .catch(function(error) {
      console.error('Error fetching search results:', error);
      appendMessage("Oops! Something went wrong while searching. Please try again later.", false);
    });
}