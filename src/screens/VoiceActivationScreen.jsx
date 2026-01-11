import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function VoiceActivationScreen() {
  const navigate = useNavigate()
  const [selectedLanguage, setSelectedLanguage] = useState('English')

  const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali']

  const handleStartListening = () => {
    navigate('/voice-listening')
  }

  return (
    <div className="h-full bg-gradient-to-b from-primary-50 to-white page-transition overflow-y-auto">
      {/* Header */}
      <header className="pt-12 pb-6 px-6">
        <button
          onClick={() => navigate('/')}
          className="mb-4 p-2 -ml-2"
          aria-label="Go back"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Voice Payment</h1>
        <p className="text-gray-600">Speak naturally to make payments</p>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Microphone Animation */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-32 h-32 bg-primary-600 rounded-full flex items-center justify-center mb-8 shadow-lg"
        >
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </motion.div>

        {/* Hint Text */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-800 font-medium mb-2">
            Say something like:
          </p>
          <p className="text-xl text-primary-600 font-semibold">
            "Pay ₹500 to Rahul"
          </p>
        </div>

        {/* Language Selector */}
        <div className="w-full max-w-sm mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Language
          </label>
          <div className="flex flex-wrap gap-2 justify-center">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedLanguage === lang
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-300'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartListening}
          className="w-full max-w-sm bg-primary-600 text-white rounded-xl py-4 px-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
        >
          Start Listening
        </motion.button>

        {/* Cancel Button */}
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-gray-600 font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

