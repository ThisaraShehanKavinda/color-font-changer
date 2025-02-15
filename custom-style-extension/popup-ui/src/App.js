/* global chrome */
import React, { useState } from "react";

function App() {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [font, setFont] = useState("Arial");

  const applyChanges = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: changeStyle,
          args: [bgColor, font],
        });
      }
    });
  };

  function changeStyle(color, font) {
    document.body.style.backgroundColor = color;
    document.body.style.fontFamily = font;
  }

  return (
    <div style={{ padding: "10px", width: "220px" }}>
      <h2>Customize Page</h2>

      <label>Background Color:</label>
      <input
        type="color"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
      />

      <label>Font:</label>
      <select value={font} onChange={(e) => setFont(e.target.value)}>
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Courier New">Courier New</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>

      <button onClick={applyChanges}>Apply</button>
    </div>
  );
}

export default App;
