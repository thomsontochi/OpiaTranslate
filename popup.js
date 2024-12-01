// popup.js
document.getElementById('translateBtn').addEventListener('click', async () => {
  const text = document.getElementById('inputText').value;
  const targetLang = document.getElementById('targetLang').value;
  const resultDiv = document.getElementById('result');
  const translateBtn = document.getElementById('translateBtn');
  
  if (!text) {
    resultDiv.textContent = 'Please enter text to translate';
    return;
  }

  try {
    // First check if the API is supported
    if (!('translation' in self && 'createTranslator' in self.translation)) {
      throw new Error('Translation API is not supported in this browser');
    }

    // Check if translation is possible
    const canTranslateResult = await translation.canTranslate({
      sourceLanguage: 'en',
      targetLanguage: targetLang
    });

    if (canTranslateResult === 'no') {
      throw new Error('Translation not possible for this language pair');
    }

    // If language pack needs to be downloaded
    if (canTranslateResult === 'after-download') {
      translateBtn.textContent = 'Downloading language pack...';
      translateBtn.disabled = true;
    }

    // Create translator
    const translator = await self.translation.createTranslator({
      sourceLanguage: 'en',
      targetLanguage: targetLang
    });

    // Add download progress listener
    translator.ondownloadprogress = (progressEvent) => {
      const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
      translateBtn.textContent = `Downloading... ${progress}%`;
    };

    // Perform translation
    const translatedText = await translator.translate(text);
    resultDiv.textContent = translatedText;

    // Reset button
    translateBtn.textContent = 'Translate';
    translateBtn.disabled = false;

  } catch (error) {
    console.error(error);
    resultDiv.textContent = 'Error: ' + error.message;
    translateBtn.textContent = 'Translate';
    translateBtn.disabled = false;
  }
});