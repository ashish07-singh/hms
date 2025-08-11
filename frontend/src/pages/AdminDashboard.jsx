import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const getInitials = (name = "") => name.split(" ").map(n => n[0]).join("").toUpperCase();

const AdminDashboard = () => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [loadingChats, setLoadingChats] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [lastMessageCount, setLastMessageCount] = useState(0);
  const [lastChatCount, setLastChatCount] = useState(0);
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const messagesEndRef = useRef(null);
  const chatPollingRef = useRef(null);
  const messagePollingRef = useRef(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial load
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const adminData = localStorage.getItem("admin");
    if (!adminToken || !adminData) {
      navigate("/login");
      return;
    }
    setAdmin(JSON.parse(adminData));
    fetchChats();
    fetchUsers();
  }, [navigate]);

  // Smart polling for chats - only when there are changes
  useEffect(() => {
    const pollChats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(`${BACKEND_URL}/api/admin/chats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const newChats = response.data.chats || [];
        
        // Only update if there are actual changes
        if (newChats.length !== lastChatCount) {
          setChats(newChats);
          setLastChatCount(newChats.length);
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          // Token invalid or expired -> force logout
          localStorage.removeItem('adminToken');
          localStorage.removeItem('admin');
          window.dispatchEvent(new Event('storage'));
          navigate('/login');
        }
      }
    };

    // Poll every 10 seconds for new chats
    chatPollingRef.current = setInterval(pollChats, 10000);
    return () => {
      if (chatPollingRef.current) clearInterval(chatPollingRef.current);
    };
  }, [lastChatCount]);

  // Smart polling for messages in selected chat
  useEffect(() => {
    if (!selectedChat) return;

    const pollMessages = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(`${BACKEND_URL}/api/admin/chat/${selectedChat}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const newMessages = response.data.messages || [];
        
        // Only update if there are new messages
        if (newMessages.length !== lastMessageCount) {
          setMessages(newMessages);
          setLastMessageCount(newMessages.length);
          
          // Update chat list to reflect new messages
          fetchChats();
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('admin');
          window.dispatchEvent(new Event('storage'));
          navigate('/login');
        }
      }
    };

    // Poll every 5 seconds for new messages in selected chat
    messagePollingRef.current = setInterval(pollMessages, 5000);
    return () => {
      if (messagePollingRef.current) clearInterval(messagePollingRef.current);
    };
  }, [selectedChat, lastMessageCount]);

  const fetchChats = async () => {
    setLoadingChats(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BACKEND_URL}/api/admin/chats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const newChats = response.data.chats || [];
      setChats(newChats);
      setLastChatCount(newChats.length);
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
        window.dispatchEvent(new Event('storage'));
        navigate('/login');
        return;
      }
      setChats([]);
    } finally {
      setLoadingChats(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BACKEND_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.users || []);
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
        window.dispatchEvent(new Event('storage'));
        navigate('/login');
        return;
      }
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchMessages = async (sessionId) => {
    setLoadingMessages(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BACKEND_URL}/api/admin/chat/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const newMessages = response.data.messages || [];
      setMessages(newMessages);
      setLastMessageCount(newMessages.length);
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
        window.dispatchEvent(new Event('storage'));
        navigate('/login');
        return;
      }
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  const selectChat = (sessionId) => {
    setSelectedChat(sessionId);
    fetchMessages(sessionId);
  };

  const sendReply = async () => {
    if (!reply.trim() || !selectedChat) return;
    
    const messageToSend = reply.trim();
    setReply("");
    setLoading(true);
    
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${BACKEND_URL}/api/admin/reply`, {
        sessionId: selectedChat,
        reply: messageToSend
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Immediately add the message to the UI for instant feedback
      const newMessage = {
        text: messageToSend,
        from: 'admin',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, newMessage]);
      setLastMessageCount(prev => prev + 1);
      
      // Update chat list to show the new message
      setTimeout(() => {
        fetchChats();
      }, 500);
      
    } catch (error) {
      alert('Failed to send reply');
      setReply(messageToSend); // Restore the message if it failed
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    
    // Trigger storage event to update navbar
    window.dispatchEvent(new Event('storage'));
    
    navigate("/login");
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getSelectedChatInfo = () => {
    const chat = chats.find(c => c.sessionId === selectedChat);
    if (!chat) return "";
    const userInfo = chat.userId ? `${chat.userId.name} (${chat.userId.email})` : chat.userEmail || 'Anonymous';
    return ` - ${userInfo}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gradient-to-r from-blue-700 to-purple-700 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Hospital Chat Admin</h1>
            <p className="text-blue-100 text-sm">Manage customer support conversations and respond to users</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-blue-100 font-semibold">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-white bg-opacity-20 rounded-full text-lg font-bold">
                {getInitials(admin?.username || 'A')}
              </span>
              Welcome, {admin?.username || 'Admin'}
            </span>
            <button
              onClick={handleLogout}
              className="bg-black bg-opacity-20 hover:bg-opacity-40 px-4 py-2 rounded-lg font-semibold transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[70vh]">
          
          {/* Active Chats */}
          <div className="bg-white rounded-2xl shadow-xl flex flex-col h-[70vh]">
            <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex justify-between items-center">
              <h2 className="text-lg font-bold text-blue-700 flex items-center gap-2">
                <span className="material-icons text-blue-500">chat</span> Active Chats
              </h2>
              <button
                onClick={fetchChats}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                🔄 Refresh
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {loadingChats ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : chats.length === 0 ? (
                <div className="text-center text-gray-400 py-8">No active chats</div>
              ) : (
                <div className="space-y-2">
                  {chats.map((chat) => (
                    <div
                      key={chat.sessionId}
                      onClick={() => selectChat(chat.sessionId)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all duration-200 hover:shadow-md ${
                        selectedChat === chat.sessionId 
                          ? 'border-blue-500 bg-blue-50 shadow-md' 
                          : 'border-gray-200 hover:border-blue-300 bg-white'
                      }`}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                        {getInitials(chat.userId ? chat.userId.name : chat.userEmail || 'A')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-800 truncate">
                          {chat.userId ? chat.userId.name : chat.userEmail || 'Anonymous'}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : 'No messages'}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-400">{formatTime(chat.lastMessage)}</span>
                        {chat.userId && (
                          <span className={`mt-1 w-2 h-2 rounded-full ${chat.userId.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="bg-white rounded-2xl shadow-xl flex flex-col h-[70vh]">
            <div className="sticky top-0 z-10 bg-white border-b px-4 py-3">
              <h2 className="text-lg font-bold text-blue-700">Chat Messages{getSelectedChatInfo()}</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {loadingMessages ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  {selectedChat ? 'No messages' : 'Select a chat to view messages'}
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-sm transition-all duration-200 ${
                          message.from === 'user'
                            ? 'bg-blue-600 text-white'
                            : message.from === 'admin'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-600 text-white'
                        }`}
                      >
                        <div>{message.text}</div>
                        <div className="text-xs opacity-75 mt-1">
                          {formatTime(message.timestamp)}
                          {message.from === 'admin' && ' • Support Team'}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            {selectedChat && (
              <div className="p-4 border-t bg-gray-50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    onKeyDown={(e) => e.key === 'Enter' && sendReply()}
                  />
                  <button
                    onClick={sendReply}
                    disabled={loading || !reply.trim()}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Registered Users */}
          <div className="bg-white rounded-2xl shadow-xl flex flex-col h-[70vh]">
            <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex justify-between items-center">
              <h2 className="text-lg font-bold text-blue-700 flex items-center gap-2">
                <span className="material-icons text-blue-500">people</span> Registered Users
              </h2>
              <button
                onClick={fetchUsers}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                🔄 Refresh
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {loadingUsers ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center text-gray-400 py-8">No registered users</div>
              ) : (
                <div className="space-y-2">
                  {users.map((user) => (
                    <div key={user._id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-lg">
                        {getInitials(user.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-800 truncate">{user.name}</div>
                        <div className="text-xs text-gray-500 truncate">{user.email}</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`text-xs font-semibold ${user.isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                          {user.isOnline ? 'Online' : 'Offline'}
                        </span>
                        <span className="text-xs text-gray-400">Last: {formatTime(user.lastMessage)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 