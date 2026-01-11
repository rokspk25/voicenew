import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ProcessingScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const paymentData = location.state || {
    payee: 'Rahul',
    amount: '500',
    method: 'UPI'
  }

  useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      // Randomly decide success or failure for demo purposes
      // In real app, this would be based on actual API response
      const shouldSucceed = Math.random() > 0.2 // 80% success rate for demo
      
      if (shouldSucceed) {
        navigate('/success', { state: paymentData })
      } else {
        navigate('/failure', { state: paymentData })
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [navigate, paymentData])

  return (
    <div className="h-full bg-gradient-to-b from-primary-50 to-white page-transition flex items-center justify-center">
      <div className="text-center px-6">
        {/* Loading Animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-6"
        />

        {/* Processing Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h2>
          <p className="text-gray-600">
            Please wait while we process your payment...
          </p>
        </motion.div>

        {/* Payment Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 max-w-sm mx-auto shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Amount</span>
            <span className="text-lg font-semibold text-gray-900">₹{paymentData.amount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">To</span>
            <span className="text-sm font-medium text-gray-900">{paymentData.payee}</span>
          </div>
        </motion.div>

        {/* Voice Feedback Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-2 text-primary-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          <span className="text-sm font-medium">"Processing your payment"</span>
        </motion.div>
      </div>
    </div>
  )
}

