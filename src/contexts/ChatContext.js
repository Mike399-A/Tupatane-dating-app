import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadConversations();
      // Simulate real-time connection
      simulateRealTimeUpdates();
    }
  }, [user]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const conversationsData = await mockChatAPI('getConversations', { userId: user.id });
      setConversations(conversationsData);

      // Load messages for each conversation
      const messagesData = {};
      for (const conv of conversationsData) {
        const convMessages = await mockChatAPI('getMessages', { conversationId: conv.id });
        messagesData[conv.id] = convMessages;
      }
      setMessages(messagesData);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const simulateRealTimeUpdates = () => {
    // Simulate users coming online/offline
    const updateOnlineUsers = () => {
      const mockOnlineUsers = [
        { id: '2', name: 'Amina', lastSeen: new Date() },
        { id: '3', name: 'Brian', lastSeen: new Date() },
        { id: '4', name: 'Cynthia', lastSeen: new Date() },
      ];
      setOnlineUsers(mockOnlineUsers);
    };

    updateOnlineUsers();
    const interval = setInterval(updateOnlineUsers, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  };

  const sendMessage = async (conversationId, messageText, messageType = 'text') => {
    if (!messageText.trim()) return;

    const tempMessage = {
      id: Date.now().toString(),
      text: messageText,
      type: messageType,
      senderId: user.id,
      timestamp: new Date(),
      status: 'sending',
    };

    // Optimistically add message to UI
    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), tempMessage]
    }));

    try {
      const sentMessage = await mockChatAPI('sendMessage', {
        conversationId,
        message: tempMessage,
        senderId: user.id,
      });

      // Update message with server response
      setMessages(prev => ({
        ...prev,
        [conversationId]: prev[conversationId].map(msg => 
          msg.id === tempMessage.id ? { ...sentMessage, status: 'sent' } : msg
        )
      }));

      // Update conversation last message
      setConversations(prev => prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, lastMessage: sentMessage, lastMessageTime: sentMessage.timestamp }
          : conv
      ));

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Mark message as failed
      setMessages(prev => ({
        ...prev,
        [conversationId]: prev[conversationId].map(msg => 
          msg.id === tempMessage.id ? { ...msg, status: 'failed' } : msg
        )
      }));
    }
  };

  const createConversation = async (otherUserId) => {
    try {
      const existingConv = conversations.find(conv => 
        conv.participants.some(p => p.id === otherUserId)
      );

      if (existingConv) {
        return existingConv;
      }

      const newConversation = await mockChatAPI('createConversation', {
        participants: [user.id, otherUserId],
        createdBy: user.id,
      });

      setConversations(prev => [newConversation, ...prev]);
      setMessages(prev => ({ ...prev, [newConversation.id]: [] }));

      return newConversation;
    } catch (error) {
      console.error('Error creating conversation:', error);
      return null;
    }
  };

  const markAsRead = async (conversationId) => {
    try {
      await mockChatAPI('markAsRead', {
        conversationId,
        userId: user.id,
      });

      setConversations(prev => prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, unreadCount: 0 }
          : conv
      ));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const setTypingStatus = (conversationId, isTyping) => {
    setTyping(prev => ({
      ...prev,
      [conversationId]: isTyping
    }));

    // Clear typing status after 3 seconds
    if (isTyping) {
      setTimeout(() => {
        setTyping(prev => ({
          ...prev,
          [conversationId]: false
        }));
      }, 3000);
    }
  };

  const deleteMessage = async (conversationId, messageId) => {
    try {
      await mockChatAPI('deleteMessage', { messageId });
      
      setMessages(prev => ({
        ...prev,
        [conversationId]: prev[conversationId].filter(msg => msg.id !== messageId)
      }));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const blockUser = async (userId) => {
    try {
      await mockChatAPI('blockUser', { userId, blockedBy: user.id });
      
      // Remove conversations with blocked user
      setConversations(prev => prev.filter(conv => 
        !conv.participants.some(p => p.id === userId)
      ));
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const value = {
    conversations,
    activeChat,
    messages,
    onlineUsers,
    typing,
    loading,
    setActiveChat,
    sendMessage,
    createConversation,
    markAsRead,
    setTypingStatus,
    deleteMessage,
    blockUser,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

// Mock API for development
const mockChatAPI = async (action, data) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  switch (action) {
    case 'getConversations':
      return generateMockConversations();
    
    case 'getMessages':
      return generateMockMessages(data.conversationId);
    
    case 'sendMessage':
      return {
        ...data.message,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        status: 'delivered',
      };
    
    case 'createConversation':
      return {
        id: Math.random().toString(36).substr(2, 9),
        participants: [
          { id: data.participants[0], name: 'You' },
          { id: data.participants[1], name: 'Amina K.' }
        ],
        lastMessage: null,
        lastMessageTime: new Date(),
        unreadCount: 0,
        type: 'direct'
      };
    
    case 'markAsRead':
    case 'deleteMessage':
    case 'blockUser':
      return { success: true };
    
    default:
      return [];
  }
};

const generateMockConversations = () => {
  return [
    {
      id: 'conv1',
      participants: [
        { id: '1', name: 'You' },
        { id: '2', name: 'Amina K.', profilePicture: 'https://picsum.photos/50/50?random=1' }
      ],
      lastMessage: { text: 'Habari! How was your day?', senderId: '2' },
      lastMessageTime: new Date(Date.now() - 3600000), // 1 hour ago
      unreadCount: 2,
      type: 'direct'
    },
    {
      id: 'conv2',
      participants: [
        { id: '1', name: 'You' },
        { id: '3', name: 'Brian M.', profilePicture: 'https://picsum.photos/50/50?random=2' }
      ],
      lastMessage: { text: 'Tupatane kesho for chai?', senderId: '1' },
      lastMessageTime: new Date(Date.now() - 7200000), // 2 hours ago
      unreadCount: 0,
      type: 'direct'
    },
    {
      id: 'conv3',
      participants: [
        { id: '1', name: 'You' },
        { id: '4', name: 'Cynthia W.', profilePicture: 'https://picsum.photos/50/50?random=3' }
      ],
      lastMessage: { text: 'The Harambee event was amazing!', senderId: '4' },
      lastMessageTime: new Date(Date.now() - 14400000), // 4 hours ago
      unreadCount: 1,
      type: 'direct'
    }
  ];
};

const generateMockMessages = (conversationId) => {
  const messages = {
    conv1: [
      { id: 'msg1', text: 'Jambo! Mambo vipi?', senderId: '2', timestamp: new Date(Date.now() - 7200000), status: 'read' },
      { id: 'msg2', text: 'Poa! Niko sawa. You?', senderId: '1', timestamp: new Date(Date.now() - 7000000), status: 'read' },
      { id: 'msg3', text: 'Niko poa pia. Tupatane weekend?', senderId: '2', timestamp: new Date(Date.now() - 6800000), status: 'read' },
      { id: 'msg4', text: 'Sawa! Where do you suggest?', senderId: '1', timestamp: new Date(Date.now() - 6600000), status: 'read' },
      { id: 'msg5', text: 'Habari! How was your day?', senderId: '2', timestamp: new Date(Date.now() - 3600000), status: 'delivered' },
    ],
    conv2: [
      { id: 'msg6', text: 'Niaje bro!', senderId: '3', timestamp: new Date(Date.now() - 10800000), status: 'read' },
      { id: 'msg7', text: 'Mambo! All good?', senderId: '1', timestamp: new Date(Date.now() - 10600000), status: 'read' },
      { id: 'msg8', text: 'Tupatane kesho for chai?', senderId: '1', timestamp: new Date(Date.now() - 7200000), status: 'delivered' },
    ],
    conv3: [
      { id: 'msg9', text: 'That event yesterday was fun!', senderId: '1', timestamp: new Date(Date.now() - 18000000), status: 'read' },
      { id: 'msg10', text: 'The Harambee event was amazing!', senderId: '4', timestamp: new Date(Date.now() - 14400000), status: 'delivered' },
    ]
  };

  return messages[conversationId] || [];
}; 