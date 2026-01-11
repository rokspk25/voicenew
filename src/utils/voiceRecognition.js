// Voice recognition utility using Web Speech API

export const parseVoiceCommand = (transcript) => {
  const originalText = transcript.trim()
  const text = originalText.toLowerCase().trim()
  
  // Common words to exclude from name extraction (English + Hinglish + Tamil + Kannada)
  const commonWords = new Set([
    'pay', 'send', 'transfer', 'to', 'rupees', 'rs', 'rupee', 'rupees',
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'for', 'of',
    'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those',
    // Hinglish words
    'ko', 'bejo', 'bhejo', 'de', 'do', 'kar', 'karo', 'bhej', 'bhejna', 'dena',
    'karna', 'mein', 'se', 'par', 'ki', 'ka', 'ke', 'ne', 'bhej', 'bhejdo',
    // Tamil words
    'ku', 'kku', 'kodungo', 'kudungo', 'kodu', 'kodunga', 'kudunga', 'koduthu',
    'kuduthu', 'kodukka', 'kudukka', 'anuppu', 'anuppungo', 'anuppunga',
    'anuppuva', 'anuppuvom', 'koduthu', 'kuduthu', 'kodukka', 'kudukka',
    'kodukiren', 'kodutharen', 'anuppu', 'anuppuvom',
    // Kannada words
    'ge', 'kke', 'kodu', 'kalisu', 'koduva', 'koduvudu', 'kalisuva', 'kalisuvudu',
    'koduve', 'kalisuve', 'kodu', 'kalisu', 'koduva', 'kalisuva', 'koduve',
    'kalisuve', 'kodu', 'kalisu'
  ])
  
  // Action verbs to remove (all languages)
  const actionVerbs = new Set([
    'pay', 'send', 'transfer', 'bejo', 'bhejo', 'de', 'do', 'kar', 'karo',
    'kodungo', 'kudungo', 'kodu', 'kodunga', 'kudunga', 'anuppu', 'anuppungo',
    'kodu', 'kalisu', 'koduva', 'kalisuva'
  ])
  
  // Extract amount - comprehensive patterns for all languages
  const amountPatterns = [
    // Pattern 1: "₹100" or "100 rupees" at start
    /^(?:₹|rupees?|rs\.?)?\s*(\d+(?:[.,]\d+)?)/i,
    // Pattern 2: "pay/send ₹100" or "₹100 pay/send"
    /(?:pay|send|transfer|bejo|bhejo|kodu|kalisu|kodungo|anuppu)\s*(?:₹|rupees?|rs\.?)?\s*(\d+(?:[.,]\d+)?)/i,
    /(\d+(?:[.,]\d+)?)\s*(?:rupees?|rs\.?|₹)\s*(?:pay|send|transfer|bejo|bhejo|kodu|kalisu|kodungo|anuppu)/i,
    // Pattern 3: After prepositions "to/ko/ku/ge ₹100"
    /(?:to|ko|ku|kku|ge|kke|mein|se|par)\s*(?:₹|rupees?|rs\.?)?\s*(\d+(?:[.,]\d+)?)/i,
    // Pattern 4: Before prepositions "₹100 to/ko/ku/ge"
    /(\d+(?:[.,]\d+)?)\s*(?:rupees?|rs\.?|₹)?\s*(?:to|ko|ku|kku|ge|kke)/i,
    // Pattern 5: Standalone number (fallback)
    /(\d+(?:[.,]\d+)?)/i
  ]
  
  let amount = null
  let amountIndex = -1
  let amountMatch = null
  
  for (const pattern of amountPatterns) {
    const match = text.match(pattern)
    if (match) {
      amount = match[1].replace(/[.,]/g, '') // Remove commas/decimals for now
      amountIndex = match.index
      amountMatch = match
      break
    }
  }
  
  // Helper function to capitalize name properly
  const capitalizeName = (name) => {
    return name.split(/\s+/).map(word => {
      if (word.length === 0) return word
      // Preserve original capitalization if it looks like a proper name
      if (word[0] === word[0].toUpperCase() && word.length > 2) {
        return word
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    }).join(' ')
  }
  
  // Remove amount, currency, and action verbs from text for name extraction
  let textForName = text
    .replace(/\d+(?:[.,]\d+)?/g, '') // Remove all numbers (including decimals)
    .replace(/₹|rupees?|rs\.?/gi, '') // Remove currency words
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim()
  
  // Remove action verbs
  actionVerbs.forEach(verb => {
    const verbRegex = new RegExp(`\\b${verb}\\b`, 'gi')
    textForName = textForName.replace(verbRegex, '')
  })
  textForName = textForName.replace(/\s+/g, ' ').trim()
  
  let payee = null
  
  // Strategy 1: Look for "[name] ko/ku/ge/to" pattern (most common across languages)
  const prepositionPatterns = [
    { pattern: /([a-z]+(?:\s+[a-z]+)*?)\s+ko\s+/i, lang: 'Hinglish' },
    { pattern: /([a-z]+(?:\s+[a-z]+)*?)\s+(?:ku|kku)\s+/i, lang: 'Tamil' },
    { pattern: /([a-z]+(?:\s+[a-z]+)*?)\s+(?:ge|kke)\s+/i, lang: 'Kannada' },
    { pattern: /(?:^|\s)to\s+([a-z]+(?:\s+[a-z]+)*?)(?:\s|$)/i, lang: 'English' }
  ]
  
  for (const { pattern } of prepositionPatterns) {
    const match = textForName.match(pattern)
    if (match) {
      const potentialName = match[1] ? match[1].trim() : match[0].replace(/^(?:to|ko|ku|kku|ge|kke)\s+/i, '').trim()
      if (potentialName) {
        const nameWords = potentialName.split(/\s+/).filter(word => 
          word.length > 1 && 
          !commonWords.has(word.toLowerCase()) && 
          !actionVerbs.has(word.toLowerCase()) &&
          !word.match(/^\d+$/) &&
          word.length > 2 // Names are usually longer than 2 chars
        )
        if (nameWords.length > 0) {
          payee = capitalizeName(nameWords.join(' '))
          break
        }
      }
    }
  }
  
  // Strategy 2: If amount found, look for name around the amount
  if (!payee && amountIndex >= 0 && amountMatch) {
    const beforeAmount = text.substring(0, amountIndex).trim()
    const afterAmount = text.substring(amountIndex + amountMatch[0].length).trim()
    
    // Check before amount for "[name] ko/ku/ge [amount]" pattern
    const beforePatterns = [
      /([a-z]+(?:\s+[a-z]+)*?)\s+ko\s*$/i,
      /([a-z]+(?:\s+[a-z]+)*?)\s+(?:ku|kku)\s*$/i,
      /([a-z]+(?:\s+[a-z]+)*?)\s+(?:ge|kke)\s*$/i,
      /([a-z]+(?:\s+[a-z]+)*?)\s+to\s*$/i
    ]
    
    for (const pattern of beforePatterns) {
      const match = beforeAmount.match(pattern)
      if (match) {
        const potentialName = match[1].trim()
        const nameWords = potentialName.split(/\s+/).filter(word => 
          word.length > 2 && 
          !commonWords.has(word.toLowerCase()) && 
          !actionVerbs.has(word.toLowerCase()) &&
          !word.match(/^\d+$/)
        )
        if (nameWords.length > 0) {
          payee = capitalizeName(nameWords.join(' '))
          break
        }
      }
    }
    
    // If still no payee, check after amount (but before verbs)
    if (!payee) {
      // Remove all action verbs and prepositions from after amount
      let afterAmountClean = afterAmount
      const allVerbsAndPreps = [...actionVerbs, 'to', 'ko', 'ku', 'kku', 'ge', 'kke', 'mein', 'se', 'par']
      allVerbsAndPreps.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi')
        afterAmountClean = afterAmountClean.replace(regex, '')
      })
      afterAmountClean = afterAmountClean.replace(/\s+/g, ' ').trim()
      
      const afterAmountWords = afterAmountClean.split(/\s+/)
        .filter(word => 
          word.length > 2 && 
          !commonWords.has(word.toLowerCase()) && 
          !actionVerbs.has(word.toLowerCase()) &&
          !word.match(/^\d+$/) &&
          !word.match(/^(rupees?|rs|rupee)$/i)
        )
        .slice(0, 3) // Take up to 3 words
      
      if (afterAmountWords.length > 0) {
        payee = capitalizeName(afterAmountWords.join(' '))
      }
    }
  }
  
  // Strategy 3: Extract from end of sentence (last meaningful words)
  if (!payee) {
    const words = textForName.split(/\s+/).filter(word => 
      word.length > 2 && 
      !commonWords.has(word.toLowerCase()) &&
      !actionVerbs.has(word.toLowerCase()) &&
      !word.match(/^\d+$/)
    )
    
    if (words.length > 0) {
      // Take last 1-2 words as potential name
      const potentialNameWords = words.slice(-2)
      if (potentialNameWords.length > 0) {
        payee = capitalizeName(potentialNameWords.join(' '))
      }
    }
  }
  
  // Strategy 4: Look for capitalized words in original transcript (names are often capitalized)
  if (!payee) {
    const words = originalText.split(/\s+/)
    const capitalizedWords = words.filter(word => 
      word.length > 2 &&
      word[0] === word[0].toUpperCase() &&
      word[0] !== word[0].toLowerCase() && // Ensure it's actually capitalized
      !word.match(/^\d+$/) &&
      !commonWords.has(word.toLowerCase()) &&
      !actionVerbs.has(word.toLowerCase())
    )
    
    if (capitalizedWords.length > 0) {
      // Take the last capitalized word(s) as name
      const nameWords = capitalizedWords.slice(-2)
      payee = capitalizeName(nameWords.join(' '))
    }
  }
  
  // Strategy 5: Extract first meaningful word(s) that aren't verbs/prepositions
  if (!payee) {
    const words = textForName.split(/\s+/).filter(word => 
      word.length > 2 && 
      !commonWords.has(word.toLowerCase()) &&
      !actionVerbs.has(word.toLowerCase()) &&
      !word.match(/^\d+$/)
    )
    
    if (words.length > 0) {
      // Take first 1-2 words as potential name
      const potentialNameWords = words.slice(0, 2)
      if (potentialNameWords.length > 0) {
        payee = capitalizeName(potentialNameWords.join(' '))
      }
    }
  }
  
  // Final cleanup: remove any remaining common words from payee
  if (payee) {
    const payeeWords = payee.split(/\s+/).filter(word => 
      word.length > 0 &&
      !commonWords.has(word.toLowerCase()) &&
      !actionVerbs.has(word.toLowerCase())
    )
    if (payeeWords.length > 0) {
      payee = capitalizeName(payeeWords.join(' '))
    } else {
      payee = null
    }
  }
  
  return { amount, payee, rawText: transcript }
}

// Global recognition instance to reuse and avoid permission prompts
let globalRecognitionInstance = null
let globalRecognitionState = {
  finalTranscript: '',
  silenceTimeout: null,
  isProcessing: false,
  onResult: null,
  onError: null
}

// Check microphone permission first
const checkMicrophonePermission = async () => {
  if (navigator.permissions && navigator.permissions.query) {
    try {
      const result = await navigator.permissions.query({ name: 'microphone' })
      return result.state // 'granted', 'denied', or 'prompt'
    } catch (e) {
      // Permissions API not supported or failed
      return 'prompt'
    }
  }
  return 'prompt' // Default to prompt if API not available
}

export const createVoiceRecognition = (onResult, onError) => {
  const SpeechRecognition = typeof window !== 'undefined' && window.webkitSpeechRecognition
    ? window.webkitSpeechRecognition
    : typeof window !== 'undefined' && window.SpeechRecognition
    ? window.SpeechRecognition
    : null

  if (!SpeechRecognition) {
    return { start: () => {}, stop: () => {}, isSupported: false, checkPermission: () => Promise.resolve('prompt') }
  }

  // Reuse existing recognition instance if available
  let recognition = globalRecognitionInstance
  
  if (!recognition) {
    recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-IN' // Indian English
    globalRecognitionInstance = recognition
    
    // Set up event handlers only once
    recognition.onresult = (event) => {
      let interimTranscript = ''
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          globalRecognitionState.finalTranscript += transcript + ' '
        } else {
          interimTranscript += transcript
        }
      }

      // Update UI with current transcription (interim + final)
      if (globalRecognitionState.onResult && !globalRecognitionState.isProcessing) {
        globalRecognitionState.onResult({
          transcript: globalRecognitionState.finalTranscript + interimTranscript,
          isFinal: false
        })
      }

      // Clear previous silence timeout
      if (globalRecognitionState.silenceTimeout) {
        clearTimeout(globalRecognitionState.silenceTimeout)
      }

      // If user stops speaking (no interim results for 3.5 seconds), process
      if (interimTranscript === '' && globalRecognitionState.finalTranscript.trim() !== '' && !globalRecognitionState.isProcessing) {
        globalRecognitionState.silenceTimeout = setTimeout(() => {
          if (!globalRecognitionState.isProcessing) {
            globalRecognitionState.isProcessing = true
            const parsed = parseVoiceCommand(globalRecognitionState.finalTranscript.trim())
            recognition.stop()
            if (parsed.amount || parsed.payee) {
              if (globalRecognitionState.onResult) {
                globalRecognitionState.onResult(parsed)
              }
            } else {
              if (globalRecognitionState.onError) {
                globalRecognitionState.onError('Could not understand the command. Please try again.')
              }
            }
          }
        }, 3500) // Wait 3.5 seconds of silence
      }
    }

    recognition.onerror = (event) => {
      if (globalRecognitionState.onError && event.error !== 'no-speech') {
        globalRecognitionState.onError(event.error)
      }
    }

    recognition.onend = () => {
      // If we have final transcript but haven't processed yet, process it now
      if (globalRecognitionState.finalTranscript.trim() !== '' && !globalRecognitionState.isProcessing) {
        globalRecognitionState.isProcessing = true
        const parsed = parseVoiceCommand(globalRecognitionState.finalTranscript.trim())
        if (parsed.amount || parsed.payee) {
          if (globalRecognitionState.onResult) {
            globalRecognitionState.onResult(parsed)
          }
        } else if (globalRecognitionState.onError) {
          globalRecognitionState.onError('Could not understand the command. Please try again.')
        }
      }
    }
  }

  // Update callbacks
  globalRecognitionState.onResult = onResult
  globalRecognitionState.onError = onError

  const start = async () => {
    // Reset state
    globalRecognitionState.finalTranscript = ''
    globalRecognitionState.isProcessing = false
    if (globalRecognitionState.silenceTimeout) {
      clearTimeout(globalRecognitionState.silenceTimeout)
      globalRecognitionState.silenceTimeout = null
    }

    // Check permission first
    const permissionState = await checkMicrophonePermission()
    
    if (permissionState === 'denied') {
      if (onError) {
        onError('not-allowed')
      }
      return
    }

    // Small delay to ensure UI is ready
    setTimeout(() => {
      try {
        // Only start if not already running
        if (recognition.state === 'idle' || recognition.state === undefined) {
          recognition.start()
        }
      } catch (e) {
        // Already started or permission denied
        if (e.name === 'NotAllowedError' || e.message?.includes('not allowed')) {
          if (onError) {
            onError('not-allowed')
          }
        }
      }
    }, 300)
  }

  const stop = () => {
    if (globalRecognitionState.silenceTimeout) {
      clearTimeout(globalRecognitionState.silenceTimeout)
      globalRecognitionState.silenceTimeout = null
    }
    try {
      recognition.stop()
    } catch (e) {
      // Ignore
    }
  }

  return { 
    start, 
    stop, 
    isSupported: true,
    checkPermission: checkMicrophonePermission
  }
}

