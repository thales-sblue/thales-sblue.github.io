import { FaWhatsapp } from "react-icons/fa";
import { contactLinks } from "../data/site";

export default function WhatsAppButton() {
  return (
    <a
      href={contactLinks.whatsApp.href}
      target={contactLinks.whatsApp.target}
      rel={contactLinks.whatsApp.rel}
      aria-label="Conversar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition hover:scale-105 hover:bg-[#20bd5a]"
    >
      <FaWhatsapp className="text-2xl" />
    </a>
  );
}
