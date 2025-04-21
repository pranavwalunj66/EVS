import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaLightbulb, FaRecycle, FaComment, FaExpand, FaCompress, FaSearch } from 'react-icons/fa';
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const DashboardNav = ({ onNavigate }) => {
  const navItems = [
    {
      title: 'Metrics & Analytics',
      icon: <FaChartLine className="text-2xl" />,
      description: 'View detailed waste management metrics and analytics',
      page: 'metrics',
    },
    {
      title: 'Connected Societies',
      icon: <FaUsers className="text-2xl" />,
      description: 'Browse all registered societies and their details',
      page: 'societies',
    },
    {
      title: 'Success Stories',
      icon: <FaLightbulb className="text-2xl" />,
      description: 'Learn from successful waste management implementations',
      page: 'stories',
    },
    {
      title: 'Process Guide',
      icon: <FaRecycle className="text-2xl" />,
      description: 'Step-by-step guide for waste management process',
      page: 'process',
    },
    {
      title: 'Waste Identification', // New item
      icon: <FaSearch className="text-2xl" />, // New icon
      description: 'Identify waste items and learn how to dispose of them', // New description
      page: 'identification', // New page name
    },
  ];

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatbotMaximized, setIsChatbotMaximized] = useState(false);
  const chatboxRef = useRef(null);

  const openChatbot = () => setIsChatbotOpen(true);
  const closeChatbot = () => setIsChatbotOpen(false);
  const toggleChatbotMaximize = () => setIsChatbotMaximized(!isChatbotMaximized);

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const formatGeminiResponse = (text) => {
    // Convert markdown-like bold to <b> tags
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Convert markdown-like lists to <ul> and <li> tags with proper indentation
    formattedText = formattedText.replace(
      /(^|\n)\s*\* (.*?)(?=(\n\s*\*|$))/g,
      (match, p1, p2) => {
        return `${p1}  <li>${p2}</li>`; // Added indentation here
      }
    );

    // Wrap the list items in a <ul> tag with proper indentation
    formattedText = formattedText.replace(
      /(  <li>.*?<\/li>(\n|$))+/g, // Adjusted regex to match indented <li> tags
      (match) => {
        return `<ul>\n${match}\n</ul>`; // Added indentation and newlines here
      }
    );

    // Wrap each line in a <p> tag if not already in a list
    formattedText = formattedText
      .split('\n')
      .map((line, index) => {
        if (line.trim().length > 0 && !line.trim().startsWith("<li")) {
          return `<p key=${index}>${line}</p>`;
        }
        return line;
      })
      .join('\n'); // Added newline here

    return formattedText;
  };

  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    const newUserMessage = { text: userInput, sender: 'user' };
    setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const geminiResponse = await callGeminiAPI(userInput);
      const formattedResponse = formatGeminiResponse(geminiResponse);
      const newBotMessage = { text: formattedResponse, sender: 'bot', isHtml: true };
      setChatMessages((prevMessages) => [...prevMessages, newBotMessage]);
    } catch (error) {
      console.error('Error in sendMessage:', error);
      const errorBotMessage = {
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
      };
      setChatMessages((prevMessages) => [...prevMessages, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const callGeminiAPI = async (userQuery) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const systemInstructions = `You are a helpful assistant specialized in solid waste management. You have access to detailed information about waste management processes, metrics, and best practices. Your goal is to provide accurate and informative answers to user queries related to solid waste management. When responding, use markdown formatting for bolding (using **bold text**), spacing, and lists (using * list item).`;
    const prompt = `${systemInstructions}\n\nUser Query: ${userQuery}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API Error:', errorData);
        throw new Error(`Gemini API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Gemini API Response:', data);

      if (
        data.candidates &&
        data.candidates.length > 0 &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts.length > 0
      ) {
        return data.candidates[0].content.parts[0].text;
      } else {
        return "I'm sorry, I couldn't generate a response.";
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="pt-4 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navItems.map((item) => (
            <motion.button
              key={item.page}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(item.page)}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 text-left"
            >
              <div className="text-green-600 mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Floating Chatbot Button */}
      <motion.button
        onClick={openChatbot}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
      >
        <FaComment className="text-2xl" />
      </motion.button>

      {/* Chatbot Modal */}
      <Modal
        isOpen={isChatbotOpen}
        onRequestClose={closeChatbot}
        contentLabel="Chatbot"
        className={`absolute bottom-20 right-8 bg-white p-4 rounded-xl shadow-lg ${isChatbotMaximized ? 'w-full h-full top-0 left-0 m-0 rounded-none' : 'w-96 max-h-[calc(100vh-10rem)]'}`}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-green-600">Waste Management Chatbot</h2>
            <div className="flex items-center">
              <button onClick={toggleChatbotMaximize} className="text-gray-600 hover:text-gray-800 mr-2">
                {isChatbotMaximized ? <FaCompress className="h-6 w-6" /> : <FaExpand className="h-6 w-6" />}
              </button>
              <button onClick={closeChatbot} className="text-gray-600 hover:text-gray-800">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            className="flex-grow overflow-y-auto mb-4 p-2"
            ref={chatboxRef}
            style={{ maxHeight: isChatbotMaximized ? 'calc(100vh - 120px)' : 'calc(100vh - 300px)' }}
          >
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg max-w-[70%] break-words ${message.sender === 'user'
                    ? 'bg-green-200 text-gray-800'
                    : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  {message.isHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: message.text }} />
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-2">
                <div className="inline-block p-2 rounded-lg bg-gray-100 text-gray-800">
                  Loading...
                </div>
              </div>
            )}
          </div>
          <div className="flex">
            <input
              type="text"
              value={userInput}
              onChange={handleUserInput}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="flex-grow border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Send
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardNav;
