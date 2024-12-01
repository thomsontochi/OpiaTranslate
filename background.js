// Add a listener for incoming messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'translateText') {
    const { text, targetLanguage } = request;

    // Use the Chrome Translator API to process the request
    chrome.ai.translator.translate(
      {
        text: text,
        targetLanguage: targetLanguage,
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error('Translation error:', chrome.runtime.lastError);
          sendResponse({ error: chrome.runtime.lastError.message });
        } else {
          sendResponse({ translation: response.text });
        }
      }
    );

    // Indicate that the response is asynchronous
    return true;
  }
});
