import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const messagesEndRef = useRef(null);

  // Quick reply suggestions
  const quickReplies = [
    "What are your services?",
    "How can I book an appointment?",
    "What are your visiting hours?",
    "Do you accept insurance?",
    "What emergency services do you provide?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check login status on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const authToken = localStorage.getItem('authToken');

    if (storedUser && authToken) {
      try {
        const userData = JSON.parse(storedUser);
        const userId = userData._id || userData.id;
        const userEmail = userData.email;
        
        setUserId(userId);
        setUserEmail(userEmail);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Poll for new messages when chat is open
  useEffect(() => {
    if (!sessionId || !isOpen) return;

    const pollForMessages = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/chatbot/chat/${sessionId}`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.messages && data.messages.length > messages.length) {
            setMessages(data.messages.map(msg => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            })));
          }
        }
      } catch (error) {
        console.error('Error polling for messages:', error);
      }
    };

    const interval = setInterval(pollForMessages, 3000);
    return () => clearInterval(interval);
  }, [sessionId, isOpen, messages.length]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { 
      from: "user", 
      text: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/chatbot`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            message: input,
            sessionId: sessionId,
            email: userEmail,
            userId: userId
          }),
        }
      );
      
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await res.json();
      
      // Update session ID if provided
      if (data.sessionId) {
        setSessionId(data.sessionId);
      }
      
      // Only add bot response if there is one
      if (data.reply) {
        setMessages(prev => [...prev, { 
          from: "bot", 
          text: data.reply,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [
        ...prev,
        { 
          from: "bot", 
          text: "Sorry, I'm having trouble connecting right now. Please try again.",
          timestamp: new Date()
        },
      ]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const handleQuickReply = async (question) => {
    const userMsg = { 
      from: "user", 
      text: question,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/chatbot`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            message: question,
            sessionId: sessionId,
            email: userEmail,
            userId: userId
          }),
        }
      );
      
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await res.json();
      
      // Update session ID if provided
      if (data.sessionId) {
        setSessionId(data.sessionId);
      }
      
      // Only add bot response if there is one
      if (data.reply) {
        setMessages(prev => [...prev, { 
          from: "bot", 
          text: data.reply,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [
        ...prev,
        { 
          from: "bot", 
          text: "Sorry, I'm having trouble connecting right now. Please try again.",
          timestamp: new Date()
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const showLoginPrompt = () => {
    if (!userId) {
      return (
        <div style={{
          padding: "20px",
          textAlign: "center",
          background: "#fff3cd",
          border: "1px solid #ffeaa7",
          borderRadius: "8px",
          margin: "10px"
        }}>
          <div style={{ marginBottom: "10px", fontWeight: "600", color: "#856404" }}>
            Login Required
          </div>
          <div style={{ marginBottom: "15px", fontSize: "14px", color: "#856404" }}>
            Please login or register to chat with our support team.
          </div>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
              onClick={() => window.location.href = '/login'}
              style={{
                padding: "8px 16px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              Login
            </button>
            <button
              onClick={() => window.location.href = '/signup'}
              style={{
                padding: "8px 16px",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              Register
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  const showQuickReplies = () => {
    if (userId && messages.length === 0) {
      return (
        <div style={{
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}>
          <div style={{
            padding: "12px 16px",
            borderRadius: "18px",
            background: "#f8f9fa",
            border: "1px solid #e9ecef",
            color: "#333",
            maxWidth: "80%",
            alignSelf: "flex-start"
          }}>
            <div style={{ marginBottom: "8px", fontWeight: "600" }}>
              Welcome! How can I help you today?
            </div>
          </div>
          
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "10px"
          }}>
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                disabled={isLoading}
                style={{
                  padding: "10px 16px",
                  background: "white",
                  border: "1px solid #007bff",
                  borderRadius: "20px",
                  color: "#007bff",
                  fontSize: "14px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                  opacity: isLoading ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.target.style.background = "#007bff";
                    e.target.style.color = "white";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.target.style.background = "white";
                    e.target.style.color = "#007bff";
                  }
                }}
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  if (!isOpen) {
    return (
      <div style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 9999
      }}>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#007bff",
            color: "white",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0, 123, 255, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
            e.target.style.boxShadow = "0 6px 25px rgba(0, 123, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 4px 20px rgba(0, 123, 255, 0.3)";
          }}
        >
          💬
        </button>
      </div>
    );
  }

  return (
    <div style={{
      position: "fixed",
      bottom: 20,
      right: 20,
      width: 350,
      height: 500,
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
      display: "flex",
      flexDirection: "column",
      zIndex: 9999,
      overflow: "hidden"
    }}>
      {/* Header */}
      <div style={{
        background: "#007bff",
        color: "white",
        padding: "15px 20px",
        borderRadius: "12px 12px 0 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            color: "#007bff"
          }}>
            💬
          </div>
          <div style={{ fontWeight: "600", fontSize: "16px" }}>
            Chat with us
          </div>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: "white",
              padding: "5px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px"
            }}
          >
            {isMinimized ? "□" : "−"}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: "white",
              padding: "5px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px"
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Chat Content */}
      {!isMinimized && (
        <>
          {showLoginPrompt()}
          {showQuickReplies()}
          
          {/* Messages */}
          {messages.length > 0 && (
            <div style={{
              flex: 1,
              padding: "15px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: message.from === "user" ? "flex-end" : "flex-start",
                    marginBottom: "10px"
                  }}
                >
                  <div style={{
                    maxWidth: "80%",
                    padding: "12px 16px",
                    borderRadius: "18px",
                    background: message.from === "user" ? "#007bff" : 
                               message.from === "admin" ? "#28a745" : "#f8f9fa",
                    color: message.from === "user" || message.from === "admin" ? "white" : "#333",
                    border: message.from === "bot" ? "1px solid #e9ecef" : "none",
                    position: "relative"
                  }}>
                    <div style={{ marginBottom: "4px" }}>
                      {message.text}
                    </div>
                    <div style={{
                      fontSize: "11px",
                      opacity: 0.7,
                      textAlign: message.from === "user" ? "right" : "left"
                    }}>
                      {formatTime(message.timestamp)}
                      {message.from === "admin" && " • Support Team"}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "10px"
                }}>
                  <div style={{
                    padding: "12px 16px",
                    borderRadius: "18px",
                    background: "#f8f9fa",
                    border: "1px solid #e9ecef",
                    color: "#333"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "#007bff",
                        animation: "pulse 1.5s infinite"
                      }}></div>
                      Typing...
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input */}
          {userId && (
            <div style={{
              padding: "15px",
              borderTop: "1px solid #e9ecef",
              background: "white"
            }}>
              <form onSubmit={sendMessage} style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    padding: "12px",
                    border: "1px solid #ced4da",
                    borderRadius: "20px",
                    fontSize: "14px",
                    outline: "none"
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  style={{
                    padding: "12px 20px",
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    opacity: isLoading || !input.trim() ? 0.6 : 1
                  }}
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;