"use client";
import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const inputRef = useRef(null);
  const caretRef = useRef(null);
  const outputContainerRef = useRef(null); // Ref for the output container
  const [showCaret, setShowCaret] = useState(false); // Initialize to false
  const prompt = "visitor@enochluu.com:~$";
  const [currentPath, setCurrentPath] = useState("~");

  const fileStructure = {
    "~": ["skills"],
    "~/skills": ["programming", "web development", "cloud technologies"],
    "~/skills/programming": ["python", "java"],
    "~/skills/web development": ["React"],
    "~/skills/cloud technologies": ["Azure"],
  };

  useEffect(() => {
    inputRef.current.focus();
    setShowCaret(true); // Change to true after mounting
    const intervalId = setInterval(() => {
      setShowCaret((prevShowCaret) => !prevShowCaret); // Toggle the caret visibility
    }, 500); // Adjust the blinking speed (milliseconds)

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const outputContainer = outputContainerRef.current;
    outputContainer.scrollTop = outputContainer.scrollHeight; // Scroll to the bottom

    const updateCaretPosition = () => {
      const inputEle = inputRef.current;
      const caretEle = caretRef.current;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
    
      const inputStyles = window.getComputedStyle(inputEle);
      const font = `${inputStyles.getPropertyValue('font-size')} ${inputStyles.getPropertyValue('font-family')}`;    
      const measureWidth = (text, font) => {
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
      };
    
      // Measure the width of the prompt (fixed part)
      const promptWidth = measureWidth(prompt, font);
    
      // Measure the width of the current path
      const pathWidth = measureWidth(currentPath, font);
    
      // Calculate the total width before the input text
      const totalWidthBeforeInput = promptWidth + pathWidth;
    
      // Measure the width of the text the user has typed so far
      const inputTextWidth = measureWidth(inputEle.value, font);
    
      // Position the caret after the current path and before the user input text
      const caretPosition = totalWidthBeforeInput + inputTextWidth;
    
      // Set the caret's transform style to position it correctly
      caretEle.style.transform = `translate(${caretPosition}px, -50%)`;
    };
    
    updateCaretPosition(); // Update on initial mount
    document.addEventListener('selectionchange', updateCaretPosition);
    
    return () => document.removeEventListener('selectionchange', updateCaretPosition);
    }, [input, currentPath]); // Re-run when input or currentPath changes
    

  const handleClick = () => {
    inputRef.current.focus();
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Split input on spaces, but handle quoted text as a single argument
      const args = input.match(/"([^"]+)"|\S+/g) || [];  // This will split on spaces but keep quoted arguments together
      const command = args[0];
      const argument = args[1] ? args[1].replace(/"/g, '') : ""; // Remove quotes if present
  
      const newLine = {
        content: `${prompt}${input}`,
        style: { color: '#00FF00' },
        contentArray: [], // Content array for output (e.g., help text)
        directory: currentPath, // Store current directory for this command
      };
  
      // Handle the command logic
      switch (command) {
        case "cd":
          if (argument === "..") {
            if (currentPath !== "~") {
              const parentPath = currentPath.substring(0, currentPath.lastIndexOf("/")) || "~";
              setCurrentPath(parentPath);
            } else {
              newLine.contentArray.push(`Directory not found: ${argument}`);
            }
          } else if (fileStructure[currentPath + "/" + argument]) {
            setCurrentPath(currentPath + "/" + argument); // Update the current path for the next line
          } else {
            newLine.contentArray.push(`Directory not found: ${argument}`);
          }
          break;
        case "dir":
          newLine.contentArray.push(...(fileStructure[currentPath] || []));
          break;
        case "whois":
          newLine.contentArray.push(
            "Hi, I'm Enoch. I'm a Computer Science graduate from UNSW Sydney who has a passion for coding."
          );
          break;
        case "whoami":
          newLine.contentArray.push("You are a visitor. Welcome!");
          break;
        case "help":
          newLine.contentArray.push(
            <div key="help-commands" className="help-commands">
              <div className="help-command">whois</div>
              <div className="help-description">Who is Enoch?</div>
              <div className="help-command">whoami</div>
              <div className="help-description">Who are you?</div>
              <div className="help-command">help</div>
              <div className="help-description">For the list of available commands... again??</div>
              <div className="help-command">portfolio</div>
              <div className="help-description">Check out my portfolio website!</div>
              <div className="help-command">resume</div>
              <div className="help-description">Have a look at my resume.</div>
              <div className="help-command">contact</div>
              <div className="help-description">Contact me!</div>
              <div className="help-command">advanced</div>
              <div classname="help-description">Advanced options to see my skills</div>
            </div>
          );
          break;
        case "portfolio":
          window.open("https://enoch-portfolio.vercel.app/", "_blank");
          newLine.contentArray.push("Opening portfolio in a new tab!");
          break;
        case "resume":
          window.open("/Resume.pdf", "_blank");
          newLine.contentArray.push("Opening resume in a new tab!");
          break;
        case "contact":
          newLine.contentArray.push(
            <div key="contact-info" className="contact-info">
              <div className="contact-method">email</div>
              <div className="contact-description">Send me an email.</div>
              <div className="contact-method">linkedin</div>
              <div className="contact-description">Connect with me!</div>
            </div>
          );
          break;
        case "email":
          window.location.href = "mailto:enochluu9@gmail.com";
          newLine.contentArray.push("Opening default email client!");
          break;
        case "linkedin":
          window.open("https://www.linkedin.com/in/enochluu/", "_blank");
          newLine.contentArray.push("Opening my LinkedIn profile in a new tab!");
          break;
        case "advanced":
          newLine.contentArray.push(
            <div key="advanced-info" className="advanced-info">
              <div className="advanced-command">dir</div>
              <div className="dir-description">directory</div>
              <div className="advanced-command">cd</div>
              <div className="cd-description">change directory</div>
            </div>
          );
          break;
        default:
          newLine.contentArray.push(`${input}: Command not found. For a list of commands, type 'help'.`);
      }
  
      setOutput((prevOutput) => [...prevOutput, newLine]); // Add the output line with the directory
      setInput("");
    } else {
      setShowCaret(true); // Show caret when typing
    }
  };
  
  return (
    <div>
      <div className="min-h-screen p-4" onClick={handleClick}>
        <div
          ref={outputContainerRef} // Assign the ref to the output container
          className="terminal-output"
          style={{
            whiteSpace: 'pre-wrap',
            maxHeight: 'calc(100vh - 70px)',
            overflowY: 'auto',
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
            msOverflowStyle: 'none' // Hide scrollbar for IE/Edge
          }}
        >
          <div className="ascii-art">
            <pre style={{ display: 'inline-block' }}>
            {`
   ___    _  _     ___     ___    _  _                   
  | __|  | \\| |   / _ \\   / __|  | || |                  
  | _|   | .\` |  | (_) | | (__   | __ |                  
  |___|  |_|\\_|   \\___/   \\___|  |_||_|                  
_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|                 
"\`-0\-0\-'"\`\-0\-0\-'"\`\-0\-0\-'"\`\-0\-0\-'"\`\-0\-0\-'            
   _      _   _   _   _            ___     ___   __  __  
  | |    | | | | | | | |          / __|   / _ \\ |  \\/  | 
  | |__  | |_| | | |_| |    _    | (__   | (_) || |\\/| | 
  |____|  \\___/   \\___/   _(_)_   \\___|   \\___/ |_|__|_| 
_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""| 
"\`-0-0-'"\`\-0-0-'"\`-0-0-'"\`-0-0-'"\`-0\-0-'"\`-0\-0-'"\`-0-0-' 
            `}
            </pre>
          </div>
          <div>Welcome to my interactive web terminal.</div>
          <div>For a list of available commands, type 'help'.</div>
          {output.map((line, index) => (
            <div key={index}>
              <span style={{ color: '#56D64D' }}>visitor@enochluu.com</span>
              <span style={{ color: 'white' }}>:</span>
              {/* Use the stored directory for each line */}
              <span style={{ color: '#327CFF' }}>{line.directory}</span>
              <span style={{ color: 'white' }}>$</span>
              <span> {line.content.slice(prompt.length)}</span>
              {line.contentArray.map((content, idx) => (
                <div key={idx}>{content}</div>
              ))}
            </div>
          ))}
          <div className="flex" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#56D64D' }}>visitor@enochluu.com</span>
            <span style={{ color: 'white' }}>:</span>
            {/* Display the currentPath as the directory in the input prompt */}
            <span style={{ color: '#327CFF' }}>{currentPath}</span>
            <span style={{ color: 'white' }}>$</span>
            <span>&nbsp;</span>
            <label htmlFor="commandInput" className="sr-only">Command Input:</label>
            <input
              id="commandInput"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`bg-transparent border-none outline-none`}
              style={{
                padding: '0',
                caretColor: 'transparent',
                position: 'relative',
                zIndex: 1,
                width: 'auto', // Make sure the input doesn't stretch
              }}
            />
            <div
              ref={caretRef}
              className={`custom-caret ${showCaret ? 'visible' : 'hidden'}`}
              style={{
                width: '0.6em',
                height: '0.3em',
                background: 'white',
                position: 'absolute',
                pointerEvents: 'none',
                bottom: '-0.05em',
                transition: 'opacity 0.2s ease-in-out',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
