import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5544999072631"
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-4 right-4 z-50
        bg-red-500 hover:bg-red-600
        text-white px-4 py-3 rounded-full
        shadow-lg flex items-center gap-2
        transition duration-300
      "
    >
      <FaWhatsapp className="text-xl" />
    </a>
  );
}
