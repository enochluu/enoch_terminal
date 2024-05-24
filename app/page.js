"use client";
import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const inputRef = useRef(null);
  const caretRef = useRef(null);
  const [showCaret, setShowCaret] = useState(false); // Initialize to false

  useEffect(() => {
    inputRef.current.focus();
    setShowCaret(true); // Change to true after mounting
    const intervalId = setInterval(() => {
      setShowCaret((prevShowCaret) => !prevShowCaret); // Toggle the caret visibility
    }, 500); // Adjust the blinking speed (milliseconds)

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const inputRect = inputRef.current.getBoundingClientRect();
    caretRef.current.style.top = `${inputRect.top + inputRect.height - 3}px`; // Position lower
    caretRef.current.style.left = `${inputRect.left + inputRef.current.selectionEnd * 9}px`; // Adjust based on caret position
  }, [input, showCaret]);

  const handleClick = () => {
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const newLine = {
        content: `visitor@enochluu.com:~$ ${input}`,
        style: { color: '#00FF00' }
      };

      // Adding the output based on input
      switch (input) {
        case "whois":
          newLine.content += "\nHi, I'm Enoch. I'm a Computer Science graduate from UNSW Sydney who has a passion for coding.";
          break;
        case "whoami":
          newLine.content += "\nYou are a visitor. Welcome!";
          break;
        case "projects":
          window.open("https://github.com/enochluu?tab=repositories", "_blank");
          newLine.content += "\nOpening Github in a new tab...";
          break;
        case "portfolio":
          window.open("https://personal-portfolio-git-main-enochluus-projects.vercel.app/", "_blank");
          newLine.content += "\nOpening portfolio in a new tab!";
          break;
        case "resume":
          newLine.content += "\nOpening resume in a new tab!";
          break;
        case "help":
          newLine.content += "\nwhois \nwhoami \nprojects \nportfolio \nresume";
          break;
        default:
          newLine.content += `\n${input}: Command not found. For a list of commands, type 'help'.`;
      }

      setOutput(prevOutput => [...prevOutput, newLine]);
      setInput("");
    } else {
      setShowCaret(true); // Show caret when typing
    }
  };
  
  return (
    <div className="min-h-screen p-4" onClick={handleClick} >
      <div className="terminal-output whitespace-pre-wrap" style={{ whiteSpace: 'pre-wrap' }}>
        <div>
        {`
   ___    _  _     ___     ___    _  _                   
  | __|  | \\| |   / _ \\   / __|  | || |                  
  | _|   | .\` |  | (_) | | (__   | __ |                  
  |___|  |_|\\_|   \\___/   \\___|  |_||_|                  
_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|                 
\"\`-0\-0\-'"\`\-0\-0\-'"\`\-0\-0\-'"\`\-0\-0\-'"\`\-0\-0\-'           
   _      _   _   _   _            ___     ___   __  __  
  | |    | | | | | | | |          / __|   / _ \\ |  \\/  | 
  | |__  | |_| | | |_| |    _    | (__   | (_) || |\\/| | 
  |____|  \\___/   \\___/   _(_)_   \\___|   \\___/ |_|__|_| 
_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""| 
\"\`-0-0-'"\`\-0-0-'\"\`-0-0-'\"\`-0-0-'\"\`-0-0-'\"\`-0-0-'\"\`-0-0-' 
          `}
        </div>
        <div>Welcome to my interactive terminal. </div>
        <div>For a list of available commands, type 'help'.</div>
        {output.map((line, index) => (
          <div key={index}>
            <span style={{ color: '#56D64D' }}>visitor@enochluu.com</span>
            <span style={{ color: 'white' }}>:</span>
            <span style={{ color: '#327CFF' }}>~</span>
            <span style={{ color: 'white' }}>$</span>
            <span>&nbsp;{line.content.slice(line.content.indexOf("$") + 2)}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <span style={{ color: '#56D64D' }}>visitor@enochluu.com</span>
        <span style={{ color: 'white' }}>:</span>
        <span style={{ color: '#327CFF' }}>~</span>
        <span style={{ color: 'white' }}>$</span>
        <span>&nbsp;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`bg-transparent border-none outline-none`}
          style={{ padding: '0', caretColor: 'transparent' }} // Hide default caret color
        />
        <div
          ref={caretRef}
          className={`custom-caret ${showCaret ? 'visible' : 'hidden'}`} // Toggle caret visibility class
          style={{
            width: '0.7em',
            height: '0.3em',
            background: 'white',
            position: 'absolute',
            pointerEvents: 'none', // Ensure caret doesn't interfere with input events
          }}
        />
      </div>
    </div>
  );
}

export default App;
