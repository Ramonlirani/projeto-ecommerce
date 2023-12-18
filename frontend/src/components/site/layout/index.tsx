import { ReactNode } from "react";
import localFont from "next/font/local";

import { Header } from "../header";
import { Footer } from "../footer";
import { ButtonWhatsApp } from "@/components/shared/button-whatsapp";

const robotoCondensed = localFont({
  src: "../../../assets/fonts/RobotoCondensed-VariableFont_wght.ttf",
});

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={`bg-white ${robotoCondensed.className}`}>
      <Header />

      <ButtonWhatsApp whatsApp="41998545699" />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
