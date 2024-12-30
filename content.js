// Function to remove suggestions
const removeSuggestions = () => {
  console.log("Script is running...");

  // Load blocked phrases from Chrome storage
  chrome.storage.sync.get("filterPhrases", (data) => {
    const blockedPhrases = data.filterPhrases || [];
    if (blockedPhrases.length === 0) {
      console.log("No blocked phrases found.");
      return;
    }

    // Select all video titles
    const titles = document.querySelectorAll(
      'yt-formatted-string#video-title.style-scope.ytd-rich-grid-media'
    );

    console.log(`Found ${titles.length} video titles.`);

    titles.forEach((title) => {
      const text = title.textContent.toLowerCase();

      // Check if the title contains any blocked phrase
      if (blockedPhrases.some((phrase) => text.includes(phrase.toLowerCase()))) {
        console.log(`Removing video: ${title.textContent}`); // Print removed title
        const videoCard = title.closest("ytd-rich-item-renderer");
        if (videoCard) {
          videoCard.style.display = "none";
        }
      }
    });
  });
};

// Run the function initially and every few seconds (to handle dynamic loading)
removeSuggestions();
setInterval(removeSuggestions, 3000);
