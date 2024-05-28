// node --version # Should be >= 18
// npm install @google/generative-ai

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Retrieving environment variables for model name and API key
const MODEL_NAME = import.meta.env.VITE_MODEL_NAME;
const API_KEY = import.meta.env.VITE_MODEL_API_KEY;

// Function to run the chat
async function runChat(prompt) {
  // Creating a new instance of GoogleGenerativeAI with the provided API key
  const genAI = new GoogleGenerativeAI(API_KEY);

  // Getting the generative model using the provided model name
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  // Configuration for generating responses
  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  // Safety settings to filter out harmful content
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  // Starting a chat session with the configured settings
  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  // Sending the prompt to the chat and awaiting the response
  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text()); // Logging the response text
  return response.text(); // Returning the response text
}

export default runChat; // Exporting the runChat function
