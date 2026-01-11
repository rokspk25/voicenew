import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainHomePage from './screens/MainHomePage'
import PayMobileNumberScreen from './screens/PayMobileNumberScreen'
import VoiceActivationScreen from './screens/VoiceActivationScreen'
import VoiceListeningScreen from './screens/VoiceListeningScreen'
import PaymentConfirmationScreen from './screens/PaymentConfirmationScreen'
import AuthenticationScreen from './screens/AuthenticationScreen'
import ProcessingScreen from './screens/ProcessingScreen'
import SuccessScreen from './screens/SuccessScreen'
import FailureScreen from './screens/FailureScreen'

function App() {
  return (
    <div className="mobile-container">
      <Router>
        <Routes>
          <Route path="/" element={<MainHomePage />} />
          <Route path="/pay-mobile-number" element={<PayMobileNumberScreen />} />
          <Route path="/voice-activation" element={<VoiceActivationScreen />} />
          <Route path="/voice-listening" element={<VoiceListeningScreen />} />
          <Route path="/payment-confirmation" element={<PaymentConfirmationScreen />} />
          <Route path="/authentication" element={<AuthenticationScreen />} />
          <Route path="/processing" element={<ProcessingScreen />} />
          <Route path="/success" element={<SuccessScreen />} />
          <Route path="/failure" element={<FailureScreen />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

