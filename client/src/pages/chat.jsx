import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from "../components/layout/navbar";

const Chat = () => {
  const [promptText, setPromptText] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState(null);

  const chat = async () => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = "AIzaSyDmi9k71TdMkHW1QwFLGgIlbZd5YwOyqVM";
      if (!API_KEY) throw new Error("API Key not found!");

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(promptText);
      const responseText = await result.response.text();

      setChatHistory((prev) => [
        ...prev,
        { prompt: promptText, response: responseText },
      ]);
      setPromptText("");
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      {/* <Navbar /> */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl max-h-full flex flex-col">
          <h1 className="text-2xl font-bold mb-4 text-center">AI Chat</h1>

          <div className="flex-grow overflow-y-auto mb-4 border rounded-lg p-4 bg-gray-50 max-h-96">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className="bg-gray-200 p-4 rounded-lg border border-gray-300 mb-2"
              >
                <p className="font-semibold">You:</p>
                <p className="text-gray-800">{chat.prompt}</p>
                <p className="font-semibold mt-2">AI:</p>
                <ReactMarkdown className="text-gray-600">
                  {chat.response}
                </ReactMarkdown>
              </div>
            ))}
            {loading && (
              <div className="text-center">
                <span className="loader animate-spin border-t-2 border-emerald-600 rounded-full h-6 w-6 inline-block"></span>
              </div>
            )}
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="flex space-x-2">
            <input
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="flex-grow border-2 border-gray-300 p-2 rounded-lg"
              placeholder="Type your message..."
              disabled={loading}
            />
            <button
              onClick={chat}
              className={`p-2 rounded-lg ${
                loading
                  ? "bg-gray-400 text-gray-700"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
              disabled={loading || !promptText.trim()}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
          {chatHistory.length == 0 ? <div></div> : null}
        </div>
      </div>
    </div>
  );
};

export default Chat;
