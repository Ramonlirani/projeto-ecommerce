import Image from "next/image";
import logoWhatsApp from "@/assets/logo/whatsapp-logo.svg";

interface ButtonWhatsAppProps {
  whatsApp: string;
}

export function ButtonWhatsApp({ whatsApp }: ButtonWhatsAppProps) {
  const numberFormat = whatsApp.replace(/[^0-9]/g, "");

  return (
    <a
      href={`https://api.whatsapp.com/send?phone=55${numberFormat}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-10 z-50 transform-gpu items-end justify-end transition-transform hover:scale-110"
    >
      <Image src={logoWhatsApp} alt="WhatsApp" />
    </a>
  );
}
