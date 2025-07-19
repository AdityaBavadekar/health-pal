import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import ApiConstants from "../constants/apiConstants";

const Chat = () => {
  const [promptText, setPromptText] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);
  const chatListRef = useRef(null);
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    const fetchPatientId = async () => {
      const token = Cookies.get("jwt");
      try {
        const response = await fetch(ApiConstants.API_ME, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const data = await response.json();
        if (data.error) throw new Error("Failed to fetch patient ID");
        setPatientId(data._id);
      } catch (err) {
        console.error("Error fetching patient ID:", err);
        setError("Failed to fetch patient ID. Please try again.");
      }
    };

    fetchPatientId();
  }, []);

  const chat = async () => {
    setLoading(true);
    setError(null);

    try {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "user",
          content: promptText,
        }
      ]);
      setPromptText("");
      const response = await fetch(ApiConstants.API_CHAT_FOR_PATIENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: patientId,
          sessionId: sessionId,
          message: promptText,
        }),
      });

      const data = await response.json();

      if (data.error) throw new Error("Failed to get response");

      if (!sessionId) {
        setSessionId(data.sessionId);
      }

      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
        },
      ]);
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-6 font-sans">
      <div className="w-full max-w-4xl bg-slate-300 rounded-2xl backdrop-blur-lg p-6 flex flex-col h-[85vh]">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-900 to-blue-900 bg-clip-text text-transparent pb-2">
            AI Assistant
          </h1>
          <p className="text-slate-400 text-sm">Your friendly neighborhood AI</p>
        </div>
        <div
          className="flex-1 overflow-y-auto space-y-6 pr-4 scroll-smooth"
          ref={chatListRef}
        >
          {chatHistory.length === 0 && !loading && (
            <div className="flex flex-col justify-center items-center text-slate-500 italic min-h-full">
              Start chatting with your AI assistant!
            </div>
          )}

          {chatHistory.map((chat, index) => {
            if (chat.role === "user") {
              return (
                <div key={index}>
                  <div className="flex justify-end mb-2">
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg max-w-md">
                      <p>{chat.content}</p>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <div className="flex justify-start">
                    <div className="bg-slate-700 text-slate-200 p-4 rounded-r-lg rounded-bl-lg max-w-md">
                      <ReactMarkdown className="prose prose-sm prose-invert max-w-none">
                        {chat.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            }
          })}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-700 p-4 rounded-r-lg rounded-bl-lg">
                <TypingIndicator />
              </div>
            </div>
          )}
        </div>

        {error && <p className="mt-4 text-sm text-red-400 text-center">{error}</p>}

        <div className="mt-6 flex items-center gap-3 bg-blue-900/80 p-2 rounded-xl border border-slate-600 focus-within:border-cyan-500 transition-all duration-300">
          <input
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-grow bg-transparent text-slate-100 placeholder:text-slate-400 focus:outline-none px-2 text-sm sm:text-base placeholder:font-bold"
            disabled={loading}
            onKeyDown={(e) =>
              e.key === "Enter" && !loading && promptText.trim() && chat()
            }
          />

          <button
            onClick={chat}
            disabled={loading || !promptText.trim()}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
                       bg-gradient-to-br from-cyan-500 to-blue-600 text-white
                       hover:from-cyan-600 hover:to-blue-700
                       disabled:from-slate-600 disabled:to-gray-700 disabled:cursor-not-allowed
                       focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
