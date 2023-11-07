import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface BackButtonProps {
  title?: string;
  url?: string;
  iconSize?: number;
}
export function BackButton({
  iconSize = 18,
  title = "voltar",
  url = "/",
}: BackButtonProps) {
  return (
    <p className="text-black hover:opacity-75">
      <Link href={url} className="flex items-center gap-1 justify-center">
        <ArrowLeftIcon width={iconSize} /> {title}
      </Link>
    </p>
  );
}
