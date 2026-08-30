
"use client";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/237600000000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      aria-label="Discuter sur WhatsApp"
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
