import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function PaymentConfirmationScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const [amount, setAmount] = useState('')
  
  // Get parsed payment details from navigation state or use defaults
  const paymentData = location.state || {
    payee: 'Prashant Upadhyay',
    amount: '400',
    method: 'UPI'
  }

  // Initialize amount from payment data
  useEffect(() => {
    if (paymentData.amount) {
      setAmount(paymentData.amount)
    }
  }, [paymentData.amount])

  const handleConfirm = () => {
    navigate('/authentication', { state: { ...paymentData, amount: amount || paymentData.amount } })
  }

  const handleBack = () => {
    navigate('/')
  }


  // Generate UPI ID from payee name
  const upiId = `${paymentData.payee.toLowerCase().replace(/\s+/g, '')}@okicici`
  const displayAmount = amount || paymentData.amount

  return (
    <div className="h-full bg-white page-transition overflow-hidden flex flex-col relative">
      {/* Header */}
      <header className="pt-4 pb-4 px-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <button onClick={handleBack} className="p-2 -ml-2">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Paying to</h1>
          <button className="p-2 -mr-2">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
        
        {/* Recipient Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-900 mr-2">{paymentData.payee}</h2>
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="mt-1">
          <p className="text-sm text-gray-600">{upiId}</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-24">
        {/* Amount Display */}
        <div className="text-center mb-6">
          <p className="text-6xl font-bold text-gray-900">₹{displayAmount}</p>
        </div>

        {/* Add Notes Button */}
        <button className="w-full bg-gray-100 text-gray-700 rounded-lg py-3 px-4 mb-6 text-left">
          Add notes
        </button>

        {/* Payment Method Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1 min-w-0">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-white text-xl font-bold">∞</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-gray-900 truncate">Kotak Mahindra Bank - 1234</p>
                <p className="text-sm text-gray-600">
                  Balance : <button className="text-blue-600 underline">Check now</button>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-gray-500 whitespace-nowrap">Powered by UPI</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Pay Button - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConfirm}
          className="w-full bg-green-600 text-white rounded-xl py-4 px-6 text-lg font-semibold shadow-lg hover:bg-green-700"
        >
          Pay ₹{displayAmount}
        </motion.button>
      </div>
    </div>
  )
}
