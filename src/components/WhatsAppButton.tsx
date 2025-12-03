import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/237XXXXXXXXX" // Remplace par ton numéro WhatsApp
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition z-50 animate-bounce"
      aria-label="Contact WhatsApp"
    >
      
      <MessageCircle size={28} fill="white" />
    </a>
  );
}