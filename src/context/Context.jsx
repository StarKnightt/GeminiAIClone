import { createContext, useState } from "react"; // Importing createContext and useState hooks from React
import runChat from "../config/gemini"; // Importing the runChat function from the configuration file

// Creating a new context
export const Context = createContext();

// ContextProvider component
const ContextProvider = (props) => {
  // State variables
  const [input, setInput] = useState(""); // Input state
  const [recentPrompt, setRecentPrompt] = useState(""); // Recent prompt state
  const [prevPrompts, setPrevPrompts] = useState([]); // Previous prompts state
  const [showResult, setShowResult] = useState(false); // Show result state
  const [loading, setLoading] = useState(false); // Loading state
  const [resultData, setResultData] = useState(""); // Result data state

  // Function to handle new chat
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  // Function to handle sending the prompt
  const onSent = async (prompt) => {
    setResultData(""); // Clear previous result data
    setLoading(true); // Set loading to true
    setShowResult(true); // Show result
    let response;

    // If prompt is provided, use it; otherwise, use the input state
    if (prompt !== undefined) {
      response = await runChat(prompt); // Run chat with the provided prompt
      setRecentPrompt(prompt); // Set recent prompt
    } else {
      setPrevPrompts((prev) => [...prev, input]); // Add input to previous prompts
      setRecentPrompt(input); // Set recent prompt
      response = await runChat(input); // Run chat with input
    }

    // Processing response for formatting
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");

    // Function to simulate typing effect
    const delayPara = (index, nextWord) => {
      setTimeout(function () {
        setResultData((prev) => prev + nextWord);
      }, 75 * index);
    };

    // Triggering typing effect for each word in the response
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false); // Set loading to false
    setInput(""); // Clear input
  };

  // Value of the context
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  // Providing context value to children components
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider; // Exporting the ContextProvider component as default
