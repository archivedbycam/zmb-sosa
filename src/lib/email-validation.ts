export interface EmailValidationResult {
  isValid: boolean
  email?: string
  error?: string
}

export function validateEmail(email: string): EmailValidationResult {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email is required' }
  }

  // Trim whitespace
  const trimmedEmail = email.trim().toLowerCase()

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: 'Please enter a valid email address' }
  }

  // Check for common disposable email domains
  const disposableDomains = [
    'tempmail.org', 'guerrillamail.com', 'mailinator.com', '10minutemail.com',
    'throwaway.email', 'temp-mail.org', 'sharklasers.com', 'getairmail.com',
    'temp-mail.io', 'guerrillamailblock.com', 'pokemail.net', 'spam4.me',
    'bccto.me', 'chacuo.net', 'dispostable.com', 'fakeinbox.com'
  ]
  
  const domain = trimmedEmail.split('@')[1]
  if (disposableDomains.includes(domain)) {
    return { isValid: false, error: 'Disposable email addresses are not allowed' }
  }

  // Check length
  if (trimmedEmail.length > 254) {
    return { isValid: false, error: 'Email address is too long' }
  }

  // Check for suspicious patterns
  if (trimmedEmail.includes('..') || trimmedEmail.includes('--')) {
    return { isValid: false, error: 'Invalid email format' }
  }

  return { isValid: true, email: trimmedEmail }
} 