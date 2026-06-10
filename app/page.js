"use client";
import React, { useState, useEffect, useRef } from 'react';
import QRCode from "react-qr-code";

const App = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const inputRef = useRef(null);
  const caretRef = useRef(null);
  const outputContainerRef = useRef(null); // Ref for the output container
  const [showCaret, setShowCaret] = useState(false); // Initialize to false
  const prompt = "visitor@enochluu.com:~$";
  const [currentPath, setCurrentPath] = useState("~");

  const tabMatchesRef = useRef([]);
  const tabIndexRef = useRef(0);
  const tabPrefixRef = useRef("");
  const lastPartialRef = useRef("");

  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const fileStructure = {
    "~": ["experience", "projects", "skills"],

    // Skills
    "~/skills": ["cloud", "development", "security", "systems"],

    "~/skills/cloud": [
      "Defender.txt",
      "EntraID.txt",
      "Exchange.txt",
      "Intune.txt",
      "Microsoft365.txt",
      "Purview.txt"
    ],
    "~/skills/development": [
      "Bash.txt",
      "Java.txt",
      "JavaScript.txt",
      "PowerShell.txt",
      "Python.txt",
      "WebFrontend.txt"
    ],
    "~/skills/security": [
      "IncidentResponse.txt",
      "ISO27001.txt",
      "SecurityUplift.txt",
      "Threats.txt",
      "VulnerabilityManagement.txt"
    ],

    "~/skills/systems": [
      "ActiveDirectory.txt",
      "Backups.txt",
      "Firewalls.txt",
      "Git.txt",
      "Networking.txt",
      "RDS.txt",
      "Virtualisation.txt",
      "WindowsServer.txt"
    ],

    // Experience
    "~/experience": ["CyberSecurity_Tech.txt", "ManagedServices_Tech.txt"],

    // Projects
    "~/projects": ["CrowdWeave.txt", "DIMYProtocol.txt", "KB_AI_Assistant.txt", "TripCollab.txt", "TerminalPortfolio.txt"]

  };

  const fileContents = {
    // Development
    "~/skills/development/Python.txt": [
      "Python used for automation, scripting, backend tooling, and security-related utilities."
    ],

    "~/skills/development/Java.txt": [
      "Java experience from academic and project-based software development."
    ],

    "~/skills/development/Bash.txt": [
      "Shell scripting for Linux and Windows environments for automation and system tasks."
    ],

    "~/skills/development/JavaScript.txt": [
      "JavaScript used for frontend development and interactive web applications."
    ],

    "~/skills/development/WebFrontend.txt": [
      "Frontend development using HTML, CSS, and React for building responsive and interactive user interfaces."
    ],

    "~/skills/development/PowerShell.txt": [
      "Automation scripting for Windows environments including system administration, user management, and remediation workflows such as failover and recovery scripts."
    ],


    // Cloud
    "~/skills/cloud/EntraID.txt": [
      "Identity and access management including users, groups, roles, authentication policies, and Conditional Access in Entra ID."
    ],

    "~/skills/cloud/Microsoft365.txt": [
      "Administration of Microsoft 365 services including Teams, SharePoint, Exchange Online, and endpoint configuration."
    ],

    "~/skills/cloud/Exchange.txt": [
      "Email system administration including mail flow troubleshooting, mailbox management, and filtering policies."
    ],

    "~/skills/cloud/Intune.txt": [
      "Endpoint management including device compliance, configuration profiles, application deployment, and policy enforcement."
    ],

    "~/skills/cloud/Defender.txt": [
      "Security operations using Microsoft Defender across endpoints, identity, and cloud workloads including alert investigation and response."
    ],

    "~/skills/cloud/Purview.txt": [
      "Data governance and compliance including sensitivity labels, data loss prevention, and information protection policies."
    ],

    // Systems
    "~/skills/systems/Virtualisation.txt": [
      "VMware and Hyper-V virtualisation including VM provisioning, management, performance troubleshooting, and infrastructure support."
    ],

    "~/skills/systems/WindowsServer.txt": [
      "Administration of Windows Server environments including services, Active Directory integration, and system troubleshooting."
    ],

    "~/skills/systems/Backups.txt": [
      "Backup and disaster recovery administration using platforms such as Datto and Acronis including BCDR operations."
    ],

    "~/skills/systems/Networking.txt": [
      "Networking fundamentals including DNS, DHCP, routing, VPNs, and connectivity troubleshooting."
    ],

    "~/skills/systems/Firewalls.txt": [
      "Firewall rule management, NAT configuration, and network traffic troubleshooting in enterprise environments."
    ],

    "~/skills/systems/Git.txt": [
      "Version control using Git for collaboration, branching, and repository management."
    ],

    "~/skills/systems/ActiveDirectory.txt": [
      "On-prem Active Directory administration including user, group, policy, and access management."
    ],

    "~/skills/systems/RDS.txt": [
      "Remote Desktop Services administration including session host management, user access, and troubleshooting."
    ],

    // Security
    "~/skills/security/IncidentResponse.txt": [
      "Security incident triage, investigation, containment, and remediation in enterprise environments."
    ],

    "~/skills/security/Threats.txt": [
      "Threat monitoring including phishing analysis, security alert triage, and investigation of suspicious activity."
    ],

    "~/skills/security/VulnerabilityManagement.txt": [
      "Identification, assessment, and remediation of system and application vulnerabilities."
    ],

    "~/skills/security/ISO27001.txt": [
      "ISO 27001 aligned security practices including risk management and support for compliance controls."
    ],

    "~/skills/security/SecurityUplift.txt": [
      "Security posture improvement initiatives including hardening, policy improvements, and configuration enhancements."
    ],

    // Experience
    "~/experience/ManagedServices_Tech.txt": [
      "- Backup monitoring, remediation, troubleshooting, and BCDR operations.",
      "- Incident response support for network, server, and virtualised infrastructure issues.",
    ],
    "~/experience/CyberSecurity_Tech.txt": [
      "- Security consultation and uplift including Microsoft 365 hardening, IR planning and ISO 27001 support.",
      "- Vulnerability management, threat monitoring, and risk remediation.",
      "- Incident response support covering threat investigation, triage, and containment."
    ],

    // Projects
    "~/projects/CrowdWeave.txt": [
      "COVID-era safety scoring platform using Google Places API and NSW Health data. Built risk assessment logic to generate real-time location safety scores, with production-style deployment using NGINX and Jenkins."
    ],

    "~/projects/DIMYProtocol.txt": [
      "Network security and cryptography simulation exploring secure communication protocols and attack vectors. Implemented SHA-256 hashing, Diffie-Hellman key exchange, and Shamir Secret Sharing, alongside simulations of relay attacks, packet manipulation, and denial-of-service scenarios to evaluate protocol resilience."
    ],

    "~/projects/KB_AI_Assistant.txt": [
      "Retrieval-Augmented Generation (RAG) knowledge base assistant using Sentence Transformers for embeddings, FAISS for vector similarity search, and cross-encoder reranking for improved relevance."
    ],

    "~/projects/TripCollab.txt": [
      "Collaborative trip planning platform built with NextJS, Flask, PostgreSQL and Redis. Implemented backend APIs for group coordination, with caching and data persistence for scalable shared itineraries."
    ],

    "~/projects/TerminalPortfolio.txt": [
      "Interactive terminal-themed portfolio website supporting navigation, file viewing and custom commands. If you're reading this, the website is still running. That's a good sign."
    ]
  };

  const certificationSummaries = {
    "CrowdWeave.txt":
      "Real-time COVID safety scoring system using external health and location data APIs."
    };

  const experienceSummaries = {
    "CyberSecurity_Tech.txt":
      "Security operations including incident response, vulnerability management, and threat investigation",
    "ManagedServices_Tech.txt":
      "Infrastructure, server and VM support including backups, monitoring, and enterprise incident response"
    };

  const projectSummaries = {
    "CrowdWeave.txt":
      "Real-time COVID safety scoring system using external health and location data APIs.",

    "DIMYProtocol.txt":
      "Network security and cryptography simulation exploring secure communication and attack vectors.",

    "KB_AI_Assistant.txt":
      "AI-powered knowledge base assistant with semantic search, document retrieval, and source-cited answers.",

    "TripCollab.txt":
      "Group travel planning platform with Flask, PostgreSQL and Redis backend services.",

    "TerminalPortfolio.txt":
      "Interactive command-line portfolio website with virtual file system and custom command parser."
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
    
    // Wait for fonts to load before first caret update
    document.fonts.ready.then(() => {
      updateCaretPosition();
    });

    // updateCaretPosition(); // Update on initial mount
    document.addEventListener('selectionchange', updateCaretPosition);
    
    return () => document.removeEventListener('selectionchange', updateCaretPosition);
    }, [input, currentPath]); // Re-run when input or currentPath changes
    

  const handleClick = () => {
    inputRef.current.focus();
  };

  const resolvePath = (basePath, relativePath) => {
    if (!relativePath) return basePath;

    let fullPath;

    if (relativePath.startsWith("~")) {
      fullPath = relativePath;
    } else {
      fullPath =
        basePath === "~"
          ? `~/${relativePath}`
          : `${basePath}/${relativePath}`;
    }

    const parts = fullPath.split("/");

    const stack = [];

    for (let part of parts) {
      if (part === "~") {
        stack.length = 0;
        stack.push("~");
      } else if (part === "..") {
        if (stack.length > 1) stack.pop();
      } else if (part !== "." && part !== "") {
        stack.push(part);
      }
    }

    return stack.join("/");
  };

  const handleKeyDown = (e) => {

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? "" : commandHistory[newIndex]);
    } else if (e.key === "Enter") {
      // your existing Enter logic, then add:
      setCommandHistory(prev => [input, ...prev].slice(0, 50));
      setHistoryIndex(-1);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setOutput([]);
      setInput("");
      return;
    } else if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      setOutput(prev => [...prev, { 
        type: "command", 
        content: `${prompt}${input}^C`,
        contentArray: [],
        directory: currentPath 
      }]);
      setInput("");
      return;
    } else if (e.key === "u" && e.ctrlKey) {
      e.preventDefault();
      setInput("");
      return;
    }
    
    const isCharacterKey = e.key.length === 1;
    const isEditingKey = e.key === "Backspace" || e.key === "Delete";

    if (isCharacterKey || isEditingKey) {
      tabMatchesRef.current = [];
      tabIndexRef.current = 0;
      tabPrefixRef.current = "";
    }

  if (e.key === "Tab") {
  e.preventDefault();

  const args = input.trim().split(" ");
  const command = args[0];
  const argument = args[1] || "";

  if (!["cd", "cat"].includes(command)) return;

  let basePath = currentPath;
  let partial = argument;

  // Handle nested paths like skills/ or skills/da
  if (argument.includes("/")) {
    const lastSlashIndex = argument.lastIndexOf("/");
    const beforeSlash = argument.substring(0, lastSlashIndex);
    partial = argument.substring(lastSlashIndex + 1);

    basePath =
      currentPath === "~"
        ? `~/${beforeSlash}`
        : `${currentPath}/${beforeSlash}`;
  }

  let entries = fileStructure[basePath] || [];

  // Filter directories for cd, files for cat
  if (command === "cd") {
    entries = entries.filter(item => fileStructure[`${basePath}/${item}`]);
  } else if (command === "cat") {
    // For cat: allow both directories (for path navigation) and files
    entries = fileStructure[basePath] || [];
  }

  // FIRST TAB PRESS
  if (tabMatchesRef.current.length === 0) {
    const matches = entries.filter(item => item.startsWith(partial));
    if (matches.length === 0) return;

    tabMatchesRef.current = matches;
    tabIndexRef.current = 0;
    tabPrefixRef.current = partial;
  } else {
    // CYCLE
    tabIndexRef.current =
      (tabIndexRef.current + 1) % tabMatchesRef.current.length;
  }

  const match = tabMatchesRef.current[tabIndexRef.current];

  // rebuild full argument correctly
  let newArgument;

  if (argument.includes("/")) {
    const beforeSlash = argument.substring(0, argument.lastIndexOf("/") + 1);
    newArgument = beforeSlash + match;
  } else {
    newArgument = match;
  }

  setInput(`${command} ${newArgument}`);
}

    if (e.key === "Enter") {
      // Split input into command and arguments, ensuring that quotes are handled for spaces
      const args = input.match(/"([^"]+)"|\S+/g) || [];
      const command = args[0];
      const argument = args.slice(1).join(" ").replace(/^"(.*)"$/, '$1'); // Remove surrounding quotes if any
      const newLine = {
        content: `${prompt}${input}`,
        style: { color: '#00FF00' },
        contentArray: [],
        directory: currentPath,
      };

      switch (command) {
        case "cd":
          if (!argument) {
            setCurrentPath("~");
            break;
          }

          const resolvedCdPath = resolvePath(currentPath, argument);

          if (fileStructure[resolvedCdPath]) {
            setCurrentPath(resolvedCdPath);
          } else {
            newLine.contentArray.push(`Directory not found: ${argument}`);

            if (currentPath !== "~") {
              newLine.contentArray.push("Hint: Try 'dir' or 'ls' to see a valid directory or 'cd ..' to go back.");
            } else {
              newLine.contentArray.push("Hint: Try 'dir' or 'ls' to see a valid directory.");
            }
          }

          break;
        case "dir":
        case "ls": {
          const summaries =
            currentPath === "~/projects"
              ? projectSummaries
              : currentPath === "~/experience"
              ? experienceSummaries
              : currentPath === "~/certifications"
              ? certificationSummaries
              : null;

          newLine.contentArray.push(
            <div
              key={`ls-${currentPath}`}
              style={{
                display: "flex",
                flexDirection: summaries ? "column" : "row",
                flexWrap: summaries ? "nowrap" : "wrap",
                gap: summaries ? "10px" : "0px",
                whiteSpace: "pre-wrap",
                width: "100%"
              }}
            >
              {fileStructure[currentPath].map((item, idx) => {
                const filePath = `${currentPath}/${item}`;
                const excerpt = summaries?.[item] || "";
                const isNavigable = fileStructure[filePath];

                return summaries ? (
                  <div key={idx}>
                    <div>{item}</div>
                    {excerpt && (
                      <div style={{ marginLeft: "16px", opacity: 0.75 }}>
                        {excerpt}
                      </div>
                    )}
                  </div>
                ) : (
                  <span
                    key={idx}
                    style={{
                      display: "inline-block",
                      marginRight: "20px",
                      textAlign: "left",
                      backgroundColor: isNavigable ? "#38c72e" : "transparent",
                      color: isNavigable ? "#0040C1" : "inherit",
                      padding: "0.5px"
                    }}
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          );

          break;
          }
        case "cat":
          if (!argument) {
            newLine.contentArray.push("Usage: cat filename");
            break;
          }

          const resolvedFilePath = resolvePath(currentPath, argument);

          if (fileContents[resolvedFilePath]) {
            newLine.contentArray.push(
              <div className="cat-output">
                {fileContents[resolvedFilePath].map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            );
          } else if (fileStructure[resolvedFilePath]) {
            newLine.contentArray.push(`cat: ${argument}: Is a directory`);
          } else {
            newLine.contentArray.push(`cat: ${argument}: No such file in current directory`);
          }

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

              <div className="help-command">resume</div>
              <div className="help-description">Have a look at my resume.</div>
              <div className="help-command">contact</div>
              <div className="help-description">Contact me!</div>
              <div className="help-command">advanced</div>
              <div className="help-description">Unlock more ways to see my skills!</div>
            </div>
          );
          break;
        case "resume":
          window.open("/Resume.pdf", "_blank");
          newLine.contentArray.push("Opening resume in a new tab!");
          newLine.contentArray.push(
            <div key="resume-qr" style={{ marginTop: "10px" }}>
              <div>Or scan this QR code:</div>
              <QRCode value={`${window.location.origin}/Resume.pdf`} size={128} />
            </div>
          );
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
        case "clear":
          setOutput([]);
          setInput("");
          return;
        case "sudo":
          newLine.contentArray.push("Nice try.");
          break;
        case "advanced":
          newLine.contentArray.push(
            <div key="advanced-info" className="advanced-info">
              <div className="advanced-command">dir</div>
              <div className="dir-description">See what's inside the current directory. 'ls' is also accepted for users who refuse to type three letters.</div>
              <div className="advanced-command">cd</div>
              <div className="cd-description">{"Navigate to different directories. Usage: cd directory_name (e.g., cd skills)"}</div>
              <div className="advanced-command">cat</div>
              <div className="cat-description">{"View the contents of a file. Usage: cat file_name (e.g., cat filename.txt)"}</div>
            </div>
          );
          break;
        default:
          if (fileStructure[currentPath] && fileStructure[currentPath].includes(command)) {
            const fullPath = currentPath + "/" + command;
            if (fileStructure[fullPath]) {
              // It's a directory
              newLine.contentArray.push(`Hint: Try "cd ${command}" to navigate into this directory.`);
            } else if (command.toLowerCase().endsWith(".txt")) {
              // It's a file
              newLine.contentArray.push(`Hint: Try "cat ${command}" to view the contents of this file.`);
            } else {
              // Other types of files
              newLine.contentArray.push(`Cannot perform action on "${command}".`);
            }
          } else {
            newLine.contentArray.push(`${input}: Command not found. For a list of commands, type 'help'.`);
          }
      }
  
      setOutput((prevOutput) => [...prevOutput, newLine]); // Add the output line with the directory
      setInput("");
      tabMatchesRef.current = [];
      tabIndexRef.current = 0;
      tabPrefixRef.current = "";
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
          <div>Welcome to my interactive web terminal portfolio.</div>
          <div>For a list of available commands, type 'help'.</div>
          {output.map((line, index) => (
            <div key={index}>
              <span className="text-green">visitor@enochluu.com</span>
              <span className="text-white">:</span>
              {/* Use the stored directory for each line */}
              <span className="text-blue">{line.directory}</span>
              <span className="text-white">$</span>
              <span> {line.content.slice(prompt.length)}</span>
              {line.contentArray.map((content, idx) => (
                <div key={idx}>{content}</div>
              ))}
            </div>
          ))}
          <div className="flex" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span className="text-green">visitor@enochluu.com</span>
            <span className="text-white">:</span>
            {/* Display the currentPath as the directory in the input prompt */}
            <span className="text-blue">{currentPath}</span>
            <span className="text-white">$</span>
            <span>&nbsp;</span>
            <label htmlFor="commandInput" className="sr-only">Command Input:</label>
            <input
              id="commandInput"
              ref={inputRef}
              type="text"
              value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
              onKeyDown={handleKeyDown}
              className={`bg-transparent border-none outline-none`}
              style={{
                padding: '0',
                caretColor: 'transparent',
                position: 'relative',
                zIndex: 1,
                width: '50%',
              }}
              maxLength={50}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
            />
            <div
              ref={caretRef}
              suppressHydrationWarning
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
