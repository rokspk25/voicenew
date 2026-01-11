import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import VoiceBottomSheet from '../components/VoiceBottomSheet'

// Helper function to get avatar color and initials
const getAvatarStyle = (name) => {
  const colors = [
    'bg-orange-500', 'bg-green-500', 'bg-blue-500', 'bg-red-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
  ]
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
  const colorIndex = name.length % colors.length
  return { color: colors[colorIndex], initials }
}

const suggestions = [
  { name: 'Prashant Upadhyay', amount: '20,000', status: 'Paid today', type: 'paid' },
  { name: 'Abhilasha Khare', amount: '100', status: 'Paid yesterday', type: 'paid' },
  { name: 'Kartik Khadelwal', amount: '108', status: 'Received on 26 Sep 2024', type: 'received' },
  { name: 'Abheek', amount: '80', status: 'Paid on 2 Nov 2024', type: 'paid' },
  { name: 'Jahanvi Singh', amount: '250', status: 'Paid on 24 Sept 2024', type: 'paid' },
  { name: 'Nitin Kumar Bramhankar Sharma', amount: '108', status: 'Paid on 12 Aug 2024', type: 'paid' }
]

const contacts = [
  { name: 'Abheek', phone: '9564758565' },
  { name: 'Anchal', phone: '9364750666' },
  { name: 'Akanksha', phone: '9978606789' },
  { name: 'Abhilasha Khare', phone: '9876543210' },
  { name: 'Rahul', phone: '9123456789' },
  { name: 'Priya', phone: '9234567890' }
]

export default function PayMobileNumberScreen() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isVoiceSheetOpen, setIsVoiceSheetOpen] = useState(false)

  const filteredSuggestions = suggestions.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  )

  return (
    <div className="h-full bg-white page-transition pb-24 overflow-y-auto relative" style={{ position: 'relative', height: '100%' }}>
      {/* Header */}
      <header className="pt-4 pb-4 px-4 border-b border-gray-200 safe-area-top">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate('/')} className="p-2 -ml-2">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900 flex-1 text-center -ml-8">Pay mobile number</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by name or phone number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-4">
        {/* Suggestions Section */}
        {filteredSuggestions.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Suggestions</h2>
            <div className="space-y-3">
              {filteredSuggestions.map((item, index) => {
                const { color, initials } = getAvatarStyle(item.name)
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center py-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
                      <span className="text-white font-semibold text-sm">{initials}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-gray-900 font-medium">{item.name}</p>
                      <p className={`text-sm ${item.type === 'received' ? 'text-green-600' : 'text-gray-600'}`}>
                        ₹{item.amount} - {item.status}
                      </p>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        )}

        {/* Your contacts Section */}
        {filteredContacts.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Your contacts</h2>
            <div className="space-y-3">
              {filteredContacts.map((contact, index) => {
                const { color, initials } = getAvatarStyle(contact.name)
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center py-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
                      <span className="text-white font-semibold text-sm">{initials}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-gray-900 font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.phone}</p>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchQuery && filteredSuggestions.length === 0 && filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No contacts found</p>
          </div>
        )}
      </div>

      {/* Floating Action Button - Voice Payment */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsVoiceSheetOpen(true)}
        className="absolute w-16 h-16 bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-50"
        style={{
          bottom: '24px',
          right: '24px'
        }}
        aria-label="Voice Payment"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </motion.button>

      {/* Voice Bottom Sheet */}
      <VoiceBottomSheet
        isOpen={isVoiceSheetOpen}
        onClose={() => setIsVoiceSheetOpen(false)}
        onPaymentData={(data) => {
          navigate('/payment-confirmation', { state: data })
        }}
      />
    </div>
  )
}

