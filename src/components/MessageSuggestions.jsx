import React, { useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';

export default function MessageSuggestions({ objective, customerName, onSelect }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSuggestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.post('/ai/messages', { objective, customerName });
      setMessages(res.data.messages);
    } catch (err) {
      setError('Failed to generate suggestions. Please try again.');
      console.error('Error generating suggestions:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="message-suggestions">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={getSuggestions}
        disabled={loading}
        className="suggestions-button"
      >
        {loading ? (
          <span className="loading-spinner">Generating...</span>
        ) : (
          'Get AI Message Suggestions'
        )}
      </motion.button>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="suggestions-list">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="suggestion-item"
          >
            <p className="message-text">{msg}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(msg)}
              className="use-button"
            >
              Use Message
            </motion.button>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .message-suggestions {
          padding: 20px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .suggestions-button {
          width: 100%;
          padding: 12px 24px;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .suggestions-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid #ffffff;
          border-radius: 50%;
          border-top-color: transparent;
          animation: spin 1s linear infinite;
        }

        .error-message {
          margin-top: 12px;
          padding: 12px;
          background: #fee2e2;
          color: #dc2626;
          border-radius: 6px;
          font-size: 14px;
        }

        .suggestions-list {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .suggestion-item {
          padding: 16px;
          background: #f9fafb;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }

        .message-text {
          margin: 0 0 12px 0;
          font-size: 15px;
          line-height: 1.5;
          color: #374151;
        }

        .use-button {
          padding: 8px 16px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
} 