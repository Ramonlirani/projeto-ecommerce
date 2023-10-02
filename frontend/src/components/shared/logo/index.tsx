import { HTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";

import logoImgWhite from "@/assets/images/LotusFlower.svg";
import logoImgTomilhoColor from "@/assets/images/LotusFlowerTomilhoColor.svg";
interface LogoProps extends HTMLAttributes<HTMLImageElement> {
  variant?: "dark" | "white";
  url?: string;
  disabledRedirect?: boolean;
}
export function Logo({
  url = "/",
  variant = "white",
  disabledRedirect = false,
  ...rest
}: LogoProps) {
  const logoSrc = variant === "white" ? logoImgWhite : logoImgTomilhoColor;

  return (
    <div {...rest}>
      {disabledRedirect ? (
        <Image
          src={logoSrc}
          alt="logo vó joana"
          quality={80}
          className="h-28 w-auto inline"
          width={427}
          height={330}
        />
      ) : (
        <Link href={url}>
          <Image
            src={logoSrc}
            alt="logo vó joana"
            quality={80}
            className="h-28 w-auto inline"
            width={427}
            height={330}
          />
        </Link>
      )}
    </div>
  );
}
