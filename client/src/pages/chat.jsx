import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MessageCircle, Send, Sparkles, Zap } from "lucide-react";

const Chat = () => {
  const [promptText, setPromptText] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const chat = async () => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      chat();
    }
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-emerald-100">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-emerald-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                AI Chat Assistant
              </h1>
              <p className="text-sm text-gray-600">Powered by advanced AI</p>
            </div>
          </div>
        </div>

        {/* Main Chat Container */}
        <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/50 overflow-hidden min-h-[400px] max-h-[80vh] flex flex-col">
          {/* Chat Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-emerald-50/30 to-transparent">
            {chatHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-8 rounded-3xl shadow-inner mb-4">
                  <MessageCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Start a Conversation</h3>
                  <p className="text-gray-500">Ask me anything and I'll do my best to help!</p>
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  {["What can you help me with?", "Tell me a joke", "Explain quantum physics"].map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPromptText(suggestion)}
                      className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-full text-sm transition-all duration-300 hover:scale-105"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              chatHistory.map((chat, index) => (
                <div key={index} className="space-y-4 animate-in slide-in-from-bottom duration-500">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="max-w-md bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 rounded-3xl rounded-br-lg shadow-lg">
                      <p className="text-sm">{chat.prompt}</p>
                      <div className="text-xs text-emerald-100 mt-2 text-right">
                        {formatTime(chat.timestamp)}
                      </div>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="max-w-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 p-4 rounded-3xl rounded-bl-lg shadow-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                          <Zap className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">AI Assistant</span>
                      </div>
                      <div className="text-gray-700 prose prose-sm max-w-none">
                        <ReactMarkdown>{chat.response}</ReactMarkdown>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        {formatTime(chat.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Loading Animation */}
            {loading && (
              <div className="flex justify-start animate-in slide-in-from-bottom duration-300">
                <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 p-4 rounded-3xl rounded-bl-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                    <span className="text-sm text-gray-500">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="px-6 py-2">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl animate-in slide-in-from-top duration-300">
                {error}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 bg-white/50 backdrop-blur-sm border-t border-emerald-100/50">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-white/80 backdrop-blur-sm border-2 border-emerald-200 focus:border-emerald-400 rounded-2xl px-4 py-3 pr-12 resize-none transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-100 placeholder-gray-400"
                  placeholder="Type your message here..."
                  disabled={loading}
                  rows={1}
                  style={{
                    minHeight: '48px',
                    maxHeight: '120px'
                  }}
                />
                <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                  {promptText.length}/1000
                </div>
              </div>

              <button
                onClick={chat}
                disabled={loading || !promptText.trim()}
                className={`
                  relative overflow-hidden p-3 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95
                  ${loading || !promptText.trim()
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-emerald-200"
                  }
                `}
              >
                <div className="relative z-10 flex items-center justify-center">
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-6 h-6" />
                  )}
                </div>

                {/* Ripple effect */}
                {!loading && promptText.trim() && (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-2xl" />
                )}
              </button>
            </div>

            <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span>Press Enter to send • Shift+Enter for new line</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
