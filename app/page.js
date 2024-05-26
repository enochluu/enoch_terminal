"use client";
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

const App = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const inputRef = useRef(null);
  const caretRef = useRef(null);
  const outputContainerRef = useRef(null); // Ref for the output container
  const [showCaret, setShowCaret] = useState(false); // Initialize to false
  const prompt = "visitor@enochluu.com:~$ ";

  useEffect(() => {
    inputRef.current.focus();
    setShowCaret(true); // Change to true after mounting
    const intervalId = setInterval(() => {
      setShowCaret((prevShowCaret) => !prevShowCaret); // Toggle the caret visibility
    }, 500); // Adjust the blinking speed (milliseconds)

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const updateCaretPosition = () => {
      const inputEle = inputRef.current;
      const caretEle = caretRef.current;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      const inputStyles = window.getComputedStyle(inputEle);
      const font = `${inputStyles.getPropertyValue('font-size')} ${inputStyles.getPropertyValue('font-family')}`;
      const paddingLeft = parseInt(inputStyles.getPropertyValue('padding-left'), 10);

      const measureWidth = (text, font) => {
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
      };

      const promptWidth = measureWidth(prompt, font);

      const updatePosition = (position) => {
        const text = inputEle.value.substr(0, position);
        const textWidth = measureWidth(text, font) + paddingLeft + promptWidth;
        caretEle.style.transform = `translate(${textWidth}px, -50%)`;
      };

      updatePosition(inputEle.selectionStart);
    };

    updateCaretPosition(); // Update on initial mount
    document.addEventListener('selectionchange', updateCaretPosition);

    return () => document.removeEventListener('selectionchange', updateCaretPosition);
  }, [input]);

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
      const paddingLeft = parseInt(inputStyles.getPropertyValue('padding-left'), 10);

      const measureWidth = (text, font) => {
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
      };

      const promptWidth = measureWidth(prompt, font);

      const updatePosition = (position) => {
        const text = inputEle.value.substr(0, position);
        const textWidth = measureWidth(text, font) + paddingLeft + promptWidth;
        caretEle.style.transform = `translate(${textWidth}px, -50%)`;
      };

      updatePosition(inputEle.selectionStart);
    };

    updateCaretPosition(); // Update on initial mount
    document.addEventListener('selectionchange', updateCaretPosition);

    return () => document.removeEventListener('selectionchange', updateCaretPosition);
  }, [input, output]);

  const handleClick = () => {
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const newLine = {
        content: `${prompt}${input}`,
        style: { color: '#00FF00' }
      };

      // Adding the output based on input
      switch (input) {
        case "whois":
          newLine.content += "\nHi, I'm Enoch. I'm a Computer Science graduate from UNSW Sydney who has a passion for coding.";
          break;
        case "portfolio":
          window.open("https://personal-portfolio-git-main-enochluus-projects.vercel.app/", "_blank");
          newLine.content += "\nOpening portfolio in a new tab!";
          break;
        case "resume":
          window.open("/Resume_EnochLuu.pdf", "_blank");
          newLine.content += "\nOpening resume in a new tab!";
          break;
        case "contact":
          newLine.content += `
    email                 enochluu9@gmail.com
    linkedin              https://www.linkedin.com/in/enochluu/`;
          break;
        case "email":
          window.location.href = "mailto:enochluu9@gmail.com";
          newLine.content += "\nOpening default email client!";
          break;
        case "linkedin":
          window.open("https://www.linkedin.com/in/enochluu/", "_blank");
          newLine.content += "\nOpening my LinkedIn profile in a new tab!";
          break;
        case "help":
          newLine.content += `
    whois                 Who is Enoch?              
    portfolio             Check out my portfolio website!
    resume                Have a look at my resume.
    contact               Contact me!`;
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
    <div>
    <Head>
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </Head>
    <div className="min-h-screen p-4" onClick={handleClick}>
      <div
        ref={outputContainerRef} // Assign the ref to the output container
        className="terminal-output whitespace-pre-wrap"
        style={{
          whiteSpace: 'pre-wrap',
          maxHeight: 'calc(100vh - 70px)',
          overflowY: 'auto',
          scrollbarWidth: 'none', // Hide scrollbar for Firefox
          msOverflowStyle: 'none' // Hide scrollbar for IE/Edge
        }}
      >
        <div>
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
"\`-0-0-'"\`\-0-0-'"\`-0-0-'"\`-0-0-'"\`-0-0-'"\`-0-0-'"\`-0-0-' 
          `}
        </div>
        <div>Welcome to my interactive web terminal.</div>
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
        <div className="flex" style={{ position: 'relative' }}>
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
          style={{ padding: '0', caretColor: 'transparent', position: 'relative', zIndex: 1 }} // Hide default caret color and adjust z-index
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