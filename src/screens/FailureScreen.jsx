import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const ERROR_TYPES = {
  NETWORK: {
    title: 'Network Error',
    message: 'Unable to connect to payment server. Please check your internet connection.',
    icon: '📡'
  },
  INSUFFICIENT_BALANCE: {
    title: 'Insufficient Balance',
    message: 'Your account does not have enough balance to complete this transaction.',
    icon: '💰'
  },
  INVALID_PIN: {
    title: 'Invalid PIN',
    message: 'The UPI PIN you entered is incorrect. Please try again.',
    icon: '🔒'
  },
  TIMEOUT: {
    title: 'Transaction Timeout',
    message: 'The transaction took too long to process. Please try again.',
    icon: '⏱️'
  },
  GENERIC: {
    title: 'Payment Failed',
    message: 'We couldn\'t process your payment. Please try again or use a different payment method.',
    icon: '❌'
  }
}

export default function FailureScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const paymentData = location.state || {
    payee: 'Rahul',
    amount: '500',
    method: 'UPI'
  }

  // Randomly select an error type for demo (in real app, this comes from API)
  const errorType = ERROR_TYPES.GENERIC

  const handleRetryVoice = () => {
    navigate('/voice-activation')
  }

  const handleRetryManual = () => {
    navigate('/payment-confirmation', { state: paymentData })
  }

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="h-full bg-gradient-to-b from-danger-50 to-white page-transition overflow-y-auto">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12 pt-12">
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          className="w-32 h-32 bg-danger-500 rounded-full flex items-center justify-center mb-8 shadow-lg"
        >
          <span className="text-6xl">{errorType.icon}</span>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{errorType.title}</h1>
          <p className="text-lg text-gray-600 mb-6 max-w-sm">
            {errorType.message}
          </p>

          {/* Payment Details */}
          <div className="bg-white rounded-xl p-4 max-w-sm mx-auto shadow-sm mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Amount</span>
              <span className="text-lg font-semibold text-gray-900">₹{paymentData.amount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">To</span>
              <span className="text-sm font-medium text-gray-900">{paymentData.payee}</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRetryVoice}
            className="w-full bg-primary-600 text-white rounded-xl py-4 px-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            Retry with Voice
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRetryManual}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 rounded-xl py-4 px-6 font-semibold hover:border-primary-300 transition-colors"
          >
            Try Manual Payment
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoHome}
            className="w-full text-gray-600 font-medium py-3"
          >
            Go to Home
          </motion.button>
        </div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500 mb-2">Need help?</p>
          <button className="text-sm text-primary-600 font-medium underline">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  )
}

