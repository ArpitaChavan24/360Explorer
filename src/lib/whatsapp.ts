/**
 * WhatsApp configuration and utility functions
 */

export const WHATSAPP_CONFIG = {
  // CONFIGURATION: Replace with the actual owner's WhatsApp number 
  // (format: country code + number, NO '+' sign, spaces, or dashes)
  OWNER_NUMBER: '919595636026', // Updated to match the contact number in footer
  DEFAULT_MESSAGE: 'Hello! I have a few questions about the tour plan.',
};

/**
 * Validates a WhatsApp number format
 * @param number The phone number to validate
 * @returns boolean
 */
export const validateWhatsAppNumber = (number: string): boolean => {
  // Simple regex for numbers with country code (no + or spaces)
  const phoneRegex = /^\d{10,15}$/;
  return phoneRegex.test(number);
};

/**
 * Generates the official WhatsApp API URL
 * @param message Optional custom message
 * @returns The formatted WhatsApp URL
 */
export const getWhatsAppUrl = (message?: string): string => {
  const number = WHATSAPP_CONFIG.OWNER_NUMBER;
  const text = encodeURIComponent(message || WHATSAPP_CONFIG.DEFAULT_MESSAGE);

  if (!validateWhatsAppNumber(number)) {
    console.error('INVALID WHATSAPP CONFIGURATION: Please check WHATSAPP_CONFIG.OWNER_NUMBER');
    return '#';
  }

  // wa.me is the official WhatsApp link format that handles app vs web automatically
  return `https://wa.me/${number}?text=${text}`;
};

/**
 * Handles the WhatsApp redirection flow
 * @param message Optional custom message
 */
export const handleWhatsAppChat = (message?: string): void => {
  const url = getWhatsAppUrl(message);
  if (url !== '#') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};
