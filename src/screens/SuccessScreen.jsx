import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function SuccessScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const paymentData = location.state || {
    payee: 'Rahul',
    amount: '500',
    method: 'UPI'
  }

  const handleDone = () => {
    navigate('/')
  }

  const handleShare = () => {
    // In a real app, this would trigger native share functionality
    alert('Receipt shared!')
  }

  return (
    <div className="h-full bg-gradient-to-b from-success-50 to-white page-transition overflow-y-auto">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12 pt-12">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          className="w-32 h-32 bg-success-500 rounded-full flex items-center justify-center mb-8 shadow-lg"
        >
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-16 h-16 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </motion.svg>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
          <p className="text-lg text-gray-600 mb-2">
            ₹{paymentData.amount} sent to {paymentData.payee} successfully
          </p>
          
          {/* Voice Feedback Indicator */}
          <div className="mt-4 flex items-center justify-center gap-2 text-success-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-sm font-medium">
              "₹{paymentData.amount} sent to {paymentData.payee} successfully"
            </span>
          </div>
        </motion.div>

        {/* Transaction Details - Collapsible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-sm bg-white rounded-2xl shadow-lg mb-6 overflow-hidden"
        >
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-lg font-semibold text-gray-900">Transaction Details</h2>
            <motion.svg
              animate={{ rotate: isDetailsOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>
          
          <AnimatePresence>
            {isDetailsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 space-y-4">
                  <div className="text-center">
                    <span className="text-sm text-gray-600 block mb-1">Transaction ID</span>
                    <span className="text-sm font-mono text-gray-900">TXN{Date.now().toString().slice(-8)}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-gray-600 block mb-1">Amount</span>
                    <span className="text-sm font-semibold text-gray-900">₹{paymentData.amount}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-gray-600 block mb-1">Recipient</span>
                    <span className="text-sm font-medium text-gray-900">{paymentData.payee}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-gray-600 block mb-1">Method</span>
                    <span className="text-sm font-medium text-gray-900">{paymentData.method}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-gray-600 block mb-1">Time</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-gray-600 block mb-1">Status</span>
                    <span className="text-sm font-semibold text-success-600">Completed</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 rounded-xl py-4 px-6 font-semibold hover:border-primary-300 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share Receipt
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDone}
            className="w-full bg-green-600 text-white rounded-xl py-4 px-6 text-lg font-semibold shadow-lg hover:bg-green-700 transition-shadow"
          >
            Done
          </motion.button>
        </div>
      </div>
    </div>
  )
}

