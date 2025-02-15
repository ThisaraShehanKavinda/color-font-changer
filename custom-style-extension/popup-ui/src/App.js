/* global chrome */
import React, { useEffect, useRef, useState } from "react";

function App() {
  const [bgColor, setBgColor] = useState("#856767FF");
  const [font, setFont] = useState("Arial");

  const [originalBgColor, setOriginalBgColor] = useState(null);
  const [originalFont, setOriginalFont] = useState(null);

  const buttonRef = useRef(null); 
  const colorPickerRef = useRef(null); 

  
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

  
  const resetSettings = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: resetStyle,
          args: [originalBgColor, originalFont],
        });
      }
    });
  };

  
  function resetStyle(originalBg, originalFont) {
 
    document.body.style.backgroundColor = originalBg;
    document.body.style.fontFamily = originalFont;
  }

 
  useEffect(() => {
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const originalBg = window.getComputedStyle(document.body).backgroundColor;
        const originalFont = window.getComputedStyle(document.body).fontFamily;
        setOriginalBgColor(originalBg);
        setOriginalFont(originalFont);
      }
    });
  }, []);

  
  const popupContainerStyle = {
    width: "280px",
    background: "rgba(255, 255, 255, 0.1)", 
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
    color: "#000000", 
  };

  const headerStyle = {
    fontSize: "22px",
    marginBottom: "20px",
    color: "#ff0088", 
    textShadow: "0 0 10px #ff00ff, 0 0 20px #ff00ff",
  };

  const labelStyle = {
    fontSize: "14px",
    margin: "10px 0 5px",
    fontWeight: "500",
    color: "#000000", 
    textShadow: "0 0 5px #ffffff", 
  };

  const colorBoxStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "8px",
    border: "2px solid #fff",
    cursor: "pointer",
    backgroundColor: bgColor, 
    transition: "background-color 0.3s ease",
  };

  const inputSelectStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "2px solid rgba(255, 255, 255, 0.5)",
    borderRadius: "8px",
    background: "rgba(255, 255, 255, 0.3)", 
    color: "#000", 
    fontSize: "16px",
    outline: "none",
    transition: "all 0.3s ease",
  };

  const buttonStyle = {
    background: "#ff0088", 
    color: "#fff",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
    width: "100%",
    textTransform: "uppercase",
    letterSpacing: "2px",
    boxShadow: "0 0 10px #ff00ff",
    outline: "none",
  };

  const buttonHoverStyle = {
    background: "#ff1a8c", 
    boxShadow: "0 0 20px rgba(255, 0, 136, 0.8)",
  };

  const buttonActiveStyle = {
    background: "#ff0055", 
    boxShadow: "0 0 30px rgba(255, 0, 136, 1)",
  };

  const [isButtonHovered, setButtonHovered] = useState(false);
  const [isButtonActive, setButtonActive] = useState(false);

  
  useEffect(() => {
    if (buttonRef.current) {
      const button = buttonRef.current;
      
      if (isButtonHovered) {
        Object.assign(button.style, buttonHoverStyle);
      } else {
        Object.assign(button.style, buttonStyle);
      }

      
      if (isButtonActive) {
        Object.assign(button.style, buttonActiveStyle);
      } else if (!isButtonHovered) {
        Object.assign(button.style, buttonStyle);
      }
    }
  }, [isButtonHovered, isButtonActive]);

  const handleColorChange = (event) => {
    setBgColor(event.target.value);
  };

  return (
    <div style={popupContainerStyle}>
      <h2 style={headerStyle}>Customize Page</h2>

      <label style={labelStyle}>Background Color:</label>
      <div
        style={colorBoxStyle}
        onClick={() => colorPickerRef.current.click()} 
      >
      
      </div>
      <input
        ref={colorPickerRef}
        type="color"
        value={bgColor}
        onChange={handleColorChange}
        style={{ display: "none" }} 
      />

      <label style={labelStyle}>Font:</label>
      <select
        value={font}
        onChange={(e) => setFont(e.target.value)}
        style={inputSelectStyle}
      >
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Courier New">Courier New</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>

      <button
        ref={buttonRef}
        style={buttonStyle}
        onClick={applyChanges}
        onMouseOver={() => setButtonHovered(true)}
        onMouseOut={() => setButtonHovered(false)}
        onMouseDown={() => setButtonActive(true)}
        onMouseUp={() => setButtonActive(false)}
      >
        Apply
      </button>

      <button
        onClick={resetSettings}
        style={{
          ...buttonStyle,
          marginTop: "10px", 
          background: "#444", 
          boxShadow: "0 0 10px rgba(68, 68, 68, 0.7)", 
        }}
        onMouseOver={() => setButtonHovered(true)}
        onMouseOut={() => setButtonHovered(false)}
        onMouseDown={() => setButtonActive(true)}
        onMouseUp={() => setButtonActive(false)}
      >
        Reset to Original
      </button>
    </div>
  );
}

export default App;
