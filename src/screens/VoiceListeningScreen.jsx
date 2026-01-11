import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { createVoiceRecognition } from '../utils/voiceRecognition'

const STATES = {
  LISTENING: 'listening',
  PROCESSING: 'processing',
  ERROR: 'error'
}

export default function VoiceListeningScreen() {
  const navigate = useNavigate()
  const [state, setState] = useState(STATES.LISTENING)
  const [transcription, setTranscription] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const voiceRecognitionRef = useRef(null)
  const transcriptionRef = useRef('')

  const handleVoiceResult = useCallback((result) => {
    if (result.transcript !== undefined) {
      // Interim result - update transcription
      transcriptionRef.current = result.transcript
      setTranscription(result.transcript)
      return
    }

    // Final result with parsed data
    if (result.amount || result.payee) {
      setState(STATES.PROCESSING)
      setTranscription(result.rawText || transcriptionRef.current)
      
      setTimeout(() => {
        navigate('/payment-confirmation', {
          state: {
            payee: result.payee || 'Unknown',
            amount: result.amount || '0',
            method: 'UPI'
          }
        })
      }, 1500)
    } else {
      setState(STATES.ERROR)
      setErrorMessage('Could not understand the command. Please say something like "Pay ₹500 to Rahul"')
    }
  }, [navigate])

  const handleVoiceError = useCallback((error) => {
    console.error('Voice recognition error:', error)
    setState(STATES.ERROR)
    if (error === 'no-speech') {
      setErrorMessage('No speech detected. Please try again.')
    } else if (error === 'not-allowed') {
      setErrorMessage('Microphone permission denied. Please enable microphone access.')
    } else {
      setErrorMessage('Voice recognition error. Please try again.')
    }
  }, [])

  // Initialize voice recognition
  useEffect(() => {
    if (state === STATES.LISTENING) {
      const voiceRecognition = createVoiceRecognition(handleVoiceResult, handleVoiceError)
      voiceRecognitionRef.current = voiceRecognition

      if (voiceRecognition.isSupported) {
        // Start recognition (delay is handled in createVoiceRecognition)
        voiceRecognition.start()
      } else {
        setState(STATES.ERROR)
        setErrorMessage('Voice recognition is not supported in your browser. Please use Chrome or Edge.')
      }

      return () => {
        if (voiceRecognitionRef.current) {
          voiceRecognitionRef.current.stop()
        }
      }
    }
  }, [state, handleVoiceResult, handleVoiceError])

  const handleCancel = () => {
    if (voiceRecognitionRef.current) {
      voiceRecognitionRef.current.stop()
    }
    navigate('/')
  }

  const handleRetry = () => {
    setState(STATES.LISTENING)
    setTranscription('')
    setErrorMessage('')
    // Voice recognition will restart automatically via useEffect
  }

  return (
    <div className="h-full bg-gradient-to-b from-primary-50 to-white page-transition overflow-y-auto">
      {/* Header */}
      <header className="pt-12 pb-6 px-6">
        <button
          onClick={handleCancel}
          className="mb-4 p-2 -ml-2"
          aria-label="Cancel"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Listening...</h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <AnimatePresence mode="wait">
          {state === STATES.LISTENING && (
            <motion.div
              key="listening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center"
            >
              {/* Waveform Animation */}
              <div className="flex items-end justify-center gap-1 mb-8 h-24">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 bg-primary-600 rounded-full waveform-bar"
                    style={{
                      height: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      height: [`${20 + Math.random() * 60}%`, `${40 + Math.random() * 40}%`, `${20 + Math.random() * 60}%`],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>

              {/* Live Transcription */}
              <div className="w-full max-w-sm mb-6">
                <div className="bg-white rounded-xl p-6 shadow-lg min-h-[120px] flex items-center justify-center">
                  <p className="text-2xl text-gray-800 font-medium text-center">
                    {transcription || <span className="text-gray-400">Listening...</span>}
                  </p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-primary-600">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-3 h-3 bg-primary-600 rounded-full"
                />
                <span className="text-sm font-medium">Listening</span>
              </div>
            </motion.div>
          )}

          {state === STATES.PROCESSING && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full mb-6"
              />
              <p className="text-lg text-gray-700 font-medium">Processing your request...</p>
            </motion.div>
          )}

          {state === STATES.ERROR && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-danger-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-lg text-gray-800 font-semibold mb-2">Couldn't understand</p>
              <p className="text-gray-600 text-center mb-6">{errorMessage}</p>
              <button
                onClick={handleRetry}
                className="bg-primary-600 text-white rounded-xl py-3 px-6 font-medium"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Text */}
        {state === STATES.LISTENING && (
          <div className="mt-8 w-full max-w-sm text-center">
            <p className="text-sm text-gray-500 mb-2">
              Say something like: <span className="font-semibold text-primary-600">"Pay ₹500 to Rahul"</span>
            </p>
            <p className="text-xs text-gray-400">
              The payment will process automatically 3.5 seconds after you stop speaking
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

