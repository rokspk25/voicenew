# VoicePay - Voice Payment App Prototype

A complete end-to-end interactive prototype of a mobile payments app with Voice Payment feature, enabling users to make UPI payments using voice commands.

## Features

- **Real Voice Recognition**: Uses Web Speech API to listen to voice commands and automatically process payments when you stop speaking
- **Circular CTA Design**: Modern circular "Pay with Voice" button on home screen
- **Smart Command Parsing**: Automatically extracts amount and payee name from natural speech
- **Auto-Processing**: Payment processes automatically after 2 seconds of silence
- **Voice Payment Flow**: Complete voice-based payment journey from activation to completion
- **Modern Fintech UI**: Clean, trustworthy design with accessibility-first approach
- **Interactive Prototype**: All screens connected with smooth transitions
- **Voice States**: Visual feedback for listening, processing, and error states
- **Payment Confirmation**: Clear display of parsed payment details
- **Secure Authentication**: UPI PIN entry with security best practices
- **Error Handling**: Comprehensive error states with retry options

## User Flow

1. **Home Screen** - Primary CTA for voice payment, secondary options
2. **Voice Activation** - Microphone animation with language selector
3. **Voice Listening** - Real-time waveform animation and live transcription
4. **Payment Confirmation** - Parsed details with voice + visual confirmation
5. **Authentication** - UPI PIN entry (voice feedback disabled for security)
6. **Processing** - Loading state with voice feedback
7. **Success/Failure** - Clear feedback with receipt sharing and retry options

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build

```bash
npm run build
```

## Technology Stack

- **React 18** - UI framework
- **React Router** - Navigation and routing
- **Framer Motion** - Animations and transitions
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Design Principles

- **Accessibility First**: Large tap targets (44px minimum), clear text, high contrast
- **Voice States**: Visually distinct states for listening, processing, and errors
- **Error Handling**: Clear messaging for wrong input, amount detection, payee ambiguity
- **Security**: Voice feedback disabled during PIN entry
- **Micro-interactions**: Smooth animations and transitions throughout

## Prototype Features

- All screens fully connected with navigation
- Voice states simulated via buttons/interactions
- Realistic payment copy and micro-interactions
- Ready for usability testing and stakeholder demos

## Screen Structure

```
/ - Home Screen
/voice-activation - Voice Activation Screen
/voice-listening - Voice Listening State
/payment-confirmation - Payment Confirmation Screen
/authentication - UPI PIN Entry
/processing - Processing State
/success - Success Screen
/failure - Failure/Retry Screen
```

## Demo Interactions

- Click the circular "Pay with Voice" button to start voice recognition
- **Speak naturally**: Say something like "Pay ₹500 to Rahul" or "Send 1000 rupees to John"
- The app will automatically process your payment after you stop speaking (2 seconds of silence)
- Voice recognition works best in Chrome or Edge browsers
- Enter any 6-digit PIN to proceed (demo mode)
- Processing screen randomly succeeds (80%) or fails (20%) for demo purposes

## Voice Commands

The app understands natural language commands like:
- "Pay ₹500 to Rahul"
- "Send 1000 rupees to John"
- "Transfer ₹250 to Priya"
- "Pay 500 to Rahul"

The system automatically extracts:
- **Amount**: Any number mentioned (e.g., 500, ₹500, 1000 rupees)
- **Payee**: Name mentioned after "to" or at the end of the sentence

## Notes

- This is a prototype for demonstration purposes
- Voice input is simulated via button interactions
- Payment processing is simulated with random success/failure
- In production, integrate with actual voice recognition APIs and payment gateways

