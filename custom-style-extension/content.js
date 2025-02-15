chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "changeStyle") {
      document.body.style.backgroundColor = request.color;
      document.body.style.fontFamily = request.font;
    }
  });
  