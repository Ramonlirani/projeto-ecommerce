import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { UrlObject } from "url";

interface PageTitleProps {
  title: string;
  backUrl?: string | UrlObject;
}
export function PageTitle({ title, backUrl }: PageTitleProps) {
  const router = useRouter();
  function handleRedirect() {
    if (backUrl) {
      router.push(backUrl);
    }
  }
  return (
    <div className="flex items-center gap-x-2 bg-white text-gray-600">
      {backUrl && (
        <button
          onClick={handleRedirect}
          className="border-none bg-transparent pr-2"
        >
          <ArrowLeftIcon width={24} />
        </button>
      )}
      <h2 className="text-2xl font-semibold leading-6">{title}</h2>
    </div>
  );
}
