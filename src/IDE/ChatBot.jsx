"use client"

import { useState } from "react"
import { Bot, Send } from "lucide-react"

export default function AIChatAssistant({contract_code}) {
  const [message, setMessage] = useState("")
  const [chatStarted, setChatStarted] = useState(false)

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatStarted(true)
      setMessage("")
    }
    //use hugginge face model to pass the contract code and te prompt
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setChatStarted(true)
  }

  return (
    <div className="w-[20%] h-screen overflow-scroll bg-[#0f1521] text-gray-200 relative">
      {/* Header */}
      <header className="pt-4 pb-6 text-center">
        <h1 className="text-4xl font-bold text-purple-500">AI Chat Assistant</h1>
        <p className="mt-2 text-gray-400">Your intelligent conversation partner</p>
      </header>

      {/* Chat Area */}
      <main className="">
        {!chatStarted && (
          <p className="text-gray-700 text-center pt-20">ask ai to assist</p>
        )}
      </main>

      {/* Message Input */}
      <div className="absolute bottom-[10%] w-full">
        <div className="relative max-w-3xl mx-auto">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-full py-3 pl-4 pr-12 text-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-colors"
          >
            <Send className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  )
}