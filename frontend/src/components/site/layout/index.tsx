import { ReactNode } from "react";
import localFont from "next/font/local";

import { Header } from "../header";
import { Footer } from "../footer";
import { ButtonWhatsApp } from "@/components/shared/button-whatsapp";
import { FlyoutMenu } from "@/components/shared/flyout-menu";

const centuryGothic = localFont({
  src: "../../../assets/fonts/CenturyGothic.ttf",
});

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={`bg-white ${centuryGothic.className}`}>
      <Header />

      <ButtonWhatsApp whatsApp="41998545699" />
      <FlyoutMenu />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
