document.addEventListener("DOMContentLoaded", () => {
  const phraseInput = document.getElementById("phraseInput");
  const addPhraseButton = document.getElementById("addPhrase");
  const phraseList = document.getElementById("phraseList");

  // Load saved phrases
  const loadPhrases = () => {
    chrome.storage.sync.get("filterPhrases", (data) => {
      const phrases = data.filterPhrases || [];
      phraseList.innerHTML = ""; // Clear current list
      phrases.forEach(addPhraseToUI);
    });
  };

  // Add a new phrase to Chrome storage and UI
  addPhraseButton.addEventListener("click", () => {
    const phrase = phraseInput.value.trim();
    if (phrase) {
      chrome.storage.sync.get("filterPhrases", (data) => {
        const phrases = data.filterPhrases || [];
        if (!phrases.includes(phrase)) {
          phrases.push(phrase);
          chrome.storage.sync.set({ filterPhrases: phrases }, loadPhrases);
          phraseInput.value = "";
        }
      });
    }
  });

  // Add a phrase to the UI
  const addPhraseToUI = (phrase) => {
    const li = document.createElement("li");
    li.textContent = phrase;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove";
    removeButton.addEventListener("click", () => {
      chrome.storage.sync.get("filterPhrases", (data) => {
        const phrases = data.filterPhrases || [];
        const updatedPhrases = phrases.filter((p) => p !== phrase);
        chrome.storage.sync.set({ filterPhrases: updatedPhrases }, loadPhrases);
      });
    });

    li.appendChild(removeButton);
    phraseList.appendChild(li);
  };

  // Load phrases on page load
  loadPhrases();
});
