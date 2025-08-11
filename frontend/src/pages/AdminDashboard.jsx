import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const getInitials = (name = "") => name.split(" ").map(n => n[0]).join("").toUpperCase();

// Returns a pleasant color pair for avatar backgrounds based on a stable hash of the seed
const getAvatarTone = (seed = "A") => {
  const tones = [
    { bg: "bg-indigo-100", text: "text-indigo-700", ring: "ring-indigo-200" },
    { bg: "bg-emerald-100", text: "text-emerald-700", ring: "ring-emerald-200" },
    { bg: "bg-sky-100", text: "text-sky-700", ring: "ring-sky-200" },
    { bg: "bg-amber-100", text: "text-amber-800", ring: "ring-amber-200" },
    { bg: "bg-rose-100", text: "text-rose-700", ring: "ring-rose-200" },
    { bg: "bg-violet-100", text: "text-violet-700", ring: "ring-violet-200" },
  ];
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % tones.length;
  return tones[idx];
};

const AdminDashboard = () => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState('chats');
  const [isPolling, setIsPolling] = useState(false);
  
  // Pagination and filtering
  const [chatFilters, setChatFilters] = useState({
    page: 1,
    limit: 20,
    status: 'active',
    priority: 'all',
    search: ''
  });
  const [userFilters, setUserFilters] = useState({
    page: 1,
    limit: 50,
    search: ''
  });
  const [chatPagination, setChatPagination] = useState({});
  const [userPagination, setUserPagination] = useState({});
  
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
    fetchStats();
    fetchChats();
    if (activeTab === 'users') fetchUsers();
  }, [navigate, activeTab]);

  // Refetch when filters change
  useEffect(() => {
    fetchChats();
  }, [chatFilters]);

  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
  }, [userFilters, activeTab]);

  // Smart polling for chats - automatically refresh for new chats
  useEffect(() => {
    if (activeTab !== 'chats') return;

    const pollChats = async () => {
      try {
        setIsPolling(true);
        const token = localStorage.getItem("adminToken");
        const params = new URLSearchParams(chatFilters).toString();
        const response = await axios.get(`${BACKEND_URL}/api/admin/chats?${params}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const newChats = response.data.chats || [];
        
        // Only update if there are actual changes (avoid unnecessary re-renders)
        if (JSON.stringify(newChats) !== JSON.stringify(chats)) {
          setChats(newChats);
          setChatPagination(response.data.pagination || {});
          
          // Also refresh stats when chats change
          fetchStats();
        }
      } catch (error) {
        handleAuthError(error);
      } finally {
        setIsPolling(false);
      }
    };

    // Poll every 5 seconds for new chats
    chatPollingRef.current = setInterval(pollChats, 5000);
    
    return () => {
      if (chatPollingRef.current) clearInterval(chatPollingRef.current);
    };
  }, [activeTab, chatFilters, chats]);

  // Smart polling for messages in selected chat
  useEffect(() => {
    if (!selectedChat || activeTab !== 'chats') return;

    const pollMessages = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(`${BACKEND_URL}/api/admin/chat/${selectedChat}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const newMessages = response.data.messages || [];
        
        // Only update if there are new messages
        if (newMessages.length !== messages.length) {
          setMessages(newMessages);
          
          // Refresh chat list to update last message display
          fetchChats();
        }
      } catch (error) {
        handleAuthError(error);
      }
    };

    // Poll every 3 seconds for new messages in selected chat
    messagePollingRef.current = setInterval(pollMessages, 3000);
    
    return () => {
      if (messagePollingRef.current) clearInterval(messagePollingRef.current);
    };
  }, [selectedChat, activeTab, messages.length]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BACKEND_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const params = new URLSearchParams(chatFilters).toString();
      const response = await axios.get(`${BACKEND_URL}/api/admin/chats?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChats(response.data.chats || []);
      setChatPagination(response.data.pagination || {});
    } catch (error) {
      handleAuthError(error);
      setChats([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const params = new URLSearchParams(userFilters).toString();
      const response = await axios.get(`${BACKEND_URL}/api/admin/users?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.users || []);
      setUserPagination(response.data.pagination || {});
    } catch (error) {
      handleAuthError(error);
      setUsers([]);
    }
  };

  const fetchMessages = async (sessionId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BACKEND_URL}/api/admin/chat/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data.messages || []);
    } catch (error) {
      handleAuthError(error);
      setMessages([]);
    }
  };

  const handleAuthError = (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('admin');
      window.dispatchEvent(new Event('storage'));
      navigate('/login');
    }
  };

  const selectChat = async (sessionId) => {
    setSelectedChat(sessionId);
    await fetchMessages(sessionId);
    
    // Mark chat as in-progress when selected
    await updateChatStatus(sessionId, 'in-progress');
  };

  const updateChatStatus = async (sessionId, status, priority = null) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(`${BACKEND_URL}/api/admin/chat/${sessionId}/status`, {
        status,
        priority
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchChats();
      fetchStats();
    } catch (error) {
      console.error('Error updating chat status:', error);
    }
  };

  const archiveChat = async (sessionId) => {
    if (!confirm('Are you sure you want to archive this chat?')) return;
    
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${BACKEND_URL}/api/admin/chat/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { action: 'archive' }
      });
      fetchChats();
      fetchStats();
      if (selectedChat === sessionId) {
        setSelectedChat(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error archiving chat:', error);
      alert('Failed to archive chat');
    }
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

      // Immediately add the message to the UI
      const newMessage = {
        text: messageToSend,
        from: 'admin',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, newMessage]);
      
    } catch (error) {
      alert('Failed to send reply');
      setReply(messageToSend);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    window.dispatchEvent(new Event('storage'));
    navigate("/login");
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getStatusColor = (status) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'resolved': 'bg-green-100 text-green-800',
      'archived': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">TAJPE Admin Dashboard</h1>
              <p className="text-blue-100">Manage customer support and user interactions</p>
            </div>
            <div className="flex items-center gap-4">
              {activeTab === 'chats' && (
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <div className={`w-2 h-2 rounded-full ${isPolling ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                  Auto-refresh: {isPolling ? 'Updating...' : 'Active'}
                </div>
              )}
              <span className="text-sm text-blue-100">
                Welcome, {admin?.username || 'Admin'}
              </span>
              <button
                onClick={handleLogout}
                className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
          {/* Card */}
          <div className="p-[1px] rounded-lg bg-gradient-to-r from-blue-200 to-blue-100">
            <div className="bg-white rounded-lg p-4 h-full flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.newChats || 0}</div>
                <div className="text-sm text-gray-600">New Chats</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 grid place-items-center">💬</div>
            </div>
          </div>
          <div className="p-[1px] rounded-lg bg-gradient-to-r from-yellow-200 to-yellow-100">
            <div className="bg-white rounded-lg p-4 h-full flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{stats.inProgressChats || 0}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-600 grid place-items-center">⏳</div>
            </div>
          </div>
          <div className="p-[1px] rounded-lg bg-gradient-to-r from-green-200 to-green-100">
            <div className="bg-white rounded-lg p-4 h-full flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.resolvedChats || 0}</div>
                <div className="text-sm text-gray-600">Resolved</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 grid place-items-center">✅</div>
            </div>
          </div>
          <div className="p-[1px] rounded-lg bg-gradient-to-r from-gray-200 to-gray-100">
            <div className="bg-white rounded-lg p-4 h-full flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-600">{stats.archivedChats || 0}</div>
                <div className="text-sm text-gray-600">Archived</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 grid place-items-center">🗂️</div>
            </div>
          </div>
          <div className="p-[1px] rounded-lg bg-gradient-to-r from-rose-200 to-rose-100">
            <div className="bg-white rounded-lg p-4 h-full flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.highPriorityChats || 0}</div>
                <div className="text-sm text-gray-600">High Priority</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 grid place-items-center">⚠️</div>
            </div>
          </div>
          <div className="p-[1px] rounded-lg bg-gradient-to-r from-orange-200 to-orange-100">
            <div className="bg-white rounded-lg p-4 h-full flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{stats.unreadChats || 0}</div>
                <div className="text-sm text-gray-600">Unread</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 grid place-items-center">🔔</div>
            </div>
          </div>
          <div className="p-[1px] rounded-lg bg-gradient-to-r from-violet-200 to-violet-100">
            <div className="bg-white rounded-lg p-4 h-full flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{stats.totalUsers || 0}</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-violet-50 text-violet-600 grid place-items-center">👥</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('chats')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'chats' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Support Chats
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Registered Users
              </button>
            </nav>
          </div>

          {/* Chat Tab */}
          {activeTab === 'chats' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
              
              {/* Chat List */}
              <div className="lg:col-span-1">
                <div className="mb-4">
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Search chats..."
                      value={chatFilters.search}
                      onChange={(e) => setChatFilters(prev => ({...prev, search: e.target.value, page: 1}))}
                      className="flex-1 px-3 py-2 border rounded-lg text-sm"
                    />
                    <select
                      value={chatFilters.status}
                      onChange={(e) => setChatFilters(prev => ({...prev, status: e.target.value, page: 1}))}
                      className="px-3 py-2 border rounded-lg text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="new">New</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="archived">Archived</option>
                    </select>
                    <button
                      onClick={fetchChats}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-1"
                    >
                      {isPolling ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        '🔄'
                      )}
                      Refresh
                    </button>
                  </div>
                  <select
                    value={chatFilters.priority}
                    onChange={(e) => setChatFilters(prev => ({...prev, priority: e.target.value, page: 1}))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>

                <div className="space-y-2 max-h-[28rem] overflow-y-auto pr-1">
                  {chats.length === 0 && (
                    <div className="p-6 text-center text-gray-500 bg-white border rounded-lg">
                      No chats found. Try adjusting filters.
                    </div>
                  )}
                  {chats.map((chat) => (
                    <div
                      key={chat.sessionId}
                      onClick={() => selectChat(chat.sessionId)}
                      className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                        selectedChat === chat.sessionId 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {(() => {
                            const displayName = chat.userId ? chat.userId.name : (chat.userEmail || 'Anonymous');
                            const tone = getAvatarTone(displayName);
                            return (
                              <div className={`w-9 h-9 rounded-full ${tone.bg} ${tone.text} ring-1 ${tone.ring} flex items-center justify-center text-xs font-bold`}>
                                {getInitials(displayName)}
                              </div>
                            );
                          })()}
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-sm truncate">
                              {chat.userId ? chat.userId.name : chat.userEmail || 'Anonymous'}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : 'No messages'}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center gap-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(chat.status)}`}>
                              {chat.status}
                            </span>
                            {chat.unreadCount > 0 && (
                              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                {chat.unreadCount}
                              </span>
                            )}
                          </div>
                          {chat.priority && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(chat.priority)}`}>
                              {chat.priority}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-gray-400">{formatTime(chat.lastMessage)}</span>
                        <div className="flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateChatStatus(chat.sessionId, 'resolved');
                            }}
                            className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                          >
                            Resolve
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              archiveChat(chat.sessionId);
                            }}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
                          >
                            Archive
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {chatPagination.total > 1 && (
                  <div className="flex justify-between items-center mt-4 text-sm">
                    <span className="text-gray-600">
                      Page {chatPagination.current} of {chatPagination.total}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setChatFilters(prev => ({...prev, page: prev.page - 1}))}
                        disabled={chatPagination.current <= 1}
                        className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                      >
                        Prev
                      </button>
                      <button
                        onClick={() => setChatFilters(prev => ({...prev, page: prev.page + 1}))}
                        disabled={chatPagination.current >= chatPagination.total}
                        className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Messages */}
              <div className="lg:col-span-2 border rounded-lg bg-white flex flex-col">
                {selectedChat ? (
                  <>
                    <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Chat Messages</h3>
                        <p className="text-xs text-gray-500">Session: {selectedChat}</p>
                      </div>
                      <div className="flex gap-2">
                        <select
                          onChange={(e) => updateChatStatus(selectedChat, e.target.value)}
                          defaultValue=""
                          className="text-sm px-2 py-1 border rounded"
                        >
                          <option value="" disabled>Update Status</option>
                          <option value="new">New</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                        <select
                          onChange={(e) => updateChatStatus(selectedChat, null, e.target.value)}
                          defaultValue=""
                          className="text-sm px-2 py-1 border rounded"
                        >
                          <option value="" disabled>Set Priority</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="p-4 flex-1 overflow-y-auto">
                      <div className="space-y-3">
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] px-3 py-2 rounded-2xl shadow-sm ring-1 ring-black/5 ${
                                message.from === 'user'
                                  ? 'bg-blue-500 text-white'
                                  : message.from === 'admin'
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-200 text-gray-800'
                              }`}
                            >
                              <div>{message.text}</div>
                              <div className="text-xs opacity-75 mt-1">
                                {formatTime(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                        {messages.length === 0 && (
                          <div className="text-center text-gray-500 py-12">
                            No messages yet. Start the conversation.
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 border-t bg-gray-50">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                          placeholder="Type your reply..."
                          className="flex-1 px-3 py-2 border rounded-lg"
                          onKeyDown={(e) => e.key === 'Enter' && sendReply()}
                        />
                        <button
                          onClick={sendReply}
                          disabled={loading || !reply.trim()}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-12 text-center text-gray-500 grid place-items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-gray-100 grid place-items-center">💬</div>
                    <div className="text-gray-700 font-medium">No chat selected</div>
                    <div className="text-sm">Select a chat from the list to view messages</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="p-6">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={userFilters.search}
                  onChange={(e) => setUserFilters(prev => ({...prev, search: e.target.value, page: 1}))}
                  className="w-full max-w-md px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="bg-white rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">User</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Registered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
                              {getInitials(user.name)}
                            </div>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{user.email}</td>
                        <td className="px-4 py-3 text-gray-600">{user.phone || 'N/A'}</td>
                        <td className="px-4 py-3 text-gray-600">{formatTime(user.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* User Pagination */}
              {userPagination.total > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-600">
                    Showing {((userPagination.current - 1) * userPagination.limit) + 1} to{' '}
                    {Math.min(userPagination.current * userPagination.limit, userPagination.count)} of{' '}
                    {userPagination.count} users
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setUserFilters(prev => ({...prev, page: prev.page - 1}))}
                      disabled={userPagination.current <= 1}
                      className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setUserFilters(prev => ({...prev, page: prev.page + 1}))}
                      disabled={userPagination.current >= userPagination.total}
                      className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;