let intervalId;

const removeSuggestions = () => {
  try {
    chrome.storage.sync.get("filterPhrases", (data) => {
      const blockedPhrases = data?.filterPhrases || [];
      if (blockedPhrases.length === 0) return;

      const titles = document.querySelectorAll(
        'yt-formatted-string#video-title.style-scope.ytd-rich-grid-media, a.yt-lockup-metadata-view-model-wiz__title span'
      );

      titles.forEach((title) => {
        const text = title.textContent?.toLowerCase() || "";
        if (blockedPhrases.some((phrase) => text.includes(phrase.toLowerCase()))) {
          let videoCard =
            title.closest("ytd-rich-item-renderer") ||
            title.closest(".yt-lockup-view-model-wiz");
          if (videoCard) videoCard.style.display = "none";
        }
      });
    });
  } catch (e) {
    console.warn("removeSuggestions error:", e);
    clearInterval(intervalId);
  }
};

removeSuggestions();
intervalId = setInterval(removeSuggestions, 3000);

window.addEventListener("beforeunload", () => clearInterval(intervalId));
