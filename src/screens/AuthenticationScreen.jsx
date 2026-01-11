import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AuthenticationScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)

  const paymentData = location.state || {
    payee: 'Rahul',
    amount: '500',
    method: 'UPI'
  }

  const handlePinInput = (digit) => {
    if (pin.length < 6) {
      const newPin = pin + digit
      setPin(newPin)
      
      // Auto-submit when 6 digits are entered
      if (newPin.length === 6) {
        setTimeout(() => {
          navigate('/processing', { state: paymentData })
        }, 300)
      }
    }
  }

  const handleBackspace = () => {
    setPin(pin.slice(0, -1))
  }

  const handleClear = () => {
    setPin('')
  }

  return (
    <div className="h-full bg-gradient-to-b from-primary-50 to-white page-transition overflow-y-auto">
      {/* Header */}
      <header className="pt-12 pb-6 px-6">
        <h1 className="text-2xl font-bold text-gray-900">Enter UPI PIN</h1>
        <p className="text-gray-600 mt-1">Secure your payment</p>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Payment Summary */}
        <div className="w-full max-w-sm bg-white rounded-xl p-4 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Paying</span>
            <span className="text-lg font-semibold text-gray-900">₹{paymentData.amount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">To</span>
            <span className="text-sm font-medium text-gray-900">{paymentData.payee}</span>
          </div>
        </div>

        {/* PIN Display */}
        <div className="mb-8">
          <div className="flex gap-3 mb-4">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${
                  index < pin.length
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {index < pin.length && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 bg-primary-600 rounded-full"
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center">
            Voice feedback disabled for security
          </p>
        </div>

        {/* Number Pad */}
        <div className="w-full max-w-sm">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <motion.button
                key={num}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePinInput(num.toString())}
                className="aspect-square bg-white border-2 border-gray-200 rounded-xl text-2xl font-semibold text-gray-900 hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                {num}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClear}
              className="aspect-square bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-danger-300 hover:bg-danger-50 transition-colors"
            >
              Clear
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePinInput('0')}
              className="aspect-square bg-white border-2 border-gray-200 rounded-xl text-2xl font-semibold text-gray-900 hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              0
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackspace}
              className="aspect-square bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-gray-400 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Security Note */}
        <p className="mt-8 text-xs text-gray-500 text-center max-w-sm">
          Your PIN is encrypted and never stored
        </p>
      </div>
    </div>
  )
}

