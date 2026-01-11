import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createVoiceRecognition } from '../utils/voiceRecognition'

export default function VoiceBottomSheet({ isOpen, onClose, onPaymentData }) {
  const [transcription, setTranscription] = useState('')
  const [state, setState] = useState('listening')
  const [errorMessage, setErrorMessage] = useState('')
  const voiceRecognitionRef = useRef(null)
  const transcriptionRef = useRef('')

  const handleVoiceResult = useCallback((result) => {
    if (result.transcript !== undefined) {
      transcriptionRef.current = result.transcript
      setTranscription(result.transcript)
      return
    }

    if (result.amount || result.payee) {
      setState('processing')
      setTranscription(result.rawText || transcriptionRef.current)
      
      setTimeout(() => {
        onPaymentData({
          payee: result.payee || 'Unknown',
          amount: result.amount || '0',
          method: 'UPI'
        })
        onClose()
      }, 1500)
    } else {
      setState('error')
      setErrorMessage('Could not understand the command. Please try again.')
    }
  }, [onPaymentData, onClose])

  const handleVoiceError = useCallback((error) => {
    setState('error')
    if (error === 'no-speech') {
      setErrorMessage('No speech detected. Please try again.')
    } else if (error === 'not-allowed') {
      setErrorMessage('Microphone permission denied. Please enable microphone access.')
    } else {
      setErrorMessage('Voice recognition error. Please try again.')
    }
  }, [])

  useEffect(() => {
    if (isOpen && state === 'listening') {
      const voiceRecognition = createVoiceRecognition(handleVoiceResult, handleVoiceError)
      voiceRecognitionRef.current = voiceRecognition

      if (voiceRecognition.isSupported) {
        voiceRecognition.start()
      } else {
        setState('error')
        setErrorMessage('Voice recognition is not supported in your browser.')
      }

      return () => {
        if (voiceRecognitionRef.current) {
          voiceRecognitionRef.current.stop()
        }
      }
    }
  }, [isOpen, state, handleVoiceResult, handleVoiceError])

  const handleClose = () => {
    if (voiceRecognitionRef.current) {
      voiceRecognitionRef.current.stop()
    }
    setState('listening')
    setTranscription('')
    setErrorMessage('')
    onClose()
  }

  const handleRetry = () => {
    setState('listening')
    setTranscription('')
    setErrorMessage('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/50 z-40"
          />
          
          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 overflow-hidden"
            style={{ 
              maxHeight: '640px',
              width: '100%'
            }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Content */}
            <div className="px-6 pb-8 pt-4">
              {/* Listening Text */}
              <h2 className="text-3xl font-bold text-black text-center mb-2">Listening...</h2>
              
              {/* Try saying text */}
              <p className="text-base text-gray-500 text-center mb-1">Try saying</p>
              
              {/* Example command */}
              <p className="text-lg font-semibold text-green-600 text-center mb-6">
                "Pay ₹400 to Prashant"
              </p>

              {/* Waveform Animation - Show when listening */}
              {state === 'listening' && (
                <div className="flex items-end justify-center gap-1 mb-6 h-20">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 bg-green-500 rounded-full waveform-bar"
                      style={{
                        height: `${30 + i * 8}%`,
                      }}
                      animate={{
                        height: [
                          `${20 + Math.random() * 60}%`,
                          `${40 + Math.random() * 40}%`,
                          `${20 + Math.random() * 60}%`,
                        ],
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
              )}

              {/* Microphone Button */}
              <div className="flex justify-center mb-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden"
                  style={{
                    background: 'radial-gradient(circle, #4ade80 0%, #22c55e 100%)'
                  }}
                  onClick={handleClose}
                >
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </motion.button>
              </div>

              {/* Recognized Command Display */}
              {state === 'listening' && transcription && (
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-black">
                    {transcription}
                  </p>
                </div>
              )}

              {/* Error State */}
              {state === 'error' && (
                <div className="text-center">
                  <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
                  <button
                    onClick={handleRetry}
                    className="bg-green-500 text-white rounded-lg py-2 px-6 text-sm font-medium"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Processing State */}
              {state === 'processing' && (
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <p className="text-gray-600 text-sm">Processing...</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

