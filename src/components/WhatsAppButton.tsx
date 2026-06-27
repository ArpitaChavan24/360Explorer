'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { handleWhatsAppChat } from '@/lib/whatsapp';

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * Reusable WhatsApp Button component that maintains styling while providing centralized redirection logic.
 */
const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  message, 
  className, 
  children,
  icon = <MessageCircle className="w-5 h-5" />
}) => {
  return (
    <button 
      onClick={() => handleWhatsAppChat(message)}
      className={className}
      aria-label="Chat on WhatsApp"
    >
      {icon}
      {children}
    </button>
  );
};

export default WhatsAppButton;
